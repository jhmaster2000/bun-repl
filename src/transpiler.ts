import swc from '@swc/core';
import swcDefaultConfig from './swcrc';

type replTranspiledImportInfo = {
    varname?: string,
    destructuredVars?: string[],
    moduleIdentifier: string,
    wildcard: boolean,
};

const StringReplaceAll = Function.prototype.call.bind(String.prototype.replaceAll);
const randomUUID = crypto.randomUUID.bind(crypto);
const safeUUID = () => StringReplaceAll(randomUUID(), '-', '') as string;
const SLOPPY_MODE = process.argv.includes('--sloppy');

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
            .replaceAll(/import(?:(?:(?:[ \n\t]+([^ *\n\t{},]+)[ \n\t]*(?:,|[ \n\t]+))?([ \n\t]*\{(?:[ \n\t]*[^ \n\t"'{}]+[ \n\t]*,?)+\})?[ \n\t]*)|[ \n\t]*\*[ \n\t]*as[ \n\t]+([^ \n\t{}]+)[ \n\t]+)from[ \n\t]*(?:['"])([^'"\n]+)(['"])/g,
                ($0, defaultVar?: string, destructuredVars?: string, wildcardVar?: string, moduleIdentifier: string = '') => {
                    let str = `${$0};/*$replTranspiledImport:`;
                    let info = { moduleIdentifier } as replTranspiledImportInfo;
                    if (defaultVar) info.varname = defaultVar.trim();
                    if (wildcardVar) info.varname = wildcardVar.trim();
                    if (destructuredVars) {
                        info.destructuredVars = destructuredVars.trim().slice(1, -1).trim().split(',').map(s => s.trim());
                    }
                    info.wildcard = !!wildcardVar;
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
        let importsData = [] as ({ requireVar: string, requireStr: string, info: replTranspiledImportInfo, uuid: string })[];
        code = (SLOPPY_MODE ? '' : '"use strict";void 0;\n') + code
            .replaceAll(/(?:var|let|const) (_.+?) = require\("(.+?)"\);[ \t\n;]*\/\*\$replTranspiledImport:({.+?})\*\//g,
                ($0, requireVar: string, requireStr: string, infoStr: string) => {
                    const info = JSON.parse(infoStr) as replTranspiledImportInfo;
                    const uuid = safeUUID();
                    importsData.push({ requireVar, requireStr, info, uuid });
                    let str = `const ${requireVar}${uuid} = require("${requireStr}");`;
                    if (info.varname) {
                        str += `const ${info.varname}=${requireVar}${uuid}`;
                        if (!info.wildcard) str += `.default??${requireVar}${uuid};`;
                        str += ';';
                    }
                    if (info.destructuredVars) {
                        let ifstr = 'true.valueOf["@@replTemp"]={};if(!(';
                        let delstr = ')){';
                        info.destructuredVars.forEach(variable => {
                            let exportStr = variable;
                            const match = variable.match(/([^ \n\t]+)[ \n\t]+as[ \n\t]+([^ \n\t]+)/);
                            if (match) {
                                variable = match[2];
                                exportStr = match[1];
                                str += `const{${exportStr}:${variable}}=${requireVar}${uuid};`;
                            } else str += `const{${variable}}=${requireVar}${uuid};`;
                            ifstr += `(true.valueOf['@@replTemp'].$v="${exportStr}") in ${requireVar}${uuid}&&`;
                            delstr += `delete true.valueOf['@@replTemp']["${variable}"];`;
                        });
                        const errmsg = `Import named '\${true.valueOf["@@replTemp"].$v}' not found in module '${requireStr}'.`;
                        delstr += `{const $err=new SyntaxError(\`${errmsg}\`);$err.stack='';throw $err;}};`;
                        ifstr = ifstr.slice(0, -2);
                        str += ifstr + delstr;
                    }
                    return str + '\n';
                });
        for (const importData of importsData) {
            code = code.replaceAll(new RegExp(`void\\s+${importData.requireVar}`, 'g'), `void ${importData.requireVar}${importData.uuid}`);
        }
        return code;
    }

    readonly #config: swc.Options;
}
