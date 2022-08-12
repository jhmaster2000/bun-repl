/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import bun from 'bun';
import _util from './util.js';
const util: typeof _util = typeof _util === 'function' ? (<VoidFunction>_util)() as typeof _util : _util;

namespace util {
    export type InspectOptions = _util.InspectOptions;
    export type InspectOptionsStylized = _util.InspectOptionsStylized;
    export type CustomInspectFunction = _util.CustomInspectFunction;
    export type Style = _util.Style;
}
export type InspectOptions = util.InspectOptions;
export type InspectOptionsStylized = util.InspectOptionsStylized;
export type CustomInspectFunction = util.CustomInspectFunction;
export type Style = util.Style;

export const inspect = util['inspect'] as typeof util.inspect & { replDefaults: util.InspectOptions };
export const format = util['format'];
export const formatWithOptions = util['formatWithOptions'];
export const stripVTControlCharacters = util['stripVTControlCharacters'];
export const inspectDefaultOptions: util.InspectOptions = Reflect.get(util, 'inspectDefaultOptions');
export const stylizeWithColor: (str: string, styleType: string) => string = Reflect.get(util, 'stylizeWithColor');
export const stylizeWithHTML: (str: string, styleType: string) => string = Reflect.get(util, 'stylizeWithHTML');
export const getStringWidth: (str: string) => number = Reflect.get(util, 'getStringWidth');
//export const Proxy: ProxyConstructor = Reflect.get(util, 'Proxy');

Object.defineProperty(inspect, 'replDefaults', {
    value: {
        showHidden: false,
        depth: 2,
        colors: bun.enableANSIColors,
        customInspect: true,
        showProxy: true,
        maxArrayLength: 100,
        maxStringLength: 10000,
        breakLength: 80,
        compact: 3,
        sorted: false,
        getters: false,
        numericSeparator: false
    },
    enumerable: true
});

export default util;
