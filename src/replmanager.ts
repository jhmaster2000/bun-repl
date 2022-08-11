import $ from './colors';
import fs from 'fs';
import readline from 'rustybun';

export default class REPLManager extends readline {
    constructor(prompt: string = '> ', historyPath?: string) {
        super();
        this.prompt = process.env.BUN_REPL_PROMPT ?? prompt;
        historyPath ||= `${process.env.BUN_INSTALL ?? '~'}/.bun_repl_history`;
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
