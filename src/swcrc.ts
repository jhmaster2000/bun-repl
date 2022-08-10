import swc from '@swc/core';

const swcrc: swc.Options = {
    inlineSourcesContent: false,
    sourceMaps: true,
    isModule: true,
    minify: false,
    swcrc: false,
    filename: '$bun$repl.ts',
    module: {
        type: 'commonjs',
        lazy: false,
        strict: true,
        strictMode: false,
        ignoreDynamic: true,
        importInterop: 'none',
    },
    jsc: {
        target: 'es2022',
        parser: {
            syntax: 'typescript',
            dynamicImport: true,
            decorators: false,
        },
        transform: {
            useDefineForClassFields: false,
            treatConstEnumAsEnum: false,
            optimizer: {
                simplify: false,
                globals: { vars: {
                    repl: '(async function*() {}).constructor["@@REPLGlobal"].REPL'
                } }
            }
        },
        preserveAllComments: true,
        keepClassNames: true,
        loose: false,
    }
} as const;

export default swcrc;
