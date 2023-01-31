/* eslint-disable unicorn/custom-error-definition */
// Polyfill of the Node.js "repl" module (WIP)

import utl from '../utl';

class NotImplementedError extends Error {
    constructor(method: string, fullmsg: boolean = false) {
        super(fullmsg ? method : method + ' is not implemented');
        this.name = 'NotImplementedError';
    }
}

export const nodePrefixedModules = [
    'assert', 'buffer', 'child_process', 'console', 'constants', 'crypto', 'dns', 'dns/promises', 'domain', 'events',
    'fs', 'fs/promises', 'http', 'https', 'module', 'net', 'os', 'path', 'path/posix', 'path/win32', 'perf_hooks',
    'process', 'punycode', 'querystring', 'readline', 'readline/promises', 'stream', 'stream/consumers', 'stream/web',
    'string_decoder', 'sys', 'timers', 'timers/promises', 'tls', 'tty', 'url', 'util', 'util/types', 'zlib'
];
export const bunPrefixedModules = ['ffi', 'jsc', 'sqlite', 'wrap'];
export const unprefixedModules = [
    '@vercel/fetch', 'depd', 'detect-libc', 'isomorphic-fetch', 'node-fetch', 'readable-stream',
    'readable-stream/consumer', 'readable-stream/web', 'supports-color', 'undici', 'ws'
];
export const builtinModules = [
    ...bunPrefixedModules.map(m => `bun:${m}`),
    ...nodePrefixedModules.map(m => `node:${m}`),
    ...unprefixedModules
] as const;

export class REPLServer {
    constructor() {
        throw new NotImplementedError('repl.REPLServer');
    }
}

export class Recoverable extends SyntaxError {
    readonly err: Error;
    constructor(err: Error) {
        super();
        this.err = err;
        throw new NotImplementedError('repl.Recoverable');
    }
}

export const REPL_MODE_SLOPPY = Symbol('repl-sloppy');
export const REPL_MODE_STRICT = Symbol('repl-strict');

export function start(prompt: string, source: any, eval_: any, useGlobal: boolean, ignoreUndefined: boolean, replMode: symbol) {
    //return new REPLServer(prompt, source, eval_, useGlobal, ignoreUndefined, replMode);
    throw new NotImplementedError('repl.start');
}

interface REPLWriterFunction {
    (val: any): string;
    options: utl.InspectOptions;
}

export const writer = function writer(val: any): string {
    const REPLGlobal = Reflect.get((async function*(){}).constructor, '@@REPLGlobal') as REPLGlobal;
    const [formatted, err] = REPLGlobal.format(val);
    if (err) throw err;
    else return formatted;
} as REPLWriterFunction;
Object.defineProperty(writer, 'options', {
    value: { ...utl.inspect.replDefaults }, enumerable: true
});

const repl = Object.defineProperties({}, {
    start: { value: start, enumerable: true },
    writer: { value: writer, enumerable: true },
    repl: {
        get() { throw new NotImplementedError('bun-repl does not run on a REPLServer', true); },
        enumerable: true
    },
    builtinModules: { value: builtinModules, enumerable: true },
    REPL_MODE_SLOPPY: { value: REPL_MODE_SLOPPY, enumerable: true },
    REPL_MODE_STRICT: { value: REPL_MODE_STRICT, enumerable: true },
    REPLServer: { value: REPLServer, enumerable: true },
    Recoverable: { value: Recoverable, enumerable: true }
}) as {
    start: typeof start,
    writer: typeof writer,
    repl: REPLServer,
    builtinModules: typeof builtinModules,
    REPL_MODE_SLOPPY: typeof REPL_MODE_SLOPPY,
    REPL_MODE_STRICT: typeof REPL_MODE_STRICT,
    REPLServer: typeof REPLServer,
    Recoverable: typeof Recoverable
};

export default repl;
