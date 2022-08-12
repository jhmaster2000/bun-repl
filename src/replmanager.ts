import $ from './colors';
import fs from 'fs';
import os from 'os';
import readline from 'rustybun';

export default class REPLManager extends readline {
    constructor(prompt: string = '> ', historyPath?: string) {
        super();
        this.prompt = process.env.BUN_REPL_PROMPT ?? prompt;
        historyPath ||= `${process.env.BUN_INSTALL ?? os.homedir()}/.bun_repl_history`;

        const historyLines = fs.readFileSync(historyPath, 'utf8').split('\n');
        const maxHistoryLines = Number(process.env.BUN_REPL_HISTORY_SIZE ?? 1000) || 1000;
        if (historyLines.length > maxHistoryLines) {
            fs.writeFileSync(historyPath, historyLines.slice(historyLines.length - maxHistoryLines).join('\n'));
        }

        this.loadHistory(historyPath);
        this.#historyfd = fs.openSync(historyPath, 'a+');
        this.#historypath = historyPath;
    }

    promptline(): string {
        const input = this.readline(this.prompt);
        if (input.signal) switch (input.signal) {
            case 'CtrlC':
            case 'CtrlD':
                this.exit(); break;
            default:
                console.log(`${$.yellow+$.dim}Unknown signal: ${input.signal+$.reset}`);
                return '';
        }
        input.value = (input.value ?? '').trim();
        if (input.value) {
            fs.appendFileSync(this.#historyfd, `${input.value}\n`, 'utf8');
            this.loadHistory(this.#historypath);
        }
        return input.value || 'undefined';
    }

    exit(exitcode: number = 0): void {
        fs.closeSync(this.#historyfd);
        process.exit(exitcode);
    }

    prompt: string;
    readonly #historyfd: number;
    readonly #historypath: string;
}
