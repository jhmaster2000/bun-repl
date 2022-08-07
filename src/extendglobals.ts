declare global {
    interface ShadowRealm {
        /**
         * Even though `ShadowRealm.importValue` throws an error when the requested export isn't found,
         * the file is still executed in it's entirety, we can use this for arbitrary in-realm module code execution.
         * @param filepath The path to the JS file to execute.
         */
        execFile(filepath: string): Promise<void>;
    }

    interface Process {
        revision?: string;
    }

    interface ResolveError {
        referrer?: string;
        message?: string;
        name?: 'ResolveError';
        specifier?: string;
        importKind?: 'stmt';
        position?: number;
        convertToType?: string;
        toString(): string;
    }
    const ResolveError: ResolveError;

    interface PackageJson {
        type?: "module" | "commonjs",
        name: string,
        version: string,
        description?: string,
        main?: "src/repl.ts",
        scripts?: Record<string, string>,
        author?: string,
        license?: string,
        dependencies?: Record<string, string>,
        devDependencies?: Record<string, string>,
        bin?: Record<string, string>;
    }
}

ShadowRealm.prototype.execFile = async function (filepath) {
    try { await this.importValue(filepath, ''); } catch { void 0; }
};

export { };
