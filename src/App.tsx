import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import { SimpleRenderer } from "./render/simpleRenderer";
import { Turtle } from "./turtles/turtle";
import { createWhile } from "typescript";
import { TurtleInterpreter } from "./turtleScript/turtleInterpreter";
import { Repl } from "./components/Repl";

const turtle = new Turtle();

turtle.notifer.subscribe("log", (o) => console.log(o));

const delay = (t: number) => new Promise((res) => window.setTimeout(res, t));
const crawl = async () => {
    turtle.moveForward(50);
    await delay(500);
    turtle.moveForward(50);
    await delay(500);
    turtle.turn(-45);
    turtle.moveForward(50);
    await delay(500);
    turtle.moveForward(50);
    await delay(500);
};

// crawl();

function App() {
    let canvasRef = useRef<HTMLCanvasElement>(null);
    const [state, setState] = useState({
        simpleRenderer: new SimpleRenderer(),
        turtleInterpreter: new TurtleInterpreter(),
    });

    const onLine = useCallback((line: string | null) => {
      state.turtleInterpreter.interpret(line ?? "");
    },[state])

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
            state.simpleRenderer.connect(ctx, turtle);
            state.turtleInterpreter.connect(turtle);
            // state.turtleInterpreter.interpret("f 50 f 50 l 45 f 50 l 45 f 50 r 90 f 100");
        }
    }, [canvasRef, state]);

    return (
        <div className="App">
            <canvas width={400} height={400} ref={canvasRef} />
            <Repl onLine={onLine} onClear={() => {}} />
        </div>
    );
}

export default App;
