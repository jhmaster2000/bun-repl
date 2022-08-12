# bun-repl [![GitHub version][github-image]][github-url] [![GitHub code size in bytes][size-image]][github-url] [![license][license-image]][license-url]

Experimental unofficial REPL for [Bun](https://github.com/oven-sh/bun)

Powered by Bun itself with the help of `swc` and JSC's `ShadowRealm` API

## Install
```
bun add -g bun-repl
```
> ⚠️ Due to workarounds for Bun-specific issues, installation on other package managers like `npm` or `yarn` will not work.

## Features

* Seamless JavaScript & TypeScript execution
* Single run CLI flags `--eval` and `--print`
* Top level import syntax supported (`import fs from 'fs'`)
* Import either CommonJS or ESM local files and packages into the REPL
* Node.js REPL special underscore variables provided (`_` and `_error`)
* Resistent to global object modification (output quality may decrease but never crash)
* Node.js `repl` module polyfill
* Execution history (`↑` `↓`)
* REPL Commands (`.command`)

## Usage
```sh
bun-repl [options]
```
Pass the `-h` or `--help` CLI option for a list of all options.

Type `.help` within the REPL for a list of commands.

Press `↑` and `↓` to travel up or down the execution history.

### The `repl` module polyfill
`bun-repl` exposes a special variable `repl` which provides access to a REPL interface like the Node.js REPL (also accessible through import/require of `repl` or `node:repl`).

Currently only a subset of the `node:repl` API is implemented, see below:
* `repl` global object ✅
    * `start()` function ❌
    * `writer()` function ✅
        * `options` object ✅
    * `repl` property ❌
    * `builtinModules` array ✅
    * `REPL_MODE_SLOPPY` symbol ✅
    * `REPL_MODE_STRICT` symbol ✅
    * `REPLServer` class ❌
    * `Recoverable` class ❌

You can use `repl.writer.options` like you would in Node.js REPL to customize the live output of the running REPL.

## Known issues & limitations
Please keep in mind this is unofficial and experimental software built on top of experimental software (Bun). Additionally, Bun will obviously be getting an official native REPL in the future which certainly will be much better, this module is merely serving as a temporary alternative until then.

PRs are welcome to help fix any of the items below or anything else.

* Top level await is not supported.
    * Reason: Usage of `eval()`
* Multi-line inputs are not supported.
    * Reason: The library used for prompts (`rustybun`) doesn't support this.
* To preserve lexically-scoped variables (`let` & `const`) across REPL runs, they need to be converted to `var`, which disrupts their behavior, especially `const`'s (This also requires using non-strict mode)
    * Reason: Usage of `eval()` which has its own lexical scope.

[github-url]:https://github.com/jhmaster2000/bun-repl
[github-image]:https://img.shields.io/github/package-json/v/jhmaster2000/bun-repl.svg?color=gray
[license-url]:https://github.com/jhmaster2000/bun-repl/blob/master/LICENSE.md
[license-image]:https://img.shields.io/npm/l/bun-repl.svg
[size-image]:https://img.shields.io/github/languages/code-size/jhmaster2000/bun-repl.svg
