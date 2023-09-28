import { type JSC } from 'bun-devtools';
import { join, dirname, basename, resolve as pathresolve } from 'node:path';
import { readFileSync, existsSync, readSync } from 'node:fs';
import os from 'node:os';
import readline from 'node:readline';
import $ from './colors';
import swcrc from './swcrc';
import SWCTranspiler from './transpiler';
import repl from './module/repl';
import utl, { $Proxy } from './utl';
import bun, { serve, write, inspect as bunInspect } from 'bun';
const { exit, cwd } = process;
const stdoutWrite = process.stdout.write.bind(process.stdout);

/**Safely get an object's property. If an error occurs, just treat it as non-existent. */
export function SafeGet(obj: any, key: string | number | symbol): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    try { return obj?.[key]; } catch { return undefined; }
}

/** Safely inspect a value, falling down through implementations as they fail. If all inspectors fail, simply return undefined. */
export function SafeInspect(val: any, opts: utl.InspectOptions = {}): string {
    try {
        try {
            return utl.inspect(val, opts);
        } catch {
            // Bun's native inspect is expected to never fail. Unfortunately it doesn't inspect a lot of values properly,
            // nor does it support the full options object, therefore it's the fallback for now.
            if (opts.depth === null) opts.depth = Infinity;
            if (typeof opts.sorted === 'function') opts.sorted = true;
            return bunInspect(val, opts as utl.InspectOptions & { depth?: number, sorted?: boolean });
        }
    } catch {
        try {
            // In the greatly unexpected event of Bun's native inspect failing,
            // panic back to the primitive method of string coercion.
            console.warn($.yellow+$.dim+'All value inspection methods failed, this should not happen!'+$.reset);
            const str = val + '';
            // If the coercion somehow fails to return a proper string, resort to an empty one.
            return typeof str === 'string' ? str : '';
        } catch {
            // Here's a fun fact about javascript.
            // You can't rely even on string concatenation as a fully reliable string coercion method.
            // Introducing, null prototype objects: `Object.create(null) + ""` = throws TypeError
            return ''; // If this line of code ever runs, something truly catastrophic happened...
        }
    }
}

const GLOBAL = globalThis;
const { Buffer, WebSocket, Map, EvalError, TypeError, Error } = GLOBAL;
//const Promise: PromiseConstructor<any> = GLOBAL.Promise; // TS bug?
const { isBuffer } = Buffer;
const SymbolToStringTag = Symbol.toStringTag;
const JSONParse = JSON.parse;
const JSONStringify = JSON.stringify;
const ObjectAssign = Object.assign;
const ObjectDefineProperty = Object.defineProperty;
const ReflectGet = Reflect.get;
const ReflectSet = Reflect.set;
const ReflectDeleteProperty = Reflect.deleteProperty;
const RegExpTest = Function.prototype.call.bind(RegExp.prototype.test) as Primordial<RegExp, 'test'>;
const RegExpPrototypeSymbolReplace = Function.prototype.call.bind(RegExp.prototype[Symbol.replace]) as Primordial<RegExp, typeof Symbol.replace>;
const FunctionApply = Function.prototype.call.bind(Function.prototype.apply) as Primordial<Function, 'apply'>;
const BufferToString = Function.prototype.call.bind(Reflect.get(Buffer.prototype, 'toString') as Buffer['toString']) as Primordial<Buffer, 'toString'>;
const StringTrim = Function.prototype.call.bind(String.prototype.trim) as Primordial<String, 'trim'>;
const StringPadStart = Function.prototype.call.bind(String.prototype.padStart) as Primordial<String, 'padStart'>;
const StringPadEnd = Function.prototype.call.bind(String.prototype.padEnd) as Primordial<String, 'padEnd'>;
const StringRepeat = Function.prototype.call.bind(String.prototype.repeat) as Primordial<String, 'repeat'>;
const StringMatchAll = Function.prototype.call.bind(String.prototype.matchAll) as Primordial<String, 'matchAll'>;
const StringPrototypeSlice = Function.prototype.call.bind(String.prototype.slice) as Primordial<String, 'slice'>;
const StringPrototypeSplit = Function.prototype.call.bind(String.prototype.split) as Primordial<String, 'split'>;
const StringPrototypeIncludes = Function.prototype.call.bind(String.prototype.includes) as Primordial<String, 'includes'>;
const StringReplace = Function.prototype.call.bind(String.prototype.replace) as Primordial<String, 'replace'>;
const StringPrototypeReplaceAll = Function.prototype.call.bind(String.prototype.replaceAll) as Primordial<String, 'replaceAll'>;
const ArrayPush = Function.prototype.call.bind(Array.prototype.push) as Primordial<Array<any>, 'push'>;
const ArrayPrototypePop = Function.prototype.call.bind(Array.prototype.pop) as Primordial<Array<any>, 'pop'>;
const ArrayPrototypeJoin = Function.prototype.call.bind(Array.prototype.join) as Primordial<Array<any>, 'join'>;
const ArrayPrototypeFind = Function.prototype.call.bind(Array.prototype.find) as Primordial<Array<any>, 'find'>;
const ArrayPrototypeFilter = Function.prototype.call.bind(Array.prototype.filter) as Primordial<Array<any>, 'filter'>;
const MapGet = Function.prototype.call.bind(Map.prototype.get) as Primordial<Map<any, any>, 'get'>;
const MapSet = Function.prototype.call.bind(Map.prototype.set) as Primordial<Map<any, any>, 'set'>;
const MapDelete = Function.prototype.call.bind(Map.prototype.delete) as Primordial<Map<any, any>, 'delete'>;
const console = {
    dir:   GLOBAL.console.dir,
    log:   GLOBAL.console.log,
    info:  GLOBAL.console.info,
    warn:  GLOBAL.console.warn,
    error: GLOBAL.console.error,
    debug: GLOBAL.console.debug,
    clear: GLOBAL.console.clear,
    trace: GLOBAL.console.trace,
    assert: GLOBAL.console.assert,
};
// Uncomment below for extreme debugging
//for (const k in console) console[k as keyof typeof console] = GLOBAL.console.trace;
const IS_DEBUG = process.argv.includes('--debug');
const debuglog = IS_DEBUG ? (...args: string[]) => (console.debug($.dim+'DEBUG:', ...args, $.reset)) : () => void 0;
//const SLOPPY_MODE = process.argv.includes('--sloppy');
const NO_HISTORY = process.env.BUN_REPL_NO_HISTORY || process.argv.includes('--no-history');

