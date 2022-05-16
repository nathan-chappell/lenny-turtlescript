import { KeyboardEventHandler, useCallback, useRef } from "react";
import { Turtle } from "../turtles/turtle";

export interface IReplProps {
    onLine: (line: string | null) => void;
    onClear: () => void;
}

export const Repl = ({ onLine, onClear }: IReplProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onLine(inputRef.current?.value ?? null);
            inputRef.current!.value = '';
        }
    },[onLine]);

    return (
        <div className="repl-controls">
            <input ref={inputRef} type="text" className="repl-input" onKeyDown={onKeyDown} />
            <button onClick={() => onClear()}>Clear</button>
        </div>
    );
};
