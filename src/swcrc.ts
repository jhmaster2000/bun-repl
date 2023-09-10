import swc from '@swc/core';

const swcrc: swc.Options = {
    inlineSourcesContent: false,
    sourceMaps: true,
    isModule: !process.argv.includes('--sloppy'),
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
