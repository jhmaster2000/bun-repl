export default class REPLHistory {
    add(entry: string): void {
        if (this.current === entry || entry === 'undefined' || !entry) return;
        this.#entries.unshift(entry);
    }

    remove(): void {
        this.#entries.shift();
    }

    consume(): string {
        if (this.#oob === -1) this.#pos--;
        const entry = this.#entries[this.#pos++ + this.#consumeBias] ?? '';
        if (this.#pos > this.#entries.length) {
            this.#pos = this.#entries.length;
            this.#oob = +1;
        } else {
            this.#oob = 0;
        }
        this.#pos += this.#consumeBias;
        this.#unconsumeBias = -1;
        this.#consumeBias = 0;
        return entry;
    }

    unconsume(): string {
        if (this.#oob === +1) this.#pos++;
        const entry = this.#entries[--this.#pos + this.#unconsumeBias] ?? '';
        if (this.#pos < 0) {
            this.#pos = 0;
            this.#oob = -1;
        } else {
            this.#oob = 0;
        }
        this.#pos += this.#unconsumeBias;
        this.#consumeBias = +1;
        this.#unconsumeBias = 0;
        return entry;
    }

    resetPos(): void {
        this.#pos = 0;
        this.#oob = 0;
        this.#consumeBias = 0;
        this.#unconsumeBias = 0;
    }

    get current(): string {
        return this.#entries[this.#pos];
    }

    #pos: number = 0;
    #oob: number = 0;
    #consumeBias: number = 0;
    #unconsumeBias: number = 0;
    #entries: string[] = [];
}
