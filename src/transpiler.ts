import swc from '@swc/core';
import swcDefaultConfig from './swcrc';

type replTranspiledImportInfo = {
    varname?: string,
    destructuredVars?: string[],
    moduleIdentifier: string
};

export default class Transpiler extends swc.Compiler {
    constructor(config: swc.Options = {}) {
        super();
        this.#config = Object.assign(swcDefaultConfig, config);
    }

    transpile(code: string): string {
        return super.transformSync(code, this.#config).code;
    }

    // REPL-specific adjustments needed for the code to work in a REPL context. (Ran before transpile)
    preprocess(code: string): string {
        return code
            .replace(/import(?:(?:(?:[ \n\t]+([^ *\n\t{},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'{}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t{}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g,
                ($0, defaultVar?: string, destructuredVars?: string, wildcardVar?: string, moduleIdentifier: string = '') => {
                    let str = `${$0};/*$replTranspiledImport:`;
                    let info = { moduleIdentifier } as replTranspiledImportInfo;
                    if (defaultVar) info.varname = defaultVar.trim();
                    if (wildcardVar) info.varname = wildcardVar.trim();
                    if (destructuredVars) {
                        info.destructuredVars = destructuredVars.trim().slice(1, -1).trim().split(',').map(s => s.trim());
                    }
                    str += JSON.stringify(info) + '*/';
                    if (info.varname) str += `void ${info.varname};`;
                    if (info.destructuredVars) info.destructuredVars.forEach(variable => {
                        const match = variable.match(/[^ \n\t]+[ \n\t]+as[ \n\t]+([^ \n\t]+)/);
                        str += `void ${match ? match[1] : variable};`;
                    });
                    return str;
                });
    }

    // REPL-specific adjustments needed for the code to work in a REPL context. (Ran after transpile)
    postprocess(code: string): string {
        return code
            .replace(/(?:let|const) ([A-Za-z_$\d]+? ?=.)/g,
                ($0, varname: string) => 'var ' + varname)
            .replace(/(?:let|const) ?({[A-Za-z_$, \t\n\d]+?}) ?(=.)/g,
                ($0, vars: string, end: string) => `var ${vars} ${end}`)
            .replace(/var (_.+?) = require\("(.+?)"\);[ \t\n;]*\/\*\$replTranspiledImport:({.+?})\*\//g,
                ($0, requireVar: string, requireStr: string, infoStr: string) => {
                    const info = JSON.parse(infoStr) as replTranspiledImportInfo;
                    let str = `const ${requireVar} = require("${requireStr}");`;
                    if (info.varname) str += `var ${info.varname} = ${requireVar};`;
                    if (info.destructuredVars) {
                        let ifstr = 'if(!(';
                        let delstr = ')){';
                        info.destructuredVars.forEach(variable => {
                            let exportStr = variable;
                            const match = variable.match(/([^ \n\t]+)[ \n\t]+as[ \n\t]+([^ \n\t]+)/);
                            if (match) {
                                variable = match[2];
                                exportStr = match[1];
                                str += `var { ${exportStr}: ${variable} } = ${requireVar};`;
                            } else str += `var { ${variable} } = ${requireVar};`;
                            ifstr += `((async function*(){}).constructor['@@REPLGlobal'].temp.$v="${exportStr}") in ${requireVar}&&`;
                            delstr += `delete (async function*(){}).constructor['@@REPLGlobal'].global["${variable}"];`;
                        });
                        const errmsg = `The requested module '${requireStr}' does not provide an export named '\${(async function*(){}).constructor['@@REPLGlobal'].temp.$v}'`;
                        delstr += `throw new (async function*(){}).constructor['@@REPLGlobal'].Error(\`${errmsg}\`);};`;
                        ifstr = ifstr.slice(0, -2);
                        str += ifstr + delstr;
                    }
                    return str + '\n';
                });
    }

    readonly #config: swc.Options;
}
