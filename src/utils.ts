/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import bun from 'bun';
import $ from './colors';
import utl from './utl';
import util from 'util';

/**
 * Convert the input prototype method into a primordial function.
 *
 * This is not REPL-runtime safe, it should only be called during initial setup.
 */
export function Primordial<T, F extends (...x: any[]) => any>(fn: F): Primordial<T, F> {
    return Function.prototype.call.bind(fn);
}

/**
 * Safely get an object's property.
 * If an error occurs, just treat it as non-existent.
 */
export function SafeGet(obj: any, key: string | number | symbol): any {
    try {
        return obj?.[key];
    } catch {
        return; // undefined
    }
}

/**
 * Safely inspect a value, falling down through implementations as they fail.
 * If all inspectors fail, simply return undefined.
 * @param bunInspectReturnsValue Should all inspectors before `Bun.inspect` fail,
 * if this is set to true, `SafeInspect` will return the input value as is, and
 * expect the caller to know how to handle this scenario and pass the value
 * along to console.log or other custom fallback methods for the value.
 */
export function SafeInspect(val: any, opts: util.InspectOptions = {}, bunInspectReturnsValue: boolean = false): string {
    try {
        try {
            return utl.inspect(val, opts);
        } catch {
            //void 0; throw err;
            try {
                return util.inspect(val, opts);
            } catch {
                // Bun's native inspect is expected to never fail
                // Unfortunately it doesn't print colors nor inspect
                // certain values very accurately, nor does it support
                // the options object, therefore it's the last to run for now.
                return bunInspectReturnsValue ? val : bun.inspect(val);
            }
        }
    } catch {
        //void 0; throw err2;
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
