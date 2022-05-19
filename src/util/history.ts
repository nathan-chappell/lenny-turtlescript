function rotateL2R<T>(l: T[], r: T[]): T | null {
    if (l.length > 0) {
        const top: T = l.pop()!;
        r.push(top);
        return top;
    } else {
        return null;
    }
}

export class StackHistory {
    private _previousStack: string[] = [];
    private _nextStack: string[] = [];
    private _id: string = 'lenny-turtleScript.stackHistory';

    constructor() {
        this.load();
    }

    push(s: string) {
        if (s !== this.top) {
            this._previousStack.push(s);
            this._nextStack = [];
            this.save();
        }
    }

    get top(): string | null {
        if (this._previousStack.length > 0) {
            return this._previousStack[this._previousStack.length];
        } else {
            return null;
        }
    }

    previous(): string | null {
        return rotateL2R(this._previousStack, this._nextStack);
    }

    next(): string | null {
        return rotateL2R(this._nextStack, this._previousStack);
    }

    save() {
        const stacks = JSON.stringify([this._previousStack, this._nextStack]);
        localStorage.setItem(this._id, stacks);
    }

    load() {
        const stacksString = localStorage.getItem(this._id);
        if (stacksString) {
            const stacks = JSON.parse(stacksString) as [string[],string[]];
            this._previousStack = stacks[0];
            this._nextStack = stacks[1];
        }
    }
}