/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

// This file is executed once at the start of the REPL within its ShadowRealm.
// Primarily used to inject values into the REPL's ShadowRealm global objects.
// Keep in mind functions within this file will also be executed inside the ShadowRealm,
// therefore all globals used must be backed up to REPLGlobal or the user can crash the REPL.

import './extendglobals';
import $ from './colors';
import path from 'path';
import swcrc from './swcrc';
import { debuglog } from './debug';
import { SafeGet, SafeCall, SafeInspect } from './utils';
import REPL, { bunPrefixedModules, nodePrefixedModules } from './module/repl';

/** Patch require so it works in a REPL context (use CWD instead of import.meta.dir for resolution) */
globalThis.require = (/** @type {string} */ moduleID) => {
    if (bunPrefixedModules.includes(moduleID)) throw { name: 'ResolveError', toString() { return `ResolveError: Builtin Bun module requires "bun:" prefix`; } };
    if (nodePrefixedModules.includes(moduleID)) moduleID = `node:${moduleID}`;
    if (moduleID[0] === '.' || moduleID[0] === '/') {
        moduleID = path.resolve(process.cwd(), moduleID);
    }
    debuglog((`${$.dim}Importing: ${$.blueBright+moduleID+$.reset}`));
    return import.meta.require(moduleID);
};

Object.defineProperties(globalThis, {
    /** Stores the last REPL result. */
    _: {
        value: undefined,
        writable: true
    },
    /** Stores the last REPL error thrown. */
    _error: {
        value: undefined,
        writable: true
    }
});

// By managing our own secret "global" object hidden away in an obscure constructor
// instead of using globalThis, we avoid crashing if the user decides to destroy or
// tamper with globalThis in any way such as `globalThis = null` among other things
const REPLGlobalHolder = (async function*() {}).constructor;
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
                if (SafeGet(val, 'name') === 'ResolveError') 
                    return [`${$.red}ResolveError${$.reset}${$.dim}: ${$.reset}${$.whiteBright}${SafeCall(
                        REPLGlobal.StringReplace, SafeGet(val, 'message'), / ".+" from ".+"$/,
                        ` ${$.blueBright}"${SafeGet(val, 'specifier') ?? '<unresolved>'}"${$.whiteBright} from ${$.cyan+process.cwd()}/${swcrc.filename}`
                    ) ?? SafeGet(val, 'message') ?? val+''}${$.reset}`, null];
                if (val instanceof REPLGlobal.Error) return [$.red + (
                    `${$.red}${SafeGet(val, 'name') ?? 'Error (anonymous)'}${$.reset+$.dim}: ${$.reset+$.whiteBright}` +
                    `${SafeGet(val, 'message') ?? ''}\n${$.reset+$.dim}      at ${$.reset+$.cyan}` +
                    `${path.join(REPLGlobal.process.cwd(), swcrc.filename ?? '(anonymous)')}${$.reset+$.dim}:${$.reset+$.yellow}` +
                    `${SafeGet(val, 'line') || 0}${$.reset+$.dim}:${$.yellow}${(SafeGet(val, 'column') || 1) - 1}`
                ) + $.reset, null];
                if (isError) return [`${$.red}Uncaught ${$.whiteBright}${REPLGlobal.Bun.inspect(val)}${$.reset}`, null];
                if (typeof val === 'string') return [`${$.green}'${ SafeCall(REPLGlobal.StringReplace, val, /'/g, "\\'")}'${$.reset}`, null];
                if (typeof val === 'function' && SafeCall(REPLGlobal.StringSlice, val+'', 0, 5) === 'class') {
                    const inspected = SafeInspect(val, REPLGlobal.REPL.writer.options) ?? REPLGlobal.Bun.inspect(val);
                    return [SafeCall(REPLGlobal.StringReplace, inspected, '[Function: ', '[class ') ?? inspected, null];
                }
                if (
                    typeof val === 'object' && SafeCall(REPLGlobal.ObjectToString, val) === '[object Object]' ||
                    SafeGet(val, REPLGlobal.Symbol.toStringTag) === 'Module'
                ) return [SafeInspect(val, REPLGlobal.REPL.writer.options) ?? val, null];
                return [val, null]; // Delegate formatting to console.log since Bun.inspect won't output colors
            } catch (error) {
                return [null, /** @type Error */ (error)];
            }
        }
    },
    REPL: { value: REPL },
    Bun: { value: Bun },
    temp: { value: {} },
    eval: { value: globalThis.eval },
    global: { value: globalThis },
    Error: { value: Error },
    Symbol: { value: Symbol },
    console: { value: { ...console } },
    process: { value: { ...process } },
    StringSlice: { value: String.prototype.slice },
    StringReplace: { value: String.prototype.replace },
    ObjectToString: { value: Object.prototype.toString },
});

/**
 * @typedef REPLGlobal
 * @property {typeof REPL} REPL
 * @property {typeof Bun} Bun
 * @property {typeof globalThis} global
 * @property {typeof eval} eval
 * @property {Record<any, any>} temp
 * @property {Process} process
 * @property {(v: any, isError?: boolean) => [string, null] | [null, Error]} format
 * @property {typeof console} console
 * @property {ErrorConstructor} Error
 * @property {SymbolConstructor} Symbol
 * @property {typeof String.prototype.slice} StringSlice
 * @property {(find: string | RegExp, value: string) => string} StringReplace
 * @property {typeof Object.prototype.toString} ObjectToString
*/
