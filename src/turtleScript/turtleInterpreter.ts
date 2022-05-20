import { styles } from "../styles";
import { Turtle } from "../turtles/turtle";
import { delay } from "../util/misc";
import { turtleParse } from "./turtleParser";

export class TurtleInterpreter {
    turtle: Turtle | null = null;
    defaultForward: number = 20;
    defaultTurn: number = 45;

    connect(turtle: Turtle) {
        this.turtle = turtle;
    }

    async interpret(line: string) {
        const commands = turtleParse(line);
        // prettier-ignore
        for (let command of commands) {
            if (command.type === "move-forward") { this.turtle?.moveForward(command.d); }
            else if (command.type === "move-forward-default") { this.turtle?.moveForward(this.defaultForward); }
            else if (command.type === "move-to") { this.turtle?.moveTo(command.x, command.y); }
            else if (command.type === "turn-left") { this.turtle?.turn(-command.a); }
            else if (command.type === "turn-left-default") { this.turtle?.turn(-this.defaultTurn); }
            else if (command.type === "turn-right") { this.turtle?.turn(command.a); }
            else if (command.type === "turn-right-default") { this.turtle?.turn(this.defaultTurn); }
            else if (command.type === "turn-to") { this.turtle?.turnTo(command.a); }
            else {
                console.error(command);
            }
            await delay(styles.turtleDelay);
        }
    }
}
