/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

// This file is executed once at the start of the REPL within its ShadowRealm.
// Primarily used to inject values into the REPL's ShadowRealm global object.

import util from 'util';
import path from 'path';
import swcrc from './swcrc';

/** 
 * @typedef BunError
 * @property {string} name
 * @property {number} line
 * @property {number} column
 * @property {string} message
*/

Object.defineProperties(globalThis, {
    /**
     * Formats a JS value into a REPL output string.
     * @param {any} val The value to be formatted.
     */
    '@@replFmt': {
        value: function replFmt(/** @type {any} */ val) {
            try {
                if (val?.name === 'ResolveError') return console.error(val?.toString?.()?.slice?.(0, -16) ?? val.name);
                if (val instanceof Error) return console.error(
                    `${val.name}: ${val.message}\n      ` +
                    `at ${path.join(process.cwd(), swcrc.filename??'?')}:${(/** @type {BunError} */(val)).line}:${/** @type {BunError} */(val).column - 4}`
                );
                if (typeof val === 'string')
                    return console.log(util.inspect(val, { colors: true }));
                console.dir(val);
            } catch (error) {
                console.error('REPL Format Error:', error);
            }
        }
    },
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
