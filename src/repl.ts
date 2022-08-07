#!/usr/bin/env bun

import swc from '@swc/core';
import util from 'util';
import path from 'path';
import prettyms from 'pretty-ms';
import Transpiler from './transpiler';
import REPLState from './replstate';
import REPLHistory from './replhistory';
import './extendglobals';

const pkgjson = await Bun.file(path.join(import.meta.dir, '..', 'package.json')).json() as PackageJson;

const helpFlag = process.argv.includes('-h') || process.argv.includes('--help');
if (helpFlag) {
    printCLIHelp();
    process.exit(0);
}

const versionFlag = process.argv.includes('-v') || process.argv.includes('--version');
if (versionFlag) {
    console.log(`bun-repl ${pkgjson.version}`);
    process.exit(0);
}

const IS_DEBUG = process.argv.includes('--debug');
const debuglog = IS_DEBUG ? console.debug : () => void 0;

const realm = new ShadowRealm();
// Inject realm globals
await realm.execFile('./realm.mjs');

const replState = new REPLState();
const replHistory = new REPLHistory();
const transpiler = new Transpiler();

console.log(`Welcome to Bun.js ${process.version} (${process.revision ? 'canary-'+process.revision : 'release'})
Type ".help" for more information.`);

MainLoop: for (;;) {

    let userInput = prompt(`>${replState.historyEntry ? ' ' + replState.historyEntry : ''}`)?.trim();

    userInput ??= replState.historyEntry ? '' : 'undefined';
    if (replState.historyEntry) userInput = replState.historyEntry + userInput;

    if (userInput.startsWith('.')) {
        const command = userInput.slice(1).split(/[ \t]+/)[0];
        switch (command) {
            case 'exit': process.exit(0); break;
            case 'help': printHelp(); continue MainLoop;
            case 'info': printInfo(); continue MainLoop;
            case 'clear': console.clear(); continue MainLoop;
            default:
                console.error(`Unknown REPL command ".${command}", type ".help" for more information.`);
                continue MainLoop;
        }
    }

    if (userInput.endsWith('\u001B[A')) { replState.historyEntry = replHistory.consume(); continue; }
    if (userInput.endsWith('\u001B[B')) { replState.historyEntry = replHistory.unconsume(); continue; }

    replState.historyEntry = '';
    replHistory.add(userInput);
    replHistory.resetPos();

    let transpiled: string = transpiler.preAdjust(userInput);
    debuglog('preAdjust:', transpiled.trim());
    try {
        transpiled = transpiler.transpile(transpiled);
    } catch (error) {
        const [message] = (<Error>error).message.trim().split('Caused by:\n');
        console.log(message.trim().split(/\u2570\u2500+/gm)[0].trim());
        continue;
    }
    debuglog('transpile:', transpiled.trim());
    transpiled = transpiler.postAdjust(transpiled);
    debuglog('postAdjust:', transpiled.trim());
    const evalIn = util.inspect(transpiled);
    realm.evaluate(`
    let $__SHADOWREALM_EVAL_RETURN_VALUE__;
    try {
        $__SHADOWREALM_EVAL_RETURN_VALUE__ = eval(${evalIn});
    } catch (error) {
        $__SHADOWREALM_EVAL_RETURN_VALUE__ = _error = error;
    }
    if ($__SHADOWREALM_EVAL_RETURN_VALUE__ !== _error) _ = $__SHADOWREALM_EVAL_RETURN_VALUE__;
    globalThis['@@replFmt']($__SHADOWREALM_EVAL_RETURN_VALUE__);`);
}

function printHelp(): void {
    console.log(`Commands:
    .help  = Print this message.
    .info  = Print REPL information.
    .clear = Clear the screen.
    .exit  = Exit the REPL.

    Press Ctrl+C or Ctrl+Z to forcefully terminate the REPL.`);
}

function printCLIHelp(): void {
    console.log(`Usage: bun-repl [options]

Options:
    -h, --help     = Display this message.
    -v, --version  = Show installed bun-repl version.
    --debug        = Print debug information while running.

Environment variables:
    None`);
}

function printInfo(): void {
    console.log(`bun-repl v${pkgjson.version}
    Installed at: ${path.join(import.meta.dir, '..')}
    SWC version: ${swc.version as string}
    Color mode: ${Bun.enableANSIColors}
    Debug mode: ${IS_DEBUG}
    Current session uptime: ${prettyms(performance.now())}`);
}
