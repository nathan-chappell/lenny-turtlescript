import { Lexeme, splitLexeme, turtleLex } from "./turtleLex";
import { TurtleToken, turtleTokenize } from "./turtleTok";

// export interface MetaCommandToken {
//     type: "meta-command";
//     value: "set-default-distance" | "set-default-angle" | "multiply-default-distance" | "multiply-default-angle";
//     lexeme: Lexeme;
// }

export interface MetaVariableToken {
    type: "meta-variable";
    value: "default-distance" | "default-angle" | "user-variable";
    lexeme: Lexeme;
}

export interface OperatorToken {
    type: "operator";
    value: "assignment" | "add-assignment" | "subtract-assignment" | "multiply-assignment" | "divide-assignment";
    lexeme: Lexeme;
}

export interface LabelToken {
    type: "label";
    value: string;
    lexeme: Lexeme;
}

export interface GotoToken {
    type: "goto";
    lexeme: Lexeme;
}

export type MiniToken = MetaVariableToken | OperatorToken | LabelToken | GotoToken | TurtleToken;

// prettier-ignore
class TokenFactory {
    makeDefaultDistanceToken(lexeme: Lexeme): MetaVariableToken { return {type: "meta-variable", value: "default-distance", lexeme }; }
    makeDefaultAngleToken(lexeme: Lexeme): MetaVariableToken { return {type: "meta-variable", value: "default-angle", lexeme }; }
    makeUserVariableToken(lexeme: Lexeme): MetaVariableToken { return {type: "meta-variable", value: "user-variable", lexeme }; }

    makeAssignmentToken(lexeme: Lexeme): OperatorToken { return {type: "operator", value: "assignment", lexeme }; }
    makeAddAssignmentToken(lexeme: Lexeme): OperatorToken { return {type: "operator", value: "add-assignment", lexeme }; }
    makeSubtractAssignmentToken(lexeme: Lexeme): OperatorToken { return {type: "operator", value: "subtract-assignment", lexeme }; }
    makeMultiplyAssignmentToken(lexeme: Lexeme): OperatorToken { return {type: "operator", value: "multiply-assignment", lexeme }; }
    makeDivideAssignmentToken(lexeme: Lexeme): OperatorToken { return {type: "operator", value: "divide-assignment", lexeme }; }

    makeLabelToken(lexeme: Lexeme): LabelToken { return {type: "label", value: lexeme.value.substring(0, lexeme.value.length - 1), lexeme }; }
    makeGotoToken(lexeme: Lexeme): GotoToken { return {type: "goto", lexeme }; }
}

export function miniTokenize(lexemes: Lexeme[]): MiniToken[] {
    const factory = new TokenFactory();
    // prettier-ignore
    const result: MiniToken[] = lexemes.map(lexeme => {
        if (lexeme.value === "$d") { return factory.makeDefaultDistanceToken(lexeme); }
        else if (lexeme.value === "$a") { return factory.makeDefaultAngleToken(lexeme); }
        else if (lexeme.value.startsWith("$")) { return factory.makeUserVariableToken(lexeme); }
        else if (lexeme.value === "=") { return factory.makeAssignmentToken(lexeme); }
        else if (lexeme.value === "+=") { return factory.makeAddAssignmentToken(lexeme); }
        else if (lexeme.value === "-=") { return factory.makeSubtractAssignmentToken(lexeme); }
        else if (lexeme.value === "*=") { return factory.makeMultiplyAssignmentToken(lexeme); }
        else if (lexeme.value === "/=") { return factory.makeDivideAssignmentToken(lexeme); }
        else if (lexeme.value.endsWith(':')) { return factory.makeLabelToken(lexeme); }
        else if (lexeme.value === 'goto') { return factory.makeGotoToken(lexeme); }
        else {
            return turtleTokenize([lexeme]);
        }
    }).flat();
    return result;
}
