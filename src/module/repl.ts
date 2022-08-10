/* eslint-disable unicorn/custom-error-definition */
// Polyfill of the Node.js "repl" module (WIP)

import $ from '../colors';
import util from 'util';

class NotImplementedError extends Error {
    constructor(method: string) {
        super(method + ' is not implemented');
        this.name = 'NotImplementedError';
    }
}

export const nodePrefixedModules = [
    'assert', 'buffer', 'constants', 'crypto', 'domain', 'events',
    'fs', 'fs/promises', 'http', 'https', 'os', 'path', 'path/posix',
    'path/win32', 'process', 'punycode', 'querystring', 'stream',
    'string_decoder', 'sys', 'timers', 'tty', 'url', 'util', 'zlib'
];
export const bunPrefixedModules = ['ffi', 'jsc', 'sqlite', 'test'];

module repl {

    export const repl = new Error('bun-repl does not run on a REPLServer');

    export class REPLServer {
        constructor() {
            throw new NotImplementedError('repl.REPLServer');
        }
    }

    export class Recoverable extends SyntaxError {
        err: Error;
        constructor(err: Error) {
            super();
            this.err = err;
            throw new NotImplementedError('repl.Recoverable');
        }
    }

    /** `bun` and `bun:test` are excluded as they can't be dynamically imported. */
    export const builtinModules = [
        ...bunPrefixedModules.map(m => `bun:${m}`),
        ...nodePrefixedModules.map(m => `node:${m}`),
        'supports-color'
    ];

    export const REPL_MODE_SLOPPY = Symbol('repl-sloppy');
    export const REPL_MODE_STRICT = Symbol('repl-strict');

    export function start(prompt: string, source: any, eval_: any, useGlobal: boolean, ignoreUndefined: boolean, replMode: symbol) {
        //return new REPLServer(prompt, source, eval_, useGlobal, ignoreUndefined, replMode);
        throw new NotImplementedError('repl.start');
    }

    const REPLWriterOptionsDefaults = {
        showHidden: false,
        depth: 2,
        colors: Bun.enableANSIColors,
        customInspect: true,
        showProxy: true,
        maxArrayLength: 100,
        maxStringLength: 10000,
        breakLength: 80,
        compact: 3,
        sorted: false,
        getters: false,
        numericSeparator: false
    };
    interface REPLWriterFunction {
        (val: any): string;
        options: typeof REPLWriterOptionsDefaults;
    }

    export const writer: REPLWriterFunction = function writer(val: any): string {
        return util.inspect(val, (<REPLWriterFunction>writer).options);
    };
    writer.options = new Proxy(REPLWriterOptionsDefaults, {
        set(target, p, value) {
            console.warn(`${$.yellow+$.dim}(warning) repl.writer.options are currently not all fully respected by the REPL.${$.reset}`);
            // @ts-expect-error Temporary warning Proxy
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            target[p] = value;
            return true;
        }
    });

}

// For verifying all builtin modules
/*for (const mod of repl.builtinModules) {
    if (mod === 'bun' || mod === 'bun:test') continue;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const contents = await import(mod);
    if (!contents) throw new Error(`Module does not exist: ${mod}`);
}*/

export default repl;
