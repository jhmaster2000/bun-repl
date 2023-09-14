#!/usr/bin/env bun
import $ from './colors';

const helpFlag = process.argv.includes('-h') || process.argv.includes('--help');
if (helpFlag) {
    printCLIHelp();
    process.exit(0);
}

let evalFlag = process.argv.indexOf('-e');
if (evalFlag === -1) evalFlag = process.argv.indexOf('--eval');
let printFlag = process.argv.indexOf('-p');
if (printFlag === -1) printFlag = process.argv.indexOf('--print');
if (evalFlag !== -1 && printFlag !== -1) {
    console.error(`bun repl: Incompatible options "${$.whiteBright}--eval${$.red}" and "${$.whiteBright}--print${$.red}"`);
    console.error(`For more information try ${$.whiteBright}--help${$.reset}`);
    process.exit(0);
}
const singleshot = evalFlag !== -1 || printFlag !== -1;
const singleshotCode = process.argv.slice((evalFlag !== -1 ? evalFlag : printFlag) + 1).join(' ');

const validFlags = [
    '-h', '--help', '-e', '--eval', '-p', '--print', '--debug', '--sloppy', '--no-history',
] as const;
if (process.argv.length > 2) {
    for (const arg of process.argv.slice(2)) {
        if (['-e', '--eval', '-p', '--print'].includes(arg)) break;
        if (validFlags.includes(arg as typeof validFlags[0])) continue;
        console.error(`bun repl: Unknown option "${$.whiteBright+arg+$.red}"`);
        console.error(`For more information try ${$.whiteBright}--help${$.reset}`);
        process.exit(0);
    }
}

const { default: repl } = await import('./repl');
await repl.start(singleshot ? singleshotCode : undefined, printFlag !== -1);

function printCLIHelp(): void {
    console.log(`Usage: bun repl [options]

Options:
    -h, --help               Display this message.
    -p, --print <...>        Evaluates given code, prints result and exits.
    -e, --eval <...>         Evaluates given code and silently exits.
    --sloppy                 Runs the REPL in sloppy mode.

* Options with <...> as argument must be passed last.

Environment variables:
    BUN_REPL_HISTORY_SIZE    The maximum number of lines to store in the history. (Default: 1000)
    BUN_REPL_PROMPT          A string to override the default REPL prompt with. (Default: "> ")
    BUN_REPL_PORT            The port for the REPL's local server to use. (Default: random free port)`);
}
