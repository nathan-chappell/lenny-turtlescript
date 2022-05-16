import { Turtle } from "../turtles/turtle"
import { turtleParse } from "./turtleParser";

export class TurtleInterpreter {
    _turtle: Turtle;
    constructor(turtle: Turtle) {
        this._turtle = turtle;
    }

    interpret(line: string) {
        const commands = turtleParse(line);
        for (let command of commands) {
            if (command.type === "move-forward") { this._turtle.moveForward(command.d); }
            else if (command.type === "move-to") { this._turtle.moveTo(command.x, command.y); }
            else if (command.type === "turn-left") { this._turtle.turn(-command.a); }
            else if (command.type === "turn-right") { this._turtle.turn(command.a); }
            else if (command.type === "turn-to") { this._turtle.turnTo(command.a); }
            else {
                console.error(command);
            }
        }
    }
}