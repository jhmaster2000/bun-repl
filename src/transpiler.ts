import * as babel from "@babel/core";
import babelDefaultConfig from "./babelrc";
import * as t from "@babel/types";

const SLOPPY_MODE = process.argv.includes("--sloppy");

export default class Transpiler {
    private config: babel.TransformOptions;

    constructor(config: babel.TransformOptions = {}) {
        this.config = { ...babelDefaultConfig, ...config };
    }

    transpile(code: string): {
        code: string;
        postCode: string;
    } {
        const ast = babel.transformSync(code, {
            ...this.config,
            ast: true,
            code: false,
        })!.ast!;
        const newBody: t.Statement[] = ast.program.body.map((statement, i, body) => {
            if (t.isImportDeclaration(statement)) {
                const init = t.awaitExpression(t.callExpression({ type: "Import" }, [statement.source]));
                const declarators = statement.specifiers.map((specifier) => {
                    if (t.isImportNamespaceSpecifier(specifier)) {
                        return t.variableDeclarator(specifier.local, init);
                    } else if (t.isImportDefaultSpecifier(specifier)) {
                        return t.variableDeclarator(
                            t.objectPattern([t.objectProperty(t.identifier("default"), specifier.local)]),
                            init,
                        );
                    } else {
                        return t.variableDeclarator(
                            t.objectPattern([t.objectProperty(specifier.imported, specifier.local)]),
                            init,
                        );
                    }
                });
                const declaration = t.variableDeclaration("const", declarators);
                return declaration;
            } else if (i + 1 == body.length && t.isExpressionStatement(statement)) {
                return t.variableDeclaration("var", [
                    t.variableDeclarator(t.identifier("_repl_value"), statement.expression),
                ]);
            } else {
                return statement;
            }
        });
        const declarations = newBody
            .filter((statement) => t.isVariableDeclaration(statement))
            .map((declaration) => (t.assertVariableDeclaration(declaration), declaration));
        type lValInDecl = t.Identifier | t.ArrayPattern | t.ObjectPattern;
        const findIdentifer = (id: lValInDecl): t.Identifier[] => {
            if (t.isObjectPattern(id)) {
                return id.properties.flatMap((prop) => {
                    if (t.isObjectProperty(prop)) {
                        return findIdentifer(prop.value as lValInDecl);
                    } else {
                        return findIdentifer(prop.argument as lValInDecl);
                    }
                });
            } else if (t.isArrayPattern(id)) {
                return id.elements.flatMap((elem) => {
                    return findIdentifer(elem as lValInDecl);
                });
            } else {
                return [id];
            }
        };
        const extractDeclarations = (declarations: t.VariableDeclaration[], kind: "var" | "let" | "const") =>
            declarations
                .filter((declaration) => declaration.kind == kind)
                .flatMap((declaration) => declaration.declarations.map((declarator) => declarator.id))
                .flatMap((id) => findIdentifer(id as lValInDecl));
        const vars = extractDeclarations(declarations, "var");
        const lets = extractDeclarations(declarations, "let");
        const consts = extractDeclarations(declarations, "const");
        const newFile = t.file(
            t.program([
                t.expressionStatement(
                    t.callExpression(
                        t.functionExpression(
                            null,
                            [],
                            t.blockStatement([
                                ...(SLOPPY_MODE ? [] : [t.expressionStatement(t.stringLiteral("use strict"))]),
                                ...newBody,
                                t.expressionStatement(
                                    t.assignmentExpression(
                                        "=",
                                        t.memberExpression(t.identifier("globalThis"), t.identifier("_repl_result")),
                                        t.objectExpression([
                                            t.objectProperty(
                                                t.identifier("vars"),
                                                t.objectExpression(
                                                    vars.map((id) => t.objectProperty(id, id, false, true)),
                                                ),
                                            ),
                                            t.objectProperty(
                                                t.identifier("lets"),
                                                t.objectExpression(
                                                    lets.map((id) => t.objectProperty(id, id, false, true)),
                                                ),
                                            ),
                                            t.objectProperty(
                                                t.identifier("consts"),
                                                t.objectExpression(
                                                    consts.map((id) => t.objectProperty(id, id, false, true)),
                                                ),
                                            ),
                                        ]),
                                    ),
                                ),
                                t.returnStatement(
                                    t.memberExpression(
                                        t.memberExpression(
                                            t.memberExpression(
                                                t.identifier("globalThis"),
                                                t.identifier("_repl_result"),
                                            ),
                                            t.identifier("vars"),
                                        ),
                                        t.identifier("_repl_value"),
                                    ),
                                ),
                            ]),
                            false,
                            true,
                        ),
                        [],
                    ),
                ),
            ]),
        );
        const newCode = babel.transformFromAstSync(newFile, code, {
            filename: this.config.filename,
            sourceMaps: this.config.sourceMaps,
            sourceType: "script",
            configFile: false,
            babelrc: false,
        })!.code!;
        const postFile = t.file(
            t.program([
                t.variableDeclaration("var", [
                    t.variableDeclarator(
                        t.objectPattern(vars.map((id) => t.objectProperty(id, id, false, true))),
                        t.memberExpression(t.identifier("_repl_result"), t.identifier("vars")),
                    ),
                ]),
                t.variableDeclaration("let", [
                    t.variableDeclarator(
                        t.objectPattern(lets.map((id) => t.objectProperty(id, id, false, true))),
                        t.memberExpression(t.identifier("_repl_result"), t.identifier("lets")),
                    ),
                ]),
                t.variableDeclaration("const", [
                    t.variableDeclarator(
                        t.objectPattern(consts.map((id) => t.objectProperty(id, id, false, true))),
                        t.memberExpression(t.identifier("_repl_result"), t.identifier("consts")),
                    ),
                ]),
            ]),
        );
        const postCode = babel.transformFromAstSync(postFile, void 0, {
            sourceType: "script",
            configFile: false,
            babelrc: false,
        })!.code!;
        return {
            code: newCode,
            postCode,
        };
    }
}
