# bun-repl
Experimental unofficial REPL for Bun

Powered by Bun itself with the help of `swc` and JSC's `ShadowRealm` API

## Install
```
bun add -g bun-repl
```

## Usage
```
bun repl
```
Type `.help` within the REPL for a list of commands.

## Features

* Seamless JavaScript & TypeScript execution
* Top level import syntax supported (`import fs from 'fs'`)
* Import either CommonJS or ESM into the REPL
* Node.js REPL special underscore variables provided (`_` and `_error`)
* Execution history (Arrow up/down)

## Known issues/limitations
Please keep in mind this is unofficial and experimental software built on top of experimental software, there **ARE** bugs. Additionally, Bun will obviously be getting an official native REPL in the future which certainly will be much better, this module is merely serving as a temporary alternative until then.

* Top level await is not supported.
    * Reason: Usage of `eval()`
* The execution history (Arrow up/down) is buggy to navigate and doesn't support backspacing past the history entry.
    * Reason: Bun's current lack of support for event-based streams limits us to `prompt()`, which provides little to no control over the input as its being written. This also makes it impossible to intercept keypresses/combinations.
* There is a space between the execution history entry and your appended code.
    * Reason: `prompt()` automatically inserts a space at the end, with no way to turn it off. Yes, quite annoying.
* To preserve lexically-scoped variables (`let` & `const`) across REPL runs, they need to be converted to `var`, which disrupts their behavior, especially `const`'s
    * Reason: Usage of `eval()` which has its own lexical scope.
* Some modules fail to resolve their imports within the REPL, such as `fs/promises`.
    * Reason: Unknown...