type Primordial<T, M extends keyof T> = <S extends T>(
    self: S, ...args: Parameters<S[M] extends (...args: any) => any ? S[M] : never>
) => ReturnType<S[M] extends (...args: any) => any ? S[M] : never>;
type JSCResponsePromiseCallbacks = {
    resolve: <T extends JSC.ResponseMap[keyof JSC.ResponseMap]>(value: T) => void;
    reject: (reason: {
        code?: string | undefined;
        message: string;
    }) => void;
};
type EvalRemoteObject = JSC.Runtime.RemoteObject & { wasRejectedPromise?: boolean; wasThrown?: boolean; };
type RemoteObjectType = EvalRemoteObject['type'];
type RemoteObjectSubtype = NonNullable<EvalRemoteObject['subtype']>;
type TypeofToValueType<T extends RemoteObjectType> =
    T extends 'string' ? { type: T, value: string; } :
    T extends 'number' ? { type: T, value: number, description: string; } :
    T extends 'bigint' ? { type: T, description: string; } :
    T extends 'boolean' ? { type: T, value: boolean; } :
    T extends 'symbol' ? { type: T, objectId: string, className: string, description: string; } :
    T extends 'undefined' ? { type: T; } :
    T extends 'object' ? { type: T, subtype?: RemoteObjectSubtype, objectId: string, className: string, description: string; } :
    T extends 'function' ? { type: T, subtype?: RemoteObjectSubtype, objectId: string, className: string, description: string; } : never;
type SubtypeofToValueType<T extends RemoteObjectSubtype, BaseObj = { type: 'object', subtype: T, objectId: string, className: string, description: string; }> =
    T extends 'error' ? BaseObj :
    T extends 'array' ? BaseObj & { size: number; } :
    T extends 'null' ? { type: 'object', subtype: T, value: null; } :
    T extends 'regexp' ? BaseObj :
    T extends 'date' ? BaseObj :
    T extends 'map' ? BaseObj & { size: number; } :
    T extends 'set' ? BaseObj & { size: number; } :
    T extends 'weakmap' ? BaseObj & { size: number; } :
    T extends 'weakset' ? BaseObj & { size: number; } :
    T extends 'iterator' ? never /*//!error*/ :
    T extends 'class' ? { type: 'function', subtype: T, objectId: string, className: string, description: string, classPrototype: JSC.Runtime.RemoteObject; } :
    T extends 'proxy' ? BaseObj :
    T extends 'weakref' ? BaseObj : never;
interface Keypress { sequence: string, name: string, ctrl: boolean, meta: boolean, shift: boolean }
enum Modifier {
    NONE  = 0b000,
    CTRL  = 0b001,
    ALT   = 0b010,
    SHIFT = 0b100,
    CTRL_ALT       = CTRL | ALT,
    CTRL_SHIFT     = CTRL | SHIFT,
    ALT_SHIFT      = ALT  | SHIFT,
    CTRL_ALT_SHIFT = CTRL | ALT | SHIFT,
}

/** Convert a {@link WebSocket.onmessage} `event.data` value to a string. */
function wsDataToString(data: Parameters<NonNullable<WebSocket['onmessage']>>[0]['data']): string {
    if (data instanceof ArrayBuffer) return new TextDecoder('utf-8').decode(data);
    if (data instanceof Buffer || isBuffer(data)) return BufferToString(data, 'utf-8');
    else return data;
}

