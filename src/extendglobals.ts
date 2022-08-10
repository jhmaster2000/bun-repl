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

    interface BunError {
        name: string;
        message: string;
        line: number;
        column: number;
    }

    interface ResolveError {
        referrer?: string;
        message?: string;
        name?: 'ResolveError';
        specifier?: string;
        importKind?: string;
        position?: number;
        convertToType?: string;
        toString(): string;
    }
    const ResolveError: ResolveError;

    interface PackageJson {
        type?: "module" | "commonjs";
        name: string;
        version: string;
        description?: string;
        main?: string;
        author?: string;
        license?: string;
        homepage?: string;
        scripts?: Record<string, string>;
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
        bin?: Record<string, string>;
        keywords?: string[];
        bugs?: {
            url: string;
        }
        repository?: {
            type: string;
            url: string;
        }
    }

    interface ImportMeta {
        require: (moduleIdentifier: string) => unknown;
    }
    function require(moduleIdentifier: string): unknown;
}

ShadowRealm.prototype.execFile = async function (filepath) {
    try { await this.importValue(filepath, ''); } catch (err) {
        if ((<Error>err).message.trim() !== '%ShadowRealm%.importValue requires |exportName| to exist in the |specifier|')
            throw err; // Unexpected error should not be suppressed.
    }
};

export { };
