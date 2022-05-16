export interface Lexeme {
    value: string;
    position: number;
}

export function turtleLex(s: string): Lexeme[] {
    const result: Lexeme[] = [];

    let value: string | null = null;
    let position = 0;

    const pushLexeme = () => {
        if (value != null) {
            result.push({ position, value: value });
        }
    };

    for (let i = 0; i < s.length; ++i) {
        if (s[i] == " " || s[i] == "\n") {
            pushLexeme();
            value = "";
            position = i + 1;
        } else {
            if (value == null) {
                value = "";
            }
            value += s[i];
        }
    }
    pushLexeme();
    return result;
}

export interface CommandToken {
    type: "command";
    value: "moveForward" | "moveTo" | "turn" | "turnTo";
    lexeme: Lexeme;
}

export interface NumberToken {
    type: "number";
    value: number;
    lexeme: Lexeme;
}

export interface InvalidToken {
    type: "invalid";
    lexeme: Lexeme;
}

export type TurtleToken = CommandToken | NumberToken | InvalidToken;

export function turtleParse(s: string): TurtleToken[] {
    const lexemes = turtleLex(s);
    const result: TurtleToken[] = lexemes.map(lexeme => {
        if (["f", "moveForward"].includes(lexeme.value)) {
            return {
                type: "command",
                value: "moveForward",
                lexeme
            };
        }

        return {
            type: "invalid",
            lexeme: lexeme,
        };
    });
    return result;
}