// Note: This is a custom REPLServer, not the Node.js node:repl module one.
class REPLServer extends WebSocket {
    constructor() {
        const server = serve({
            inspector: true,
            development: true,
            port: process.env.BUN_REPL_PORT ?? 0,
            // @ts-expect-error stub
            fetch() {},
        });
        super(`ws://${server.hostname}:${server.port}/bun:inspect`);
        debuglog(`[ws/open] repl server listening on ${$.blueBright}ws://${server.hostname}:${server.port}/bun:inspect`);
        this.onmessage = (event) => {
            try {
                const data = JSONParse(wsDataToString(event.data)) as JSC.Response<keyof JSC.ResponseMap>;
                const { id } = data;
                const promiseRef = MapGet(this.#pendingReqs, id);
                if (promiseRef) {
                    MapDelete(this.#pendingReqs, id);
                    if ('error' in data) promiseRef.reject(data.error);
                    else if ('result' in data) promiseRef.resolve(data.result);
                    else throw `Received response with no result or error: ${id}`;
                } else throw `Received message for unknown request ID: ${id}`;
            } catch (err) {
                console.error(`[ws/message] An unexpected error occured:`, err, '\nReceived Data:', event.data);
            }
        };
        this.onclose = () => console.info('[ws/close] disconnected');
        this.onerror = (error) => console.error('[ws/error]', error);
    }

    /** Incrementing current request ID */
    #reqID = 0;
    /** Object ID of the global object */
    #globalObjectID!: string;
    /** Queue of pending requests promises to resolve, mapped by request ID */
    readonly #pendingReqs = new Map<number, JSCResponsePromiseCallbacks>();
    /** Must be awaited before using the REPLServer */
    readonly ready = new Promise<void>(resolve => {
        // It's okay to not use primordials here since this only runs once before users can use the REPL
        this.onopen = () => void this.request('Runtime.enable', {})
            .then(() => this.rawEval('globalThis'))
            .then(({ result }) => {
                this.#globalObjectID = result.objectId!;
                GLOBAL.Proxy = $Proxy;
                Object.defineProperty(GLOBAL, '_', { value: undefined, writable: true });
                Object.defineProperty(GLOBAL, '_error', { value: undefined, writable: true });
                Object.defineProperty(GLOBAL, 'repl', { value: repl });
                // import.meta.resolveSync takes a *file* path for the parent.
                // Bun.resolveSync takes a *directory* path for the parent.
                const { resolveSync } = Bun;
                const ArrayIncludes = Function.prototype.call.bind(Array.prototype.includes) as Primordial<Array<any>, 'includes'>;
                const nodePrefixedModules = repl.builtinModules
                    .filter(x => x[0] !== '_' && !x.includes(':') && !['undici', 'ws', 'detect-libc', 'bun'].includes(x));
                // eslint-disable-next-line unicorn/prefer-module
                const originalRequire = require;
                Object.defineProperty(GLOBAL, 'require', { value: function require(moduleID: string) {
                    if (ArrayIncludes(nodePrefixedModules, moduleID)) moduleID = `node:${moduleID}`;
                    if (moduleID === 'node:repl') return repl; // polyfill
                    if (moduleID === 'bun') return bun; // workaround
                    const here = cwd();
                    try {
                        moduleID = resolveSync(moduleID, here);
                    } catch {
                        // TODO: attempt to load the module from the global directory if it's not found in the local directory
                        throw {
                            name: 'ResolveError',
                            message: `Cannot find module "${moduleID}" from "${join(here, swcrc.filename!)}"`,
                            specifier: moduleID
                        };
                    }
                    debuglog((`Importing: ${$.blueBright+moduleID+$.reset}`));
                    try {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        return import.meta.require(moduleID);
                    } catch (e) {
                        const err = e as Error;
                        if (err instanceof TypeError && StringPrototypeIncludes(err.message, 'require() async module')) {
                            err.stack = '';
                        }
                        throw err;
                    }
                } });
                Object.defineProperties(GLOBAL.require, {
                    resolve: { value: function resolve(moduleID: string, { paths = ['.'] } = {}) {
                        if (paths.length === 0) paths.push('.');
                        const base = cwd();
                        for (const path of paths) {
                            const from = pathresolve(base, path);
                            try {
                                return resolveSync(moduleID, from);
                            } catch { continue; }
                        }
                        throw {
                            name: 'ResolveError',
                            message: `Cannot find module "${moduleID}"`,
                            specifier: moduleID
                        };
                    } },
                    main: { value: Reflect.get(originalRequire, 'main') as unknown },
                    extensions: { value: Reflect.get(originalRequire, 'extensions') as unknown },
                    cache: { value: Reflect.get(originalRequire, 'cache') as unknown },
                });
                GLOBAL.require.resolve.paths = function paths() { return []; }; // Bun's polyfill of this function is also like this for now
                const REQUIRE = GLOBAL.require;
                for (const module of nodePrefixedModules) {
                    if (module.includes('/')) continue;
                    if (['crypto', 'repl', 'process', 'console'].includes(module)) continue;
                    const descriptor: PropertyDescriptor & { cached: unknown } = { cached: null };
                    const getter = (function (this: typeof descriptor) {
                        if (this.cached) return this.cached;
                        return this.cached = REQUIRE(module) as unknown;
                    }).bind(descriptor);
                    descriptor.get = getter;
                    Object.defineProperty(GLOBAL, module, descriptor);
                }
                for (const module of repl.builtinModules.filter(x => x.startsWith('bun:'))) {
                    if (module.includes('/')) continue;
                    if (['bun:main', 'bun:wrap'].includes(module)) continue;
                    const descriptor: PropertyDescriptor & { cached: unknown } = { cached: null };
                    const getter = (function (this: typeof descriptor) {
                        if (this.cached) return this.cached;
                        return this.cached = REQUIRE(module) as unknown;
                    }).bind(descriptor);
                    descriptor.get = getter;
                    Object.defineProperty(GLOBAL, module.slice(4), descriptor);
                }
                
                // Yes, if someone types a 0xFFFF characters line, they will fill up the buffer.
                // But that's very unlikely to happen, and if it does, it will just cutoff the line.
                // Anyway this just a temporary workaround for https://github.com/oven-sh/bun/issues/5267
                const promptReuseBuffer = Buffer.allocUnsafe(0xFFFF);
                globalThis.prompt = function prompt(question: string = 'Prompt', defaultValue: unknown = null): string | null {
                    stdoutWrite(question + ' ');
                    let i = -1;
                    // eslint-disable-next-line no-constant-condition
                    while (true) {
                        // This currently relies on https://github.com/oven-sh/bun/issues/5305
                        // If that bug is fixed, this will break one way or another.
                        const read = readSync(0, promptReuseBuffer, { length: 1, offset: ++i });
                        if (read !== 1) {
                            if (read === 0) { // This means the buffer got filled up (unlikely, but possible)
                                stdoutWrite('\n');
                                return BufferToString(promptReuseBuffer, 'utf8', 0, i) || defaultValue as string | null;
                            }
                            else throw new Error('Unexpected read length'); // This will tell us if the bug is fixed.
                        }
                        const char = promptReuseBuffer[i];
                        if (char === 3) {
                            stdoutWrite('^C\n');
                            exit(0);
                        }
                        if (char === 4) {
                            stdoutWrite('\n');
                            return defaultValue as string | null;
                        }
                        if (char === 27) {
                            stdoutWrite('^[');
                            continue;
                        }
                        if (char === 127) {
                            i--;
                            if (i < 0) continue;
                            stdoutWrite('\b \b');
                            if (promptReuseBuffer[i] === 27) stdoutWrite('\b \b');
                            i--;
                            continue;
                        }
                        stdoutWrite(BufferToString(promptReuseBuffer, 'utf8', i, i + 1));
                        if (char === 13 || char === 10) {
                            stdoutWrite('\n');
                            return BufferToString(promptReuseBuffer, 'utf8', 0, i) || defaultValue as string | null;
                        }
                    }
                };
                Object.defineProperty(GLOBAL, '@@bunReplRuntimeHelpers', {
                    value: Object.freeze({
                        join, dirname, basename, resolve: pathresolve, getcwd: process.cwd,
                        pathToFileURL: Bun.pathToFileURL, fileURLToPath: Bun.fileURLToPath,
                        StringStartsWith: Function.prototype.call.bind(String.prototype.startsWith),
                        ObjectFreeze: Object.freeze,
                    }),
                });
                Object.defineProperty(GLOBAL, 'eval', { value: eval, configurable: false, writable: false }); // used by inlined import.meta trick
                Object.defineProperty(GLOBAL, 'Object', { value: Object, configurable: false, writable: false }); // used by swc
                Object.freeze(Object); // bun's node:events polyfill relies on this
                Object.freeze(Promise); // must preserve .name property
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                Object.freeze(Promise.prototype); // too many possible pitfalls
                //? Workarounds for bug: https://canary.discord.com/channels/876711213126520882/888839314056839309/1120394929164779570
                const TypedArray = Object.getPrototypeOf(Uint8Array) as typeof Uint8Array.prototype;
                const wrapIterator = (iterable: Record<string | symbol, any>, key: string | symbol = Symbol.iterator, name = iterable.name + ' Iterator') => {
                    const original = Reflect.get(iterable.prototype, key) as GeneratorFunction;
                    Reflect.set(iterable.prototype, key, function (this: typeof iterable, ...argz: any[]) {
                        // eslint-disable-next-line @typescript-eslint/no-this-alias
                        const thiz = this;
                        function* wrappedIter() { yield* FunctionApply(original, thiz, argz) as Generator; }
                        return ObjectDefineProperty(wrappedIter(), SymbolToStringTag, { value: name, configurable: true });
                    });
                };
                wrapIterator(Array);
                wrapIterator(Array, 'keys');
                wrapIterator(Array, 'values');
                wrapIterator(Array, 'entries');
                wrapIterator(TypedArray, Symbol.iterator, 'Array Iterator');
                wrapIterator(TypedArray, 'entries', 'Array Iterator');
                wrapIterator(TypedArray, 'values', 'Array Iterator');
                wrapIterator(TypedArray, 'keys', 'Array Iterator');
                wrapIterator(String);
                wrapIterator(Map);
                wrapIterator(Map, 'keys');
                wrapIterator(Map, 'values');
                wrapIterator(Map, 'entries');
                wrapIterator(Set);
                wrapIterator(Set, 'keys');
                wrapIterator(Set, 'values');
                wrapIterator(Set, 'entries');

                resolve();
            });
    });

    /** Check and assert typeof for a remote object */
    typeof<T extends RemoteObjectType>(v: JSC.Runtime.RemoteObject, expected: T):
        v is Omit<JSC.Runtime.RemoteObject, 'value'> & TypeofToValueType<T> {
        return v.type === expected;
    }
    /** Check and assert subtypeof for a remote object */
    subtypeof<T extends RemoteObjectSubtype>(v: JSC.Runtime.RemoteObject, expected: T):
        v is Omit<JSC.Runtime.RemoteObject, 'value'> & SubtypeofToValueType<T> {
        return v.subtype === expected;
    }
    /** Send a direct request to the inspector */
    request<T extends keyof JSC.RequestMap>(method: T, params: JSC.RequestMap[T]) {
        const req: JSC.Request<T> = { id: ++this.#reqID, method, params };
        const response = new Promise<JSC.ResponseMap[T]>((resolve, reject) => {
            MapSet(this.#pendingReqs, this.#reqID, { resolve: resolve as typeof resolve extends Promise<infer P> ? P : never, reject });
        }).catch(err => { throw ObjectAssign(new Error, err); });
        this.send(JSONStringify(req));
        return response;
    }
    /** Direct shortcut for a `Runtime.evaluate` request */
    async rawEval(code: string): Promise<JSC.Runtime.EvaluateResponse> {
        return this.request('Runtime.evaluate', {
            expression: code,
            generatePreview: true
        });
    }
    /** Run a snippet of code in the REPL */
    async eval(code: string, topLevelAwaited = false, extraOut?: { errored?: boolean, noPrintError?: boolean }): Promise<string> {
        debuglog(`transpiled code: ${StringTrim(code)}`);
        const { result, wasThrown: thrown } = await this.rawEval(code);
        let remoteObj: EvalRemoteObject = result;
        remoteObj.wasThrown = thrown;

        if (result.type === 'object') ObjectTypeHandler: {
            if (result.subtype === 'null') break ObjectTypeHandler;
            if (!result.objectId) throw new EvalError(`Received non-null object without objectId: ${JSONStringify(result)}`);
            if (result.className === 'Promise') {
                if (!result.preview) throw new EvalError(`Received Promise object without preview: ${JSONStringify(result)}}`);
                if (topLevelAwaited) {
                    const awaited = await this.request('Runtime.awaitPromise', { promiseObjectId: result.objectId, generatePreview: false });
                    remoteObj = awaited.result;
                    remoteObj.wasThrown = awaited.wasThrown;
                    if (remoteObj.type === 'undefined') {
                        console.warn(
                            $.yellow+$.dim+'[!] REPL top-level await is still very experimental and prone to failing on complex code snippets.\n' +
                            '    You are seeing this because top-level await usage was detected with undefined as the result, if that was expected, you can ignore this.'+$.reset
                        );
                    }
                }
                if (result.preview.properties && ArrayPrototypeFind(result.preview.properties, p => p.name === 'status')?.value === 'rejected') {
                    remoteObj.wasRejectedPromise = true;
                }
                break ObjectTypeHandler;
            }
        }

        //! bug workaround, bigints are being passed as undefined to Runtime.callFunctionOn (?)
        if (remoteObj.type === 'bigint') {
            if (!remoteObj.description) throw new EvalError(`Received BigInt value without description: ${JSONStringify(remoteObj)}`);
            const value = BigInt(StringPrototypeSlice(remoteObj.description, 0, -1));
            ReflectSet(GLOBAL, remoteObj.wasThrown ? '_error' : '_', value);
            return (remoteObj.wasThrown ? $.red + 'Uncaught ' + $.reset : '') + SafeInspect(value,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                ReflectGet(GLOBAL, 'repl')?.writer?.options as utl.InspectOptions
                ?? { colors: Bun.enableANSIColors, showProxy: true }
            );
        }
        //! bug workaround, Infinity and NaN are being passed as null to Runtime.callFunctionOn (?)
        // also -0 is being passed as 0
        if (remoteObj.type === 'number') {
            if (!remoteObj.description) throw new EvalError(`Received Number value without description: ${JSONStringify(remoteObj)}`);
            let value = remoteObj.value as number;
            if (remoteObj.description === 'Infinity') value = Infinity;
            else if (remoteObj.description === '-Infinity') value = -Infinity;
            else if (remoteObj.description === 'NaN') value = NaN;
            else if (remoteObj.description === '-0') value = -0;
            ReflectSet(GLOBAL, remoteObj.wasThrown ? '_error' : '_', value);
            return (remoteObj.wasThrown ? $.red + 'Uncaught ' + $.reset : '') + SafeInspect(value,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                ReflectGet(GLOBAL, 'repl')?.writer?.options as utl.InspectOptions
                ?? { colors: Bun.enableANSIColors, showProxy: true }
            );
        }

        const { wasThrown } = remoteObj;
        const REPL_INTERNALS = '@@bunReplInternals';
        ObjectDefineProperty(GLOBAL, REPL_INTERNALS, {
            value: { SafeInspect, SafeGet, StringReplace, bunInspect },
            configurable: true,
        });
        const inspected = await this.request('Runtime.callFunctionOn', {
            objectId: this.#globalObjectID,
            functionDeclaration: `(v) => {
                const { SafeInspect, SafeGet, StringReplace, bunInspect } = this['${REPL_INTERNALS}'];
                if (!${wasThrown!}) this._ = v;
                else this._error = v;
                if (v?.name === 'ResolveError')
                    return \`${$.red}ResolveError${$.reset}${$.dim}: ${$.reset}${$.whiteBright}\${StringReplace(
                    SafeGet(v, 'message') || \`Failed to resolve import "?" from "?"\`, / ".+" from ".+"$/,
                    \` ${$.blueBright}"\${SafeGet(v, 'specifier') ?? '<unresolved>'}"${$.whiteBright} from ${$.cyan+cwd()}/${swcrc.filename!}\`
                )}${$.reset}\`;
                if (${remoteObj.subtype === 'error'}) return bunInspect(v, { colors: ${Bun.enableANSIColors} });
                return SafeInspect(v, this.repl?.writer?.options ?? { colors: ${Bun.enableANSIColors}, showProxy: true });
            }`,
            arguments: [remoteObj],
        });
        ReflectDeleteProperty(GLOBAL, REPL_INTERNALS);
        if (inspected.wasThrown) throw new EvalError(`Failed to inspect object: ${JSONStringify(inspected)}`);
        if (!this.typeof(inspected.result, 'string')) throw new EvalError(`Received non-string inspect result: ${JSONStringify(inspected)}`);
        if (extraOut) {
            if (wasThrown) extraOut.errored = true;
            if (remoteObj.wasRejectedPromise) extraOut.noPrintError = true;
        }
        if (wasThrown && remoteObj.subtype !== 'error') return $.red + 'Uncaught ' + $.reset + inspected.result.value;
        return inspected.result.value;
    }
}

async function loadHistoryData(): Promise<{ path: string, lines: string[] }> {
    if (NO_HISTORY) return { path: '', lines: [] };
    let out: { path: string; lines: string[]; } | null;
    if (process.env.XDG_DATA_HOME && (out = await tryLoadHistory(process.env.XDG_DATA_HOME, 'bun'))) return out;
    else if (process.env.BUN_INSTALL && (out = await tryLoadHistory(process.env.BUN_INSTALL))) return out;
    else {
        debuglog('Trying to load history from fallback location at home directory.');
        const homedir = os.homedir();
        return await tryLoadHistory(homedir) ?? { path: join(homedir, '.bun_repl_history'), lines: [] };
    }
}
async function tryLoadHistory(...dir: string[]) {
    const path = join(...dir, '.bun_repl_history');
    try {
        debuglog(`Trying to load REPL history from ${path}`);
        if (!existsSync(path)) {
            debuglog(`History file not found, creating new one at ${path}`);
            await write(path, '\n');
            // BUG: Bun.file doesn't update the file's status after writing to it
        }
        debuglog(`Loading history file from ${path}`);
        return { path, lines: readFileSync(path, 'utf8').split('\n') };
    } catch (err) {
        debuglog(`Failed to load history file from ${path}\nError will be printed below:`);
        if (IS_DEBUG) console.error(err);
        return null;
    }
}

// This only supports the most basic var/let/const declarations
const JSVarDeclRegex = /(?<keyword>var|let|const)\s+(?<varname>(?:[$_\p{ID_Start}]|\\u[\da-fA-F]{4})(?:[$\u200C\u200D\p{ID_Continue}]|\\u[\da-fA-F]{4})*)/gu;

// Wrap the code in an async function if it contains top level await
// Make sure to return the result of the last expression
function tryProcessTopLevelAwait(src: string) {
    const lines = StringPrototypeSplit(src, '\n' as unknown as RegExp);
    if (!StringTrim(lines[lines.length - 1])) ArrayPrototypePop(lines);
    lines[lines.length - 1] = 'return ' + lines[lines.length - 1] + ';})();';
    lines[0] = '(async()=>{' + lines[0];
    let hoisted = '';
    const transformed = StringPrototypeReplaceAll(ArrayPrototypeJoin(lines, '\n'), JSVarDeclRegex, (m, _1, _2, idx, str, groups) => {
        const { keyword, varname } = groups as { keyword: string, varname: string };
        hoisted += `${keyword === 'const' ? 'let' : keyword} ${varname};`;
        return varname;
    });
    return hoisted + transformed;
}

async function tryGetPackageVersion() {
    try {
        return 'v' + (await import('../package.json')).default.version;
    } catch {
        return $.dim+$.redBright+'failed to retrieve version'+$.reset;
    }
}

// Regex used for ANSI escape code splitting
// Adopted from https://github.com/chalk/ansi-regex/blob/HEAD/index.js
// License: MIT, authors: @sindresorhus, Qix-, arjunmehta and LitoMore
// Matches all ansi escape code sequences in a string
const ansiPattern =
  "[\\u001B\\u009B][[\\]()#;?]*" +
  "(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*" +
  "|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)" +
  "|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))";
const ansi = new RegExp(ansiPattern, "g");
/** Remove all VT control characters. Use to estimate displayed string width. */
function stripVTControlCharacters(str: string) {
    return RegExpPrototypeSymbolReplace(ansi, str, '' as unknown as (substring: string, ...args: any[]) => string);
}

function rlRefresh(rl: readline.Interface) {
    // @ts-expect-error "internal" function
    rl._refreshLine(); // eslint-disable-line @typescript-eslint/no-unsafe-call
}
function rlLineInsert(rl: readline.Interface, insert: string, cutoff = 0) {
    const { line, cursor } = rl;
    const middle = cursor - cutoff;
    const lineStart = StringPrototypeSlice(line, 0, middle < 0 ? 0 : middle);
    const lineEnd = StringPrototypeSlice(line, cursor);
    ReflectSet(rl, 'line', lineStart + insert + lineEnd);
    ReflectSet(rl, 'cursor', cursor + insert.length - (middle < 0 ? 0 : cutoff));
    rlRefresh(rl);
}

const isMac = process.platform === 'darwin';
const metaKey = (key: string) => (isMac ? 'Meta+' : 'Alt+') + key + (isMac ? '' : ' ');

export default {
    async start(singleshotCode?: string, printSingleshot = false) {
        try {
            debuglog('Debug mode enabled.');
            if (IS_DEBUG) { // while debuglog by itself is handy for simple strings its important to note JS will still evaluate the arguments
                debuglog(
                    `REPL version ${await tryGetPackageVersion()} running on Bun v${Bun.version}+${Bun.revision} (${process.platform} ${process.arch})`
                );
                debuglog(`OS Info: ${os.type()} -- ${os.release()} -- ${os.version()}`);
            }
            const repl = new REPLServer();
            await repl.ready;
            debuglog('REPL server initialized.');
            // TODO: How to make Bun transpiler not dead-code-eliminate lone constants like "5"?
            const transpiler = new SWCTranspiler();
            debuglog('Transpiler initialized.');
            /*new Bun.Transpiler({
                target: 'bun',
                loader: 'ts',
                minifyWhitespace: false,
                trimUnusedImports: false,
                treeShaking: false,
                inline: false,
                jsxOptimizationInline: false,
            });*/
            if (singleshotCode) {
                let code: string = singleshotCode;
                try {
                    code = transpiler.preprocess(code);
                    code = transpiler.transpile(code);
                    code = transpiler.postprocess(code);
                } catch (e) {
                    const err = e as Error;
                    console.error((err?.message ?? 'Unknown transpiler error.').split('\nCaused by:\n')[0].trim());
                    return exit(1);
                }
                let hasTLA = false;
                if (StringPrototypeIncludes(code, 'await')) {
                    hasTLA = true;
                    code = tryProcessTopLevelAwait(code);
                }
                const extraInfo = { errored: false, noPrintError: false };
                const evaled = await repl.eval(/* ts */`${code}`, hasTLA, extraInfo);
                if (!extraInfo.noPrintError) {
                    if (extraInfo.errored) console.error(evaled);
                    else if (printSingleshot) console.log(evaled);
                } else if (!extraInfo.errored && printSingleshot) console.log(evaled);
                return exit(0);
            }
            const history = await loadHistoryData();
            let historySize = Number(process.env.BUN_REPL_HISTORY_SIZE ?? 1000);
            if (!Number.isSafeInteger(historySize) || historySize < 1) {
                console.warn(
                    `[!] Invalid BUN_REPL_HISTORY_SIZE value "${process.env.BUN_REPL_HISTORY_SIZE!}", must be a safe positive integer!\n` +
                    `    Using the default value of 1000.`
                );
                historySize = 1000;
            }
            if (NO_HISTORY) debuglog('Skipped history file loading due to --no-history flag.');
            else debuglog(`REPL history data loaded: (${history.lines.length} lines) ${history.path}`);
            const sessionHistoryNoErrors: string[] = [];
            
            if (!process.stdin.isTTY) {
                console.error('[!] Failed to start REPL interface! Is the command running in an interactive terminal?');
                return exit(1);
            }
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: true,
                tabSize: 4,
                prompt: process.env.BUN_REPL_PROMPT ?? '> ',
                historySize: historySize,
                history: history.lines,
                // completions currently cause a panic "FilePoll.register failed: 17"
                //completer(line: string) {
                //    const completions = ['hello', 'world'];
                //    const hits = completions.filter(c => c.startsWith(line));
                //    return [hits.length ? hits : completions, line];
                //}
            });
            debuglog('readline interface created.');
            process.on('exit', () => {
                rl.close();
            });
            console.log(`Welcome to Bun v${Bun.version}\nType ".help" for more information.`);
            console.warn(
                `${$.yellow+$.dim}[!] Please note that the REPL implementation is still experimental!\n` +
                `    Don't consider it to be representative of the stability or behavior of Bun overall.${$.reset}`);
            //* Only primordials should be used beyond this point!
            const multiline = { enabled: false, lines: [] as string[] };
            const toggleMultiline = () => {
                multiline.enabled = !multiline.enabled;
                multiline.lines = [];
                if (multiline.enabled) {
                    rl.setPrompt(`${$.purple}(m)${$.reset} ` + rl.getPrompt());
                    console.log(
                        StringPadEnd(
                            `\r${$.gray}Multi-line mode enabled. End a line with "${$.whiteBright}.${$.gray}" to send.${$.reset}`,
                            rl.line.length + rl.getPrompt().length
                        ) +
                                StringRepeat('\n', [...StringMatchAll(rl.line, '\n' as unknown as RegExp)].length)
                    );
                }
                else {
                    rl.setPrompt(process.env.BUN_REPL_PROMPT ?? '> ');
                    console.log(
                        StringPadEnd(`\r${$.gray}Multi-line mode disabled.${$.reset}`, rl.line.length + rl.getPrompt().length) +
                                StringRepeat('\n', [...StringMatchAll(rl.line, '\n' as unknown as RegExp)].length)
                    );
                }
                rlRefresh(rl);
            };
            process.stdin.on('keypress', (char: string, key: Keypress) => {
                let modifier: Modifier = Modifier.NONE;
                if (key.ctrl)  modifier |= Modifier.CTRL;
                if (key.meta)  modifier |= Modifier.ALT;
                if (key.shift) modifier |= Modifier.SHIFT;

                if (modifier === Modifier.NONE) {
                    if (key.name === 'tab') {
                        // refuse to place the tab in preparation for autocompletion
                        return rlLineInsert(rl, '', 1);
                    }
                }
                else if (modifier === Modifier.SHIFT) switch (key.name) {
                    case 'tab': {
                        rlLineInsert(rl, '    ');
                    } break;
                    default: return;
                }
                else if (modifier === Modifier.ALT) switch (key.name) {
                    case 'n': {
                        if (!multiline.enabled) rlLineInsert(rl, '\n');
                        else {
                            const { line, cursor } = rl;
                            ReflectSet(rl, 'line', StringPrototypeSlice(line, 0, cursor));
                            rlRefresh(rl);
                            rl.write('\n');
                            ReflectSet(rl, 'line', StringPrototypeSlice(line, cursor));
                            rlRefresh(rl);
                        }
                    } break;
                    case 'm': {
                        toggleMultiline();
                    } break;
                    default: return;
                }
                else if (modifier === Modifier.CTRL) switch (key.name) {
                    default: return;
                }
                else if (modifier === Modifier.ALT_SHIFT) switch (key.name) {
                    // TODO: readline.moveCursor is broken ("TypeError: undefined is not a function")
                    case 'up': {
                        //readline.moveCursor(process.stdin, 0, -1, () => void 0);
                    } break;
                    case 'down': {
                        //readline.moveCursor(process.stdin, 0, 1, () => void 0);
                    } break;
                    default: return;
                }
            });
            rl.on('SIGINT', () => {
                if (rl.line.length === 0) rl.close();
                else {
                    console.log('');
                    ReflectSet(rl, 'line', '');
                    rl.prompt();
                }
            });
            rl.on('close', () => {
                if (!NO_HISTORY) write(
                    history.path,
                    ArrayPrototypeJoin(ArrayPrototypeFilter(history.lines, l => l !== '.exit'), '\n')
                ).catch(() => console.warn(`[!] Failed to save REPL history to ${history.path}!`));
                console.log(''); // ensure newline
                exit(0);
            });
            rl.on('history', newHistory => {
                history.lines = newHistory;
            });
            rl.on('line', async (line, { loadingFile = false } = {}) => {
                line = StringTrim(line);
                if (!line) return rl.prompt();
                if (
                    !loadingFile && (line[0] === '.' && multiline.lines.length === 0 && !RegExpTest(/\d/, line[1]))
                ) {
                    const replCmd = StringPrototypeSplit(line, /\s+/g);
                    switch (replCmd[0]) {
                        case '.help': {
                            console.log(
                                `Commands & keybinds:\n` +
                                `    .help         Show this help message.\n` +
                                `    .info         Print extra REPL information.\n` +
                                `    .multiline    Toggle multi-line mode. ${$.gray}(${metaKey('M').trim()})${$.reset}\n` +
                                `    .save         Save all successful commands evaluated in this REPL session to a file.\n` +
                                `    .load         Load a file into the REPL session. ${$.yellow}(Experimental)${$.reset}\n` +
                                `    .clear        Clear the screen. ${$.gray}(Ctrl+L)${$.reset}\n` +
                                `    .exit         Exit the REPL. ${$.gray}(Ctrl+C / Ctrl+D)${$.reset}\n` +
                                `\n` +
                                `    ${metaKey('N')}        Insert a raw newline at cursor position, works even in single-line mode.\n` +
                                `      ${$.dim}* In multi-line mode, ${$.noDim+$.gray}Enter${$.reset+$.dim} can only append newline to the end of the input.${$.reset}\n` +
                                `    ${metaKey('M')}        Toggle multi-line mode.\n` +
                                `    Shift+Tab     Insert an indent instead of triggering autocompletions (autocomplete not yet implemented).` +
                                (!isMac ? '' : (
                                    `\n\n${$.dim}[?] MacOS users: The ${$.noDim+$.gray}Meta${$.reset+$.dim} key defaults to ${$.noDim+$.gray}Esc${$.reset+$.dim}, ` +
                                    `but may also be mapped to ${$.noDim+$.gray}Option${$.reset+$.dim} based on your terminal settings.${$.reset}`
                                ))
                            );
                        } break;
                        case '.info': {
                            console.log(
                                `Running on Bun v${Bun.version} ${$.gray}(${Bun.revision})${$.reset}\n` +
                                `    REPL version: ${await tryGetPackageVersion()}\n` +
                                `    Color mode: ${Bun.enableANSIColors ? `${$.greenBright}Enabled` : 'Disabled'}${$.reset}\n` +
                                `    Debug mode: ${IS_DEBUG ? `${$.greenBright}Enabled` : $.dim+'Disabled'}${$.reset}`
                            );
                        } break;
                        case '.multiline': {
                            toggleMultiline();
                        } break;
                        case '.load': {
                            const filepath = replCmd[1];
                            if (!filepath) {
                                console.log(`${$.red}Missing argument, usage: ${$.whiteBright}.load <filepath>${$.reset}`);
                                break;
                            }
                            const resolved = pathresolve(filepath);
                            try {
                                const contents = readFileSync(resolved, 'utf8');
                                console.warn(`${$.yellow+$.dim}[!] Loading files into the REPL is experimental and may not work as expected.${$.reset}`);
                                rl.emit('line', contents, { loadingFile: true });
                            } catch (e) {
                                const err = e as Error;
                                console.error(`Failed to load file ${$.cyan}${resolved}${$.red}: ${err.message ?? 'Unknown error'}${$.reset}`);
                                if (IS_DEBUG) console.error(err);
                                break;
                            }
                        } break;
                        case '.save': {
                            const filepath = replCmd[1];
                            if (!filepath) {
                                console.log(`${$.red}Missing argument, usage: ${$.whiteBright}.save <filepath>${$.reset}`);
                                break;
                            }
                            const resolved = pathresolve(filepath);
                            const contents = ArrayPrototypeJoin(sessionHistoryNoErrors, '\n');
                            try {
                                await write(resolved, contents);
                            } catch (e) {
                                const err = e as Error;
                                console.error(`Failed to save REPL session to ${$.cyan}${resolved}${$.red}: ${err.message ?? 'Unknown error'}${$.reset}`);
                                if (IS_DEBUG) console.error(err);
                                break;
                            }
                            console.log(`Saved REPL session to: ${$.cyan}${resolved}${$.reset+$.dim} (${contents.length} chars)${$.reset}`);
                        } break;
                        case '.clear': {
                            console.clear();
                        } break;
                        case '.exit': {
                            rl.close();
                        } break;
                        default: {
                            console.log(
                                `${$.red}Unknown REPL command "${$.whiteBright}${line}${$.red}", ` +
                                `type "${$.whiteBright}.help${$.red}" for more information.${$.reset}`
                            );
                        } break;
                    }
                } else {
                    if (multiline.enabled && !loadingFile) {
                        if (line[line.length - 1] === '.') {
                            ArrayPush(multiline.lines, StringPrototypeSlice(line, 0, -1));
                            line = ArrayPrototypeJoin(multiline.lines, '\n');
                            multiline.lines = [];
                            rl.setPrompt(`${$.purple}(m)${$.reset} ` + (process.env.BUN_REPL_PROMPT ?? '> '));
                            //rlRefresh(rl);
                        } else {
                            ArrayPush(multiline.lines, line);
                            const promptLineNo = `${$.dim}${multiline.lines.length + 1} | ${$.reset}`;
                            const stripped = stripVTControlCharacters(promptLineNo);
                            const padded = StringPadStart(stripped, stripVTControlCharacters(rl.getPrompt()).length);
                            rl.setPrompt(StringRepeat(' ', padded.length - stripped.length) + promptLineNo);
                            rlRefresh(rl);
                            return;
                        }
                    }
                    const backupPrompt = rl.getPrompt();
                    if (loadingFile) rl.setPrompt('');
                    let code: string = line;
                    try {
                        if (RegExpTest(/^\s*{/, code) && !RegExpTest(/;\s*$/, code)) code = `(${code})`;
                        code = transpiler.preprocess(code);
                        code = transpiler.transpile(code);
                        code = transpiler.postprocess(code);
                    } catch (e) {
                        const err = e as Error;
                        if (err.stack?.includes('@swc/core')) {
                            console.error(
                                'Internal failure due to global builtins tampering, this is likely not a bug but a temporary limitation of the REPL.\n' +
                                'Please do not report this and avoid tampering with the global builtins in the REPL.\n' +
                                'If you didn\'t tamper with the global builtins, please report this as a bug.'
                            );
                            if (IS_DEBUG) console.error(e);
                            exit(0);
                        }
                        console.error(
                            StringTrim(StringPrototypeSplit(
                                err?.message ?? 'Unknown transpiler error.', '\nCaused by:\n' as unknown as RegExp
                            )[0])
                        );
                        if (IS_DEBUG) console.error(e);
                        rl.prompt();
                        return;
                    }
                    let hasTLA = false;
                    if (StringPrototypeIncludes(code, 'await')) {
                        hasTLA = true;
                        code = tryProcessTopLevelAwait(code);
                    }
                    const extraInfo = { errored: false, noPrintError: false };
                    const evaled = await repl.eval(/* ts */`${code}`, hasTLA, extraInfo);
                    if (!extraInfo.noPrintError) {
                        if (extraInfo.errored) console.error(evaled);
                        else {
                            console.log(evaled);
                            ArrayPush(sessionHistoryNoErrors, line);
                        }
                    } else if (!extraInfo.errored) {
                        console.log(evaled);
                        ArrayPush(sessionHistoryNoErrors, line);
                    }
                    if (loadingFile) rl.setPrompt(backupPrompt);
                }
                rl.prompt();
            });
            debuglog('readline interface event handlers registered.');
            rl.prompt();
        } catch (err) {
            console.error('Internal REPL Error:');
            console.error(err, '\nThis should not happen! Search GitHub issues https://bun.sh/issues or ask for #help in https://bun.sh/discord');
            exit(1);
        }
    }
};
