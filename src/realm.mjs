/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/// <reference types="bun-types"/>

// This file is executed once at the start of the REPL within its ShadowRealm.
// Primarily used to inject values into the REPL's ShadowRealm global objects.
// Keep in mind functions within this file will also be executed inside the ShadowRealm,
// therefore all globals used must be backed up to REPLGlobal or the user can crash the REPL.

import './extendglobals';
import $ from './colors';
import utl from './utl';
import bun from 'bun';
import path from 'path';
import swcrc from './swcrc';
import { debuglog } from './debug';
import { SafeGet, SafeInspect, Primordial } from './utils';
import repl, { bunPrefixedModules, nodePrefixedModules } from './module/repl';

// The snippet below will eventually be used for loading global modules in the REPL, but for now it's not used since it's not very reliable.
// /** @type string | null */
//let globalDir = null;
//try {
//    globalDir = path.join(Bun.spawnSync(['bun', 'pm', 'cache']).stdout?.toString('utf8').trim() ?? /**@type any*/(null)['throw'], '..', 'global');
//    debuglog($.green+$.dim+'Resolved global dir (experimental):', globalDir, $.reset);
//} catch {
//    globalDir = null;
//    debuglog($.red+$.dim+'Failed to resolve global dir (experimental).', $.reset);
//}

// There is currently a *random* segfault related to the resolveSync functions, possibly caused by auto-installs.
//? ref: https://canary.discord.com/channels/876711213126520882/876711213126520885/1060209042015932477
// import.meta.resolveSync takes a *file* path for the parent.
// Bun.resolveSync takes a *directory* path for the parent.
// Other than the above, import.meta.resolveSync just calls Bun.resolveSync under the hood, so it doesn't matter much which one we use.
// The segfault happens with both, and as such there doesn't seem to be any workaround for this at the moment...
const { resolveSync } = import.meta; // Bun
const originalproxy = Proxy;
Object.defineProperties(globalThis, {
    /** Stores the last REPL result. */
    _: { value: undefined, writable: true },
    /** Stores the last REPL error thrown. */
    _error: { value: undefined, writable: true },
    Proxy: {
        value: Object.defineProperty(function Proxy(target, handler) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
            if (!new.target) return (Reflect.get(utl, 'Proxy'))(target, handler);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
            return new (Reflect.get(utl, 'Proxy'))(target, handler);
        }, 'revocable', { value: originalproxy.revocable }),
        writable: false, configurable: false, enumerable: false
    },
    /** Patch require so it works in a REPL context (use `process.cwd()` instead of `import.meta.dir` for resolution) */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Intellisense keeps conflicting with @types/node here even though its not included
    require: {
        value: function require(/** @type {string} */ moduleID) {
            if (REPLGlobal.ArrayIncludes(bunPrefixedModules, moduleID)) throw { name: 'ResolveError', message: `Built-in Bun module should have "bun:" prefix` };
            if (REPLGlobal.ArrayIncludes(nodePrefixedModules, moduleID)) moduleID = `node:${moduleID}`;
            if (moduleID === 'repl' || moduleID === 'node:repl') return repl; // polyfill
            if (moduleID === 'bun') return bun; // workaround
            const here = path.join(REPLGlobal.process.cwd(), /** @type {string} */(swcrc.filename));
            try {
                moduleID = resolveSync(moduleID, here);
            } catch {
                Bun.gc(true); // attempt to mitigate the resolveSync segfault, doesn't fully prevent it but seems to make it a little less frequent
                // TODO: attempt to load the module from the global directory if it's not found in the local directory
                throw {
                    name: 'ResolveError',
                    message: `Cannot find module "${moduleID}" from "${here}"`,
                    specifier: moduleID
                };
            }
            debuglog((`${$.dim}Importing: ${$.blueBright+moduleID+$.reset}`));
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return import.meta.require(moduleID);
        }, writable: false, configurable: false, enumerable: false
    }
});
Reflect.deleteProperty(globalThis, '__internalIsCommonJSNamespace');

// By managing our own secret "global" object hidden away in an obscure constructor
// instead of using globalThis, we avoid crashing if the user decides to destroy or
// tamper with globalThis in any way such as `globalThis = null` among other things
const REPLGlobalHolder = (async function*(){}).constructor;
Object.defineProperty(REPLGlobalHolder, '@@REPLGlobal', { value: {} });
/** @type {REPLGlobal} */
const REPLGlobal = Reflect.get(REPLGlobalHolder, '@@REPLGlobal');

Object.defineProperties(REPLGlobal, {
    /**
     * Formats a JS value into a REPL output and prints it.
     * @param {any} val The value to be formatted and printed.
     * @param {boolean=} isError Whether the value was thrown.
     */
    format: {
        value: function replFormat(/** @type {any} */ val, /** @type {boolean=} */ isError = false) {
            try {
                if (SafeGet(val, 'name') === 'ResolveError') return [
                    `${$.red}ResolveError${$.reset}${$.dim}: ${$.reset}${$.whiteBright}${REPLGlobal.StringReplace(
                        SafeGet(val, 'message') || `Failed to resolve import "?" from "?"`, / ".+" from ".+"$/,
                        ` ${$.blueBright}"${SafeGet(val, 'specifier') ?? '<unresolved>'}"${$.whiteBright} from ${$.cyan+REPLGlobal.process.cwd()}/${swcrc.filename}`
                    )}${$.reset}`, null
                ];

                try { if (val instanceof REPLGlobal.Error) return [
                    `${$.red}${SafeGet(val, 'name') ?? 'Error (anonymous)'}${$.reset+$.dim}: ${$.reset+$.whiteBright}` +
                    `${ REPLGlobal.StringReplace(
                        REPLGlobal.StringReplace(SafeGet(val, 'message')??'', /\(async function\*\(\) ?\{\}\)\.constructor\[["'`]@@REPLGlobal["'`]\]\.REPL/g, 'repl'),
                        /\(async function\*\(\) ?\{\}\)\.constructor\[["'`]@@REPLGlobal["'`]\]/g, 'REPLGlobal')}\n` +
                    `${$.reset+$.dim}      at ${$.reset+$.cyan}${path.join(REPLGlobal.process.cwd(), swcrc.filename ?? '(anonymous)')}${$.reset+$.dim}:` +
                    `${$.reset+$.yellow}${SafeGet(val, 'line') || 0}${$.reset+$.dim}:${$.yellow}${(SafeGet(val, 'column') || 1) - 1}${$.reset}`, null];
                } catch (err) {
                    if (REPLGlobal.StringSlice(SafeGet(err, 'message') ?? '', 0, 30) === 'Proxy has already been revoked') {
                        return REPLGlobal.format(err);
                    } else throw err; // should not happen
                }

                if (isError) return [`${$.red}Uncaught ${$.whiteBright}${SafeInspect(val, REPLGlobal.REPL.writer.options)}${$.reset}`, null];
                return [SafeInspect(val, REPLGlobal.REPL.writer.options, true), null];
            } catch (error) {
                return [null, /** @type Error */ (error)];
            }
        }
    },
    REPL: { value: repl },
    temp: { value: {} },
    eval: { value: globalThis.eval },
    global: { value: globalThis },
    Error: { value: Error },
    Symbol: { value: Symbol },
    console: { value: { ...console } },
    process: { value: { ...process } },
    StringSlice: { value: Primordial(String.prototype.slice) },
    StringReplace: { value: Primordial(String.prototype.replace) },
    ArrayIncludes: { value: Primordial(Array.prototype.includes) },
    ObjectToString: { value: Primordial(Object.prototype.toString) },
});
