import { KeyboardEventHandler, useCallback, useRef, useState } from "react";
import { Turtle } from "../turtles/turtle";
import { StackHistory } from "../util/history";

export interface IReplProps {
    onLine: (line: string | null) => void;
    onClear: () => void;
}

export const Repl = ({ onLine, onClear }: IReplProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [state] = useState({ history: new StackHistory() });

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                const value = inputRef.current?.value ?? null;
                onLine(value);
                if (value) {
                    state.history.push(value);
                }
                inputRef.current!.value = "";
            } else if (e.key === "ArrowUp") {
                const previous = state.history.previous();
                if (previous && inputRef.current) {
                    inputRef.current.value = previous;
                }
            } else if (e.key === "ArrowDown") {
                const next = state.history.next();
                if (next && inputRef.current) {
                    inputRef.current.value = next;
                }
            }
        },
        [onLine, state.history]
    );

    return (
        <div className="repl-controls">
            <input ref={inputRef} type="text" className="repl-input" onKeyDown={onKeyDown} />
            <button onClick={() => onClear()}>Clear</button>
        </div>
    );
};
