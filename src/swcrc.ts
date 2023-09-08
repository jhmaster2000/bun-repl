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
        strictMode: true,
        ignoreDynamic: true,
        importInterop: 'none',
    },
    jsc: {
        target: 'esnext',
        parser: {
            syntax: 'typescript',
            dynamicImport: true,
            decorators: true,
        },
        transform: {
            useDefineForClassFields: false,
            treatConstEnumAsEnum: false,
            optimizer: {
                simplify: false
            }
        },
        preserveAllComments: true,
        keepClassNames: true,
        loose: false,
    }
} as const;

export default swcrc;
