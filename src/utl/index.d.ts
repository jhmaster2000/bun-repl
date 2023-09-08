/**
@license
Extracted from https://github.com/DefinitelyTyped/DefinitelyTyped

This project is licensed under the MIT license.
Copyrights are respective of each contributor listed at the beginning of each definition file.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/**
 * The `util` module supports the needs of Node.js internal APIs. Many of the
 * utilities are useful for application and module developers as well.
 * @see [source](https://github.com/nodejs/node/blob/v17.6.0/lib/util.js)
 */

export interface InspectOptions {
    /**If set to `true`, getters are going to be inspected as well.
     * If set to `'get'` only getters without setter are going to be inspected.
     * If set to `'set'` only getters having a corresponding setter are going to be inspected.
     * This might cause side effects depending on the getter function.
     * @default false */
    getters?: "get" | "set" | boolean | undefined;
    showHidden?: boolean | undefined;
    /** @default 2 */
    depth?: number | null | undefined;
    colors?: boolean | undefined;
    customInspect?: boolean | undefined;
    showProxy?: boolean | undefined;
    maxArrayLength?: number | null | undefined;
    /**Specifies the maximum number of characters to include when formatting.
     * Set to `null` or `Infinity` to show all elements.
     * Set to `0` or negative to show no characters.
     * @default 10000 */
    maxStringLength?: number | null | undefined;
    breakLength?: number | undefined;
    /**Setting this to `false` causes each object key to be displayed on a new line.
     * It will also add new lines to text that is longer than `breakLength`.
     * If set to a number, the most `n` inner elements are united on a single line as long as all properties fit into `breakLength`.
     * Short array elements are also grouped together. Note that no text will be reduced below 16 characters, no matter the `breakLength` size.
     * @default 3 */
    compact?: boolean | number | undefined;
    sorted?: boolean | ((a: string, b: string) => number) | undefined;
    numericSeparator?: boolean | undefined;
}
export type Style = "special" | "number" | "bigint" | "boolean" | "undefined" | "null" | "string" | "symbol" | "date" | "regexp" | "module";
export type CustomInspectFunction = (depth: number, options: InspectOptionsStylized) => string;
export interface InspectOptionsStylized extends InspectOptions {
    /** Write your own function for adding color to the output, or use one of the built-in stylize* functions. */
    stylize(text: string, styleType: Style): string;
}
/**The `util.format()` method returns a formatted string using the first argument
 * as a `printf`\-like format string which can contain zero or more format specifiers.
 * Each specifier is replaced with the converted value from the corresponding argument.
 *
 * `util.format()` is a synchronous method that is intended as a debugging tool. Some input values can have a
 * significant performance overhead that can block the event loop. Use this function with care and never in a hot code path.
 * @since v0.5.3
 * @param format A `printf`-like format string. */
export function format(format?: any, ...param: any[]): string;
/**
 * This function is identical to {@link format}, except in that it takes
 * an `inspectOptions` argument which specifies options that are passed along to {@link inspect}.
 * ```js
 * util.formatWithOptions({ colors: true }, 'See object %O', { foo: 42 });
 * // Returns 'See object { foo: 42 }', where `42` is colored as a number
 * // when printed to a terminal.
 * ```
 * @since v10.0.0*/
export function formatWithOptions(inspectOptions: InspectOptions, format?: any, ...param: any[]): string;
/**The `util.inspect()` method returns a string representation of `object` that is intended for debugging.
 * The output of `util.inspect` may change at any time and should not be depended upon programmatically.
 * Additional `options` may be passed that alter the result.
 *
 * `util.inspect()` is a synchronous method intended for debugging. Its maximum output length is approximately 128 MB.
 * Inputs that result in longer output will be truncated.
 * @since v0.3.0
 * @param object Any JavaScript primitive or `Object`.
 * @return The representation of `object`. */
export function inspect(object: any, showHidden?: boolean, depth?: number | null, color?: boolean): string;
export function inspect(object: any, options?: InspectOptions): string;
export namespace inspect {
    let colors: { [key: number]: number; };
    let styles: { [K in Style]: string; };
    let defaultOptions: InspectOptions;
    /** Allows changing inspect settings from the repl. */
    let replDefaults: InspectOptions;
    /** That can be used to declare custom inspect functions. */
    const custom: unique symbol;
}
/**Returns `str` with any ANSI escape codes removed.
 * ```js
 * console.log(util.stripVTControlCharacters('\u001B[4mvalue\u001B[0m'));
 * // Prints "value"
 * ```
 * @since v16.11.0 */
export function stripVTControlCharacters(str: string): string;
/**Colorize `text` with ANSI escapes according to the styleType. Mostly used in inspect() options.
 * ```typescript
 * inspect({ a: 'b' }, { stylize: stylizeWithColor });
 * ``` */
export function stylizeWithColor(text: string, styleType: Style): string;
/**Colorize `text` using HTML span tags and style. Mostly used in inspect() options.
 * ```typescript
 * inspect({ a: 'b' }, { stylize: stylizeWithHTML });
 * ``` */
export function stylizeWithHTML(text: string, styleType: Style): string;

export const $Proxy: ProxyConstructor; //! modified
