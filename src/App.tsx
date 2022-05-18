import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import { SimpleRenderer } from "./render/simpleRenderer";
import { Turtle } from "./turtles/turtle";
import { createWhile } from "typescript";
import { TurtleInterpreter } from "./turtleScript/turtleInterpreter";
import { Repl } from "./components/Repl";
import { StackHistory } from "./util/history";
import { styles } from "./styles";
import { delay } from "./util/misc";

const turtle = new Turtle();

turtle.notifer.subscribe("log", (o) => console.log(o));

class AppState {
    simpleRenderer: SimpleRenderer = new SimpleRenderer();
    turtleInterpreter: TurtleInterpreter = new TurtleInterpreter();
    stackHistory: StackHistory = new StackHistory();
}

const appState = new AppState();

function App() {
    let canvasRef = useRef<HTMLCanvasElement>(null);
    const [state] = useState({
        simpleRenderer: new SimpleRenderer(),
        turtleInterpreter: new TurtleInterpreter(),
        stackHistory: new StackHistory(),
    });

    const onLine = useCallback((line: string | null) => {
      state.turtleInterpreter.interpret(line ?? "");
    },[])

    const onClear = useCallback(() => {
        state.simpleRenderer.reset();
    },[])

    useEffect(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
            state.simpleRenderer.connect(ctx, turtle);
            state.turtleInterpreter.connect(turtle);
        }
    }, [canvasRef]);

    return (
        <div className="App">
            <canvas width={styles.width} height={styles.height} ref={canvasRef} />
            <Repl onLine={onLine} onClear={() => onClear()} stackHistory={state.stackHistory} />
        </div>
    );
}

export default App;
