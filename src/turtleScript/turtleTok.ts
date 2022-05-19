import { Lexeme, splitLexeme, turtleLex } from "./turtleLex";

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

const kwLists = {
    moveForwardKWlist: ["f", "move-forward"],
    moveToKWlist: ["m", "move-to"],
    turnLeftKWlist: ["l", "turn-left"],
    turnRightKWlist: ["r", "turn-right"],
    turnToKWlist: ["a", "turn-to"],
}

const singleCharCommands = Object.values(kwLists).map(a => a[0]);

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

export function turtleTokenize(lexemes: Lexeme[]): TurtleToken[] {
    const factory = new TokenFactory();
    // prettier-ignore
    const result: TurtleToken[] = lexemes.map(lexeme => {
        if (kwLists.moveForwardKWlist.includes(lexeme.value)) { return factory.makeMoveForwardToken(lexeme); }
        else if (kwLists.moveToKWlist.includes(lexeme.value)) { return factory.makeMoveToToken(lexeme); }
        else if (kwLists.turnLeftKWlist.includes(lexeme.value)) { return factory.makeTurnLeftToken(lexeme); }
        else if (kwLists.turnRightKWlist.includes(lexeme.value)) { return factory.makeTurnRightToken(lexeme); }
        else if (kwLists.turnToKWlist.includes(lexeme.value)) { return factory.makeTurnToToken(lexeme); }
        else if (!Number.isNaN(parseFloat(lexeme.value))) { return factory.makeNumberToken(lexeme); }
        else {
            const split = splitLexeme(lexeme);
            if (split.length > 1) {
                const subTokens = turtleTokenize(split);
                if (subTokens.every(tok => tok.type != 'invalid')) {
                    return subTokens;
                }
            }
            return factory.makeInvalidToken(lexeme);
        }
    }).flat();
    return result;
}
