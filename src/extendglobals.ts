import repl from './module/repl';

type globalType = typeof globalThis;

declare global {
    const globalThis: globalType;

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

    interface PartialNPMResponse {
        'dist-tags': {
            latest: string
        }
    }

    interface ImportMeta {
        require: (moduleIdentifier: string) => unknown;
    }
    function require(moduleIdentifier: string): unknown;

    interface REPLGlobal {
        REPL: typeof repl;
        global: typeof globalThis;
        eval: typeof eval;
        temp: Record<any, any>;
        process: Process;
        format: (v: any, isError?: boolean) => [string, null] | [null, Error]
        console: typeof console;
        Error: ErrorConstructor;
        Symbol: SymbolConstructor;
        StringReplace: Primordial<string, (find: string | RegExp, value: string) => string>;
        StringSlice: Primordial<string, typeof String.prototype.slice>;
        ArrayIncludes: Primordial<Array<any>, typeof Array.prototype.includes>;
        ObjectToString: Primordial<any, typeof Object.prototype.toString>;
    }

    type Primordial<T, F extends (...x: any[]) => any> = (thisArg: T, ...args: Parameters<F>) => ReturnType<F>;
}

ShadowRealm.prototype.execFile = async function (filepath) {
    try { await this.importValue(filepath, ''); } catch (err) {
        if ((<Error>err).message.trim() !== '%ShadowRealm%.importValue requires |exportName| to exist in the |specifier|')
            throw err; // Unexpected error should not be suppressed.
    }
};

export { };
