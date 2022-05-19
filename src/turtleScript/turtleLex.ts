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
        if (s[i] === " " || s[i] === "\n") {
            pushLexeme();
            value = "";
            position = i + 1;
        } else {
            if (value === null) {
                value = "";
            }
            value += s[i];
        }
    }
    pushLexeme();
    return result;
}

export function splitLexeme(lexeme: Lexeme) {
    const result: Lexeme[] = [];
    for (let i = 0; i < lexeme.value.length; ++i) {
        result.push({value: lexeme.value[i], position: lexeme.position + i});
    }
    return result;
}