import { turtleLex } from "./turtleLex";
import { CommandToken, NumberToken, TurtleToken, turtleTokenize } from "./turtleTok";

type TokenSingle = [TurtleToken];
type TokenPair = [TurtleToken, TurtleToken];
type TokenTriple = [TurtleToken, TurtleToken, TurtleToken];

export interface MoveForwardCommand {
    type: "move-forward";
    d: number;
    tokens: TokenPair;
}

export interface MoveForwardDefaultCommand {
    type: "move-forward-default";
    tokens: TokenSingle;
}

export interface MoveToCommand {
    type: "move-to";
    x: number;
    y: number;
    tokens: TokenTriple;
}

export interface TurnLeftCommand {
    type: "turn-left";
    a: number;
    tokens: TokenPair;
}

export interface TurnLeftDefaultCommand {
    type: "turn-left-default";
    tokens: TokenSingle;
}

export interface TurnRightCommand {
    type: "turn-right";
    a: number;
    tokens: TokenPair;
}

export interface TurnRightDefaultCommand {
    type: "turn-right-default";
    tokens: TokenSingle;
}

export interface TurnToCommand {
    type: "turn-to";
    a: number;
    tokens: TokenPair;
}

export interface InvalidCommand {
    type: "invalid";
    tokens: TurtleToken[];
}

// prettier-ignore
class CommandFactory {
    makeMoveForwardCommand(commandToken: CommandToken, arg1Token: NumberToken): MoveForwardCommand {
        return { type: "move-forward", d: arg1Token.value, tokens: [commandToken, arg1Token] };
    }

    makeMoveForwardDefaultCommand(commandToken: CommandToken): MoveForwardDefaultCommand {
        return { type: "move-forward-default", tokens: [commandToken] };
    }
    
    makeMoveToCommand(commandToken: CommandToken, arg1Token: NumberToken, arg2Token: NumberToken): MoveToCommand {
        return { type: "move-to", x: arg1Token.value, y: arg2Token.value, tokens: [commandToken, arg1Token, arg2Token] };
    }

    makeTurnLeftCommand(commandToken: CommandToken, arg1Token: NumberToken): TurnLeftCommand {
        return { type: "turn-left", a: arg1Token.value, tokens: [commandToken, arg1Token] };
    }

    makeTurnLeftDefaultCommand(commandToken: CommandToken): TurnLeftDefaultCommand {
        return { type: "turn-left-default", tokens: [commandToken] };
    }

    makeTurnRightCommand(commandToken: CommandToken, arg1Token: NumberToken): TurnRightCommand {
        return { type: "turn-right", a: arg1Token.value, tokens: [commandToken, arg1Token] };
    }

    makeTurnRightDefaultCommand(commandToken: CommandToken): TurnRightDefaultCommand {
        return { type: "turn-right-default", tokens: [commandToken] };
    }

    makeTurnToCommand(commandToken: CommandToken, arg1Token: NumberToken): TurnToCommand {
        return { type: "turn-to", a: arg1Token.value, tokens: [commandToken, arg1Token] };
    }

    makeInvalidCommand(...tokens: TurtleToken[]): InvalidCommand {
        return { type: "invalid", tokens };
    }
}

export type TurtleCommand =
    | MoveForwardCommand
    | MoveForwardDefaultCommand
    | MoveToCommand
    | TurnLeftCommand
    | TurnLeftDefaultCommand
    | TurnRightCommand
    | TurnRightDefaultCommand
    | TurnToCommand
    | InvalidCommand;

export function turtleParse(s: string): TurtleCommand[] {
    let result: TurtleCommand[] = [];
    const lexemes = turtleLex(s);
    const tokens = turtleTokenize(lexemes);
    const factory: CommandFactory = new CommandFactory();

    //prettier-ignore
    let i = 0;
    while (i < tokens.length) {
        let token1 = tokens[i];
        let token2 = tokens[i+1];
        let token3 = tokens[i+2];

        let tokensConsumed = 1;

        if (token1?.type === "command" && token1.value === "move-forward" && token2?.type === "number") {
            result.push(factory.makeMoveForwardCommand(token1, token2));
            tokensConsumed = 2;
        } else if (token1.type === "command" && token1.value === "move-forward" && token2?.type !== "number") {
            result.push(factory.makeMoveForwardDefaultCommand(token1));
            tokensConsumed = 1;
        } else if (token1?.type === "command" && token1.value === "move-to" && token2?.type === "number" && token3?.type === "number") {
            result.push(factory.makeMoveToCommand(token1, token2, token3));
            tokensConsumed = 3;
        } else if (token1?.type === "command" && token1.value === "turn-left" && token2?.type === "number") {
            result.push(factory.makeTurnLeftCommand(token1, token2));
            tokensConsumed = 2;
        } else if (token1?.type === "command" && token1.value === "turn-left" && token2?.type !== "number") {
            result.push(factory.makeTurnLeftDefaultCommand(token1));
            tokensConsumed = 1;
        } else if (token1?.type === "command" && token1.value === "turn-right" && token2?.type === "number") {
            result.push(factory.makeTurnRightCommand(token1, token2));
            tokensConsumed = 2;
        } else if (token1?.type === "command" && token1.value === "turn-right" && token2?.type !== "number") {
            result.push(factory.makeTurnRightDefaultCommand(token1));
            tokensConsumed = 1;
        } else if (token1?.type === "command" && token1.value === "turn-to" && token2?.type === "number") {
            result.push(factory.makeTurnToCommand(token1, token2));
            tokensConsumed = 2;
        } else {
            result.push(factory.makeInvalidCommand(...tokens.filter((_,_i) => _i >= i )));
            break;
        }

        i += tokensConsumed;
    }
    return result;
}
