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

    push(s: string) {
        this._previousStack.push(s);
        this._nextStack = [];
    }

    previous(): string | null {
        return rotateL2R(this._previousStack, this._nextStack);
    }

    next(): string | null {
        return rotateL2R(this._nextStack, this._previousStack);
    }
}