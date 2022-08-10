/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import util from 'util';

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
 * Safely call an object's method.
 * If an error occurs, just treat it as non-existent.
 */
export function SafeCall<F extends (...x: any[]) => any>(fn: F, thisArg: any, ...args: Parameters<F>): ReturnType<F> | undefined {
    try {
        return fn?.apply?.(thisArg, args);
    } catch {
        return; // undefined
    }
}

/**
 * Safely call util.inspect.
 * If an error occurs, simply return undefined.
 */
export function SafeInspect(val: any, opts?: util.InspectOptions): string | undefined {
    try {
        return util.inspect(val, opts);
    } catch {
        return;
    }
}
