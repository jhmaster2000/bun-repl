#!/usr/bin/env bun

import './extendglobals';
import $ from './colors';
import swc from '@swc/core';
import util from 'util';
import path from 'path';
import prettyms from 'pretty-ms';
import Transpiler from './transpiler';
import REPLManager from './replmanager';
import pkgjson from './pkgjson';
import { debuglog, IS_DEBUG } from './debug';

debuglog(process.argv);

// Futureproofing against addition or removal of the v prefix in the provided version
const BUN_VERSION = Bun.version[0] === 'v' ? Bun.version : 'v' + Bun.version;

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

if (process.argv.includes('--update')) {
    console.log(`${$.dim}Checking for updates...${$.reset}`);
    const res: PartialNPMResponse = await (await fetch('https://registry.npmjs.org/bun-repl', {
        headers: { Accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*' }
    })).json();
    const { latest } = res['dist-tags'];
    if (pkgjson.version === latest) {
        console.log(`${$.gray}No updates found. You are already on the latest version of bun-repl (${$.greenBright+latest+$.gray})${$.reset}`);
        process.exit(0);
    } else {
        console.log(`${$.whiteBright}Updates found: ${$.yellow+$.bold+pkgjson.version+$.whiteBright} -> ${$.greenBright+latest+$.reset}
${$.whiteBright}Run "${$.cyanBright}bun add -g bun-repl${$.whiteBright}" to update.${$.reset}`);
        process.exit(0);
    }
}

let evalFlag = process.argv.indexOf('-e');
if (evalFlag === -1) evalFlag = process.argv.indexOf('--eval');
let printFlag = process.argv.indexOf('-p');
if (printFlag === -1) printFlag = process.argv.indexOf('--print');
if (evalFlag !== -1 && printFlag !== -1) {
    console.error(`bun-repl: Incompatible options "${$.whiteBright}--eval${$.red}" and "${$.whiteBright}--print${$.red}"`);
    console.error(`For more information try ${$.whiteBright}--help${$.reset}`);
    process.exit(0);
}
const singleshot = evalFlag !== -1 || printFlag !== -1;
const singleshotCode = process.argv.slice((evalFlag !== -1 ? evalFlag : printFlag) + 1).join(' ');

const validFlags = [
    '-h', '--help', '-v', '--version', '--update', '--debug', '-e', '--eval', '-p', '--print'
] as const;
if (process.argv.length > 2) {
    for (const arg of process.argv.slice(2)) {
        if (['-e', '--eval', '-p', '--print'].includes(arg)) break;
        if (validFlags.includes(arg as typeof validFlags[0])) continue;
        console.error(`bun-repl: Unknown option "${$.whiteBright+arg+$.red}"`);
        console.error(`For more information try ${$.whiteBright}--help${$.reset}`);
        process.exit(0);
    }
}

const realm = new ShadowRealm();
const repl = new REPLManager();
const transpiler = new Transpiler();

// Prepare realm environment
await realm.execFile('./realm.mjs');

if (!singleshot) {
    console.log(
        `Welcome to Bun.js ${BUN_VERSION}\n` +
        `Type ".help" for more information.`
    );
    debuglog(`${$.dim}INFO: Debug mode enabled.${$.reset}`);
}

MainLoop: do {
    const userInput = singleshot ? singleshotCode : repl.promptline();
    if (!userInput) {
        if (singleshot) {
            console.error(`bun-repl: Option "${$.whiteBright+(evalFlag !== -1 ? '--eval' : '--print')+$.red}" requires a value.`);
            console.error(`For more information try ${$.whiteBright}--help${$.reset}`);
            process.exit(0);
        } else continue;
    }
    if (userInput === 'undefined') {
        console.log($.gray+userInput+$.reset);
        continue;
    }

    if (userInput.startsWith('.') && !singleshot) {
        const command = userInput.slice(1).split(/[ \t]+/)[0];
        switch (command) {
            case 'exit': process.exit(0); break;
            case 'help': printHelp(); continue MainLoop;
            case 'info': printInfo(); continue MainLoop;
            case 'clear': console.clear(); continue MainLoop;
            default:
                console.error(`Unknown REPL command "${$.whiteBright}.${command}${$.red}", type "${$.whiteBright}.help${$.red}" for more information.`);
                continue MainLoop;
        }
    }

    let transpiled: string = transpiler.preprocess(userInput);
    debuglog($.dim+'preprocess:', transpiled.trim()+$.reset);
    try {
        transpiled = transpiler.transpile(transpiled);
    } catch (error) {
        const [message] = (<Error>error).message.trim().split('Caused by:\n');
        console.log(message.trim().split(/\u2570\u2500+/gm)[0].trim());
        continue;
    }
    debuglog($.dim+'transpile:', transpiled.trim()+$.reset);
    transpiled = transpiler.postprocess(transpiled);
    debuglog($.dim+'postprocess:', transpiled.trim()+$.reset);

    try {
        const evalIn = util.inspect(transpiled); // Inspect for appropriate string quotes selection
        realm.evaluate(`//'use strict'; (Strict mode currently causes issues that need fixing)
        let $__SHADOWREALM_EVAL_RETURN_VALUE__ = [];
        try {
            $__SHADOWREALM_EVAL_RETURN_VALUE__[0] = (async function*(){}).constructor['@@REPLGlobal'].eval(${evalIn});
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
        } else if (${!singleshot || printFlag !== -1}) REPLGlobal.console.log(val);
        `);
    } catch (error) {
        console.error('Fatal REPL Evaluation Error:');
        console.error(error);
        console.error(`This is most likely a bug, please report it at ${pkgjson.bugs?.url ?? 'the project\'s GitHub repository'}`);
    }
} while (!singleshot);

function printCLIHelp(): void {
    console.log(`Usage: bun-repl [options]

Options:
    -h, --help               Display this message.
    -v, --version            Show installed bun-repl version.
    -p, --print <...>        Evaluates given code, prints result and exits.
    -e, --eval <...>         Evaluates given code and silently exits.
    --update                 Check for bun-repl updates.
    --debug                  Print debug information while running.

* Options with <...> as argument must be passed last.

Environment variables:
    BUN_REPL_HISTORY_SIZE    The maximum number of lines to store in the history. (Default: 1000)
    BUN_REPL_PROMPT          A string to override the default REPL prompt with. (Default: "> ")
    BUN_REPL_MODE            Either "sloppy" or "strict". (Default: "strict") [Not Implemented]`);
}

function printHelp(): void {
    console.log(`Commands & keybinds:
    .help     Print this message.
    .info     Print REPL information.
    .clear    Clear the screen. ${$.gray}(Ctrl+L)${$.reset}
    .exit     Exit the REPL. ${$.gray}(Ctrl+C / Ctrl+D)${$.reset}`);
}

function printInfo(): void {
    console.log(`bun-repl v${pkgjson.version}
    Installed at: ${$.cyan+path.join(import.meta.dir, '..')+$.reset}
    Bun version: ${BUN_VERSION} ${$.dim}(${process.revision})${$.reset}
    SWC version: v${swc.version as string}
    Color mode: ${$.bool(Bun.enableANSIColors)}
    Debug mode: ${$.bool(IS_DEBUG)}
    Current session uptime: ${$.yellow+prettyms(performance.now())+$.reset}`);
}

process.exit(0); // Prevents a segfault when exiting
