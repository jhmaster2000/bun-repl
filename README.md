# Bun REPL [![GitHub version][github-image]][github-url] [![GitHub code size in bytes][size-image]][github-url] [![license][license-image]][license-url]

Experimental REPL for [Bun](https://github.com/oven-sh/bun)

> **NOTICE:** This package is planned to be embedded directly into Bun sometime soon,
> this must be taken into consideration if making contributions to the package.

## Install
You can use it directly via Bun with:
```sh
bun repl
```
No installation required!

### Versioning
[npm](https://www.npmjs.com/package/bun-repl) and [GitHub](https://github.com/jhmaster2000/bun-repl/releases) releases will always be guaranteed to not rely on current Bun canary versions, but support for any version other than the latest non-canary will not be guaranteed.

The source code repository latest commit may contain code not yet in any release which depends on currently Bun canary-only features and has no guarantees.

## Features

* Seamless JavaScript & TypeScript execution
* Single run CLI flags `--eval` and `--print`
* Multi-line input (`.multiline`)
* Top level import syntax supported (`import fs from 'fs'`)
* Top level await (experimental)
* Lazy-loaded builtin modules as preloaded global variables. (including Bun modules! Try `ffi` or `sqlite`)
* Import either CommonJS or ESM local files and packages into the REPL
* Node.js REPL special underscore variables provided (`_` and `_error`)
* Resistent to global object modification (output quality may decrease but never crash)
* Persistent execution history (`↑` `↓`)
* REPL Commands (`.command`)

## Usage
```sh
bun repl [options]
```
Pass the `-h` or `--help` CLI option for a list of all options.

Type `.help` within the REPL for a list of commands.

Press `↑` and `↓` to travel up or down the execution history.

`bun repl` exposes the special variable `repl` which provides access to a REPL interface like the Node.js REPL (also accessible through import/require of `repl` or `node:repl`).

You can use `repl.writer.options` like you would in Node.js REPL to customize the live output of the running REPL.

[github-url]:https://github.com/jhmaster2000/bun-repl
[github-image]:https://img.shields.io/github/package-json/v/jhmaster2000/bun-repl.svg?color=gray
[license-url]:https://github.com/jhmaster2000/bun-repl/blob/master/LICENSE.md
[license-image]:https://img.shields.io/npm/l/bun-repl.svg
[size-image]:https://img.shields.io/github/languages/code-size/jhmaster2000/bun-repl.svg
