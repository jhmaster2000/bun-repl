/* eslint-disable unicorn/custom-error-definition */
// Polyfill of the Node.js "repl" module (WIP)

import utl from '../utl';
import { builtinModules } from 'node:module';

class NotImplementedError extends Error {
    constructor(method: string, fullmsg: boolean = false) {
        super(fullmsg ? method : method + ' is not implemented');
        this.name = 'NotImplementedError';
    }
}

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
    if (val instanceof Error) return Bun.inspect(val, { colors: Bun.enableANSIColors });
    // @ts-expect-error not exactly 1:1 or safe but meh
    // eslint-disable-next-line
    return utl.inspect(val, globalThis.repl?.writer?.options ?? { colors: Bun.enableANSIColors, showProxy: true });
} as REPLWriterFunction;
Object.defineProperty(writer, 'options', {
    value: { ...utl.inspect.replDefaults }, enumerable: true
});

const repl = Object.defineProperties({}, {
    start: { value: start, enumerable: true },
    writer: { value: writer, enumerable: true },
    repl: {
        get() { throw new NotImplementedError('bun repl does not run on a REPLServer', true); },
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
