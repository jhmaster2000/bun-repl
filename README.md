# bun-repl [![GitHub version][github-image]][github-url] [![GitHub code size in bytes][size-image]][github-url] [![license][license-image]][license-url]

Experimental unofficial REPL for [Bun](https://github.com/oven-sh/bun)

Powered by Bun itself with the help of `swc` and JSC's `ShadowRealm` API

## Install
```
bun add -g bun-repl
```
> ⚠️ Due to workarounds for Bun-specific issues, installation on other package managers like `npm` or `yarn` will not work.

## Usage
```sh
bun run repl -- [options]
# or
bun-repl [options]
```
Pass the `-h` or `--help` CLI option for a list of all options.

Type `.help` within the REPL for a list of commands.

Press `↑`+`Enter` to travel up the execution history.

Press `↓`+`Enter` to travel back down.

## Features

* Seamless JavaScript & TypeScript execution
* Top level import syntax supported (`import fs from 'fs'`)
* Import either CommonJS or ESM local files and packages into the REPL
* Node.js REPL special underscore variables provided (`_` and `_error`)
* Execution history (`↑` `↓`)
* REPL Commands (`.command`)

## Known issues & limitations
Please keep in mind this is unofficial and experimental software built on top of experimental software, there **ARE** bugs. Additionally, Bun will obviously be getting an official native REPL in the future which certainly will be much better, this module is merely serving as a temporary alternative until then.

PRs are welcome to help fix any of the items below or anything else.

* Top level await is not supported.
    * Reason: Usage of `eval()`
* Multi-line inputs are not supported.
    * Reason: Same as below.
* Pressing `←` and `→` to traverse the input with the cursor is not supported.
    * Reason: Same as below.
* The execution history is buggy to navigate and doesn't support backspacing past the history entry.
    * Reason: Bun's current lack of support for event-based streams limits us to `prompt()`, which provides little to no control over the input as its being written. This also makes it impossible to intercept keypresses/combinations.
* There is a space between the execution history entry and your appended code.
    * Reason: `prompt()` automatically inserts a space at the end, with no way to turn it off. Yes, quite annoying.
* To preserve lexically-scoped variables (`let` & `const`) across REPL runs, they need to be converted to `var`, which disrupts their behavior, especially `const`'s
    * Reason: Usage of `eval()` which has its own lexical scope.
* Some modules fail to resolve their imports within the REPL, such as `fs/promises`.
    * Reason: Unknown...

[github-url]:https://github.com/jhmaster2000/bun-repl
[github-image]:https://img.shields.io/github/package-json/v/jhmaster2000/bun-repl.svg?color=gray
[license-url]:https://github.com/jhmaster2000/bun-repl/blob/master/LICENSE.md
[license-image]:https://img.shields.io/npm/l/bun-repl.svg
[size-image]:https://img.shields.io/github/languages/code-size/jhmaster2000/bun-repl.svg
