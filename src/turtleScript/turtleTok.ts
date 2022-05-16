import { Lexeme, turtleLex } from "./turtleLex";

export interface CommandToken {
    type: "command";
    value: "move-forward" | "move-to" | "turn-left" | "turn-right" | "turn-to";
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

const moveForwardKWlist = ["f", "move-forward"];
const moveToKWlist = ["m", "move-to"];
const turnLeftKWlist = ["l", "turn-left"];
const turnRightKWlist = ["r", "turn-right"];
const turnToKWlist = ["a", "turn-to"];

// prettier-ignore
class TokenFactory {
    makeMoveForwardToken(lexeme: Lexeme): TurtleToken { return {type: "command", value: "move-forward", lexeme }; }
    makeMoveToToken(lexeme: Lexeme): TurtleToken { return {type: "command", value: "move-to", lexeme }; }
    makeTurnLeftToken(lexeme: Lexeme): TurtleToken { return {type: "command", value: "turn-left", lexeme }; }
    makeTurnRightToken(lexeme: Lexeme): TurtleToken { return {type: "command", value: "turn-right", lexeme }; }
    makeTurnToToken(lexeme: Lexeme): TurtleToken { return {type: "command", value: "turn-to", lexeme }; }
    
    makeNumberToken(lexeme: Lexeme): NumberToken { return {type: "number", value: parseFloat(lexeme.value), lexeme }; }
    makeInvalidToken(lexeme: Lexeme): InvalidToken { return {type: "invalid", lexeme }; }
}

export function turtleTokenize(s: string): TurtleToken[] {
    const lexemes = turtleLex(s);
    const factory = new TokenFactory();
    // prettier-ignore
    const result: TurtleToken[] = lexemes.map(lexeme => {
        if (moveForwardKWlist.includes(lexeme.value)) { return factory.makeMoveForwardToken(lexeme); }
        else if (moveToKWlist.includes(lexeme.value)) { return factory.makeMoveToToken(lexeme); }
        else if (turnLeftKWlist.includes(lexeme.value)) { return factory.makeTurnLeftToken(lexeme); }
        else if (turnRightKWlist.includes(lexeme.value)) { return factory.makeTurnRightToken(lexeme); }
        else if (turnToKWlist.includes(lexeme.value)) { return factory.makeTurnToToken(lexeme); }
        else if (!Number.isNaN(parseFloat(lexeme.value))) { return factory.makeNumberToken(lexeme); }
        else { return factory.makeInvalidToken(lexeme); }
    });
    return result;
}
