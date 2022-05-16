import { CommandToken, NumberToken, TurtleToken, turtleTokenize } from "./turtleTok";

type TokenPair = [TurtleToken, TurtleToken];
type TokenTriple = [TurtleToken, TurtleToken, TurtleToken];

export interface MoveForwardCommand {
    type: "move-forward";
    d: number;
    tokens: TokenPair;
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

export interface TurnRightCommand {
    type: "turn-right";
    a: number;
    tokens: TokenPair;
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
    
    makeMoveToCommand(commandToken: CommandToken, arg1Token: NumberToken, arg2Token: NumberToken): MoveToCommand {
        return { type: "move-to", x: arg1Token.value, y: arg2Token.value, tokens: [commandToken, arg1Token, arg2Token] };
    }

    makeTurnLeftCommand(commandToken: CommandToken, arg1Token: NumberToken): TurnLeftCommand {
        return { type: "turn-left", a: arg1Token.value, tokens: [commandToken, arg1Token] };
    }

    makeTurnRightCommand(commandToken: CommandToken, arg1Token: NumberToken): TurnRightCommand {
        return { type: "turn-right", a: arg1Token.value, tokens: [commandToken, arg1Token] };
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
    | MoveToCommand
    | TurnLeftCommand
    | TurnRightCommand
    | TurnToCommand
    | InvalidCommand;

export function turtleParse(s: string): TurtleCommand[] {
    let result: TurtleCommand[] = [];
    const tokens = turtleTokenize(s);
    const factory: CommandFactory = new CommandFactory();

    //prettier-ignore
    for (let i = 0; i < tokens.length; ++i) {
        let token1 = tokens[i];
        let token2 = tokens[i+1];
        let token3 = tokens[i+2];
        if (token1.type === "command" && token1.value === "move-forward" && i < tokens.length - 1 && token2.type === "number") {
            result.push(factory.makeMoveForwardCommand(token1, token2));
            i += 1;
        } else if (token1.type === "command" && token1.value === "move-to" && i < tokens.length - 2 && token2.type === "number" && token3.type === "number") {
            result.push(factory.makeMoveToCommand(token1, token2, token3));
            i += 2;
        } else if (token1.type === "command" && token1.value === "turn-left" && i < tokens.length - 1 && token2.type === "number") {
            result.push(factory.makeTurnLeftCommand(token1, token2));
            i += 1;
        } else if (token1.type === "command" && token1.value === "turn-right" && i < tokens.length - 1 && token2.type === "number") {
            result.push(factory.makeTurnRightCommand(token1, token2));
            i += 1;
        } else if (token1.type === "command" && token1.value === "turn-to" && i < tokens.length - 1 && token2.type === "number") {
            result.push(factory.makeTurnToCommand(token1, token2));
            i += 1;
        } else {
            result.push(factory.makeInvalidCommand(...tokens.filter((_,_i) => _i >= i )));
            i = tokens.length;
        }
    }
    return result;
}
