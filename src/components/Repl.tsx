import { KeyboardEventHandler, useCallback, useRef, useState } from "react";
import { Turtle } from "../turtles/turtle";
import { StackHistory } from "../util/history";

export interface IReplProps {
    onLine: (line: string | null) => void;
    onClear: () => void;
    stackHistory: StackHistory;
}

export const Repl = ({ onLine, onClear, stackHistory }: IReplProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                const value = inputRef.current?.value ?? null;
                onLine(value);
                if (value) {
                    stackHistory.push(value);
                }
                inputRef.current!.value = "";
            } else if (e.key === "ArrowUp") {
                const previous = stackHistory.previous();
                if (previous && inputRef.current) {
                    inputRef.current.value = previous;
                }
            } else if (e.key === "ArrowDown") {
                const next = stackHistory.next();
                if (inputRef.current) {
                    inputRef.current.value = next ?? "";
                }
            }
        },
        [onLine, stackHistory]
    );

    return (
        <div className="repl-controls">
            <input ref={inputRef} type="text" className="repl-input" onKeyDown={onKeyDown} />
            <button onClick={() => onClear()}>Clear</button>
        </div>
    );
};
