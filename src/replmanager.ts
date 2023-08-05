import $ from './colors';
import fs from 'fs';
import os from 'os';
import path from 'path';
import readline from 'rustybun';

// Follows the XDG directory convention, accepting `BUN_INSTALL` as an override.
// https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
// Also ensures that the parent directory exists, so that the file can be created without issue.
function repl_history_file_path(): string {
    const dataFolder = process.env.BUN_INSTALL ?? (process.env.XDG_DATA_HOME) ?? path.join(os.homedir(), ".local/share")
    let history_path = path.join(dataFolder, "bun-repl/history");
    fs.mkdirSync(path.join(dataFolder, "bun-repl"), { recursive: true });

    if (!fs.existsSync(history_path)) {
        const old_default_path = path.join(os.homedir(), ".bun_repl_history")
        if (fs.existsSync(old_default_path)) {
            console.info(`----------------
Detected a bun-repl history file at the old default location: ${old_default_path}
Moving to: ${history_path}
----------------`);
            fs.renameSync(old_default_path, history_path)
        }
    }
    return history_path;
}

export default class REPLManager extends readline {
    constructor(prompt: string = '> ', historyPath?: string) {
        super();
        this.prompt = process.env.BUN_REPL_PROMPT ?? prompt;
        historyPath ||= repl_history_file_path();
        this.#historyfd = fs.openSync(historyPath, 'a+');
        this.#historypath = historyPath;

        const historyLines = fs.readFileSync(historyPath, 'utf8').split('\n');
        const maxHistoryLines = Number(process.env.BUN_REPL_HISTORY_SIZE ?? 1000) || 1000;
        if (historyLines.length > maxHistoryLines) {
            fs.writeFileSync(historyPath, historyLines.slice(historyLines.length - maxHistoryLines).join('\n'));
        }
        this.loadHistory(historyPath);
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
