#!/usr/bin/env bun

import './extendglobals';
import $ from './colors';
import swc from '@swc/core';
import util from 'util';
import path from 'path';
import prettyms from 'pretty-ms';
import Transpiler from './transpiler';
import REPLState from './replstate';
import REPLHistory from './replhistory';
import pkgjson from './pkgjson';
import { debuglog, IS_DEBUG } from './debug';

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

interface PartialNPMResponse {
    'dist-tags': {
        latest: string
    }
}

if (process.argv.includes('--update')) {
    console.log('Checking for updates...');
    const res: PartialNPMResponse = await (await fetch("https://registry.npmjs.org/bun-repl", {
        headers: { Accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*' }
    })).json();
    const { latest } = res['dist-tags'];
    if (pkgjson.version === latest) {
        console.log(`No updates found. You are already on the latest version of bun-repl (${latest})`);
        process.exit(0);
    } else {
        console.log(`Updates found: ${pkgjson.version} -> ${latest}\nRun "bun add -g bun-repl" to update.`);
        process.exit(0);
    }
}

const realm = new ShadowRealm();
// Inject realm globals
await realm.execFile('./realm.mjs');

const replState = new REPLState();
const replHistory = new REPLHistory();
const transpiler = new Transpiler();

console.log(`Welcome to Bun.js ${process.version} (${process.revision ? 'canary-'+process.revision : 'release'})
Type ".help" for more information.`);
debuglog(`${$.dim}INFO: Debug mode enabled.${$.reset}`);

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
    debuglog($.dim+'preprocess:', transpiled.trim()+$.reset);
    try {
        transpiled = transpiler.transpile(transpiled);
    } catch (error) {
        const [message] = (<Error>error).message.trim().split('Caused by:\n');
        console.log(message.trim().split(/\u2570\u2500+/gm)[0].trim());
        continue;
    }
    debuglog($.dim+'transpile:', transpiled.trim()+$.reset);
    transpiled = transpiler.postAdjust(transpiled);
    debuglog($.dim+'postprocess:', transpiled.trim()+$.reset);

    try {
        const evalIn = util.inspect(transpiled);
        realm.evaluate(`//'use strict'; (Strict mode currently causes issues that need fixing)
        let $__SHADOWREALM_EVAL_RETURN_VALUE__ = [];
        try {
            $__SHADOWREALM_EVAL_RETURN_VALUE__[0] = (async function*() {}).constructor['@@REPLGlobal'].eval(${evalIn});
        } catch (error) {
            $__SHADOWREALM_EVAL_RETURN_VALUE__[0] = _error = error;
            $__SHADOWREALM_EVAL_RETURN_VALUE__[1] = true; // isError
        }
        if (!$__SHADOWREALM_EVAL_RETURN_VALUE__[1]) _ = $__SHADOWREALM_EVAL_RETURN_VALUE__[0];
        const REPLGlobal = (async function*(){}).constructor['@@REPLGlobal'];
        const [val, err] = REPLGlobal.format($__SHADOWREALM_EVAL_RETURN_VALUE__[0], $__SHADOWREALM_EVAL_RETURN_VALUE__[1]);
        if (err) {
            REPLGlobal.console.error('Fatal REPL Formatting Error:');
            REPLGlobal.console.error(err);
            REPLGlobal.console.error('This is most likely a bug, please report it at ${pkgjson.bugs?.url ?? 'the project\'s GitHub repository'}');
        } else REPLGlobal.console.log(val);
        `);
    } catch (error) {
        console.error('Fatal REPL Evaluation Error:');
        console.error(error);
        console.error(`This is most likely a bug, please report it at ${pkgjson.bugs?.url ?? 'the project\'s GitHub repository'}`);
    }
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
    --update       = Check for bun-repl updates.
    --debug        = Print debug information while running.

Environment variables:
    None`);
}

function printInfo(): void {
    console.log(`bun-repl v${pkgjson.version}
    Installed at: ${path.join(import.meta.dir, '..')}
    Bun version: ${process.version}
    SWC version: ${swc.version as string}
    Color mode: ${Bun.enableANSIColors}
    Debug mode: ${IS_DEBUG}
    Current session uptime: ${prettyms(performance.now())}`);
}
