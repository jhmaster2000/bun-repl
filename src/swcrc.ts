import swc from '@swc/core';

const REPL_FILENAME = '$bun$repl.ts' as const;

const swcrc: swc.Options = {
    inlineSourcesContent: false,
    sourceMaps: true,
    isModule: !process.argv.includes('--sloppy'),
    minify: false,
    swcrc: false,
    filename: REPL_FILENAME,
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
                simplify: false,
                globals: {
                    vars: {
                        'import.meta': /*js*/`((cwd) => {
                            const {
                                join, dirname, basename, resolve, getcwd,
                                pathToFileURL, fileURLToPath,
                                StringStartsWith, ObjectFreeze
                            } = (0, eval)('this')['@@bunReplRuntimeHelpers'];
                            cwd = join(getcwd(), '${REPL_FILENAME}');
                            return ObjectFreeze({
                                url: pathToFileURL(cwd).href,
                                main: true,
                                path: cwd,
                                dir: dirname(cwd),
                                file: basename(cwd),
                                require: require,
                                async resolve(id, parent) {
                                    return this.resolveSync(id, parent);
                                },
                                resolveSync(id, parent) {
                                    return require.resolve(id, {
                                        paths: typeof parent === "string" ? [
                                            resolve(StringStartsWith(parent, 'file://') ? fileURLToPath(parent) : parent, '.')
                                        ] : void 0
                                    });
                                }
                            });
                        })()`,
                    }
                },
            }
        },
        preserveAllComments: true,
        keepClassNames: true,
        loose: false,
    }
} as const;

export default swcrc;
