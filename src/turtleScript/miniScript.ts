import { TurtleInterpreter } from "./turtleInterpreter";

/*
Line oriented language
Anything after // is ignored

each line is one of:

turtle-interpreter commands
    forward to interpreter
turtle-interpreter-meta command
    d = ? // set default distance
    a = ? // set default angle
    d *= ? // multiply default distance
    a *= ? // multiply default angle
label
    loop-from-here: // any non-space sequence ending with ':'
bounded-goto
    loop loop-from-here N // loops N times
*/

export class MiniScriptInterpreter {
    turtleInterpreter: TurtleInterpreter;

    constructor(turtleInterpreter: TurtleInterpreter) {
        this.turtleInterpreter = turtleInterpreter;
    }


}