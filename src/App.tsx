import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import { SimpleRenderer } from "./render/simpleRenderer";
import { Turtle } from "./turtles/turtle";
import { createWhile } from "typescript";
import { TurtleInterpreter } from "./turtleScript/turtleInterpreter";

const turtle = new Turtle();

turtle.notifer.subscribe('log', o => console.log(o));

const delay = (t: number) => new Promise(res => window.setTimeout(res, t));
const crawl =async () => {
  turtle.moveForward(50);
  await delay(500);
  turtle.moveForward(50);
  await delay(500);
  turtle.turn(-45);
  turtle.moveForward(50);
  await delay(500);
  turtle.moveForward(50);
  await delay(500);
}

// crawl();

function App() {
    let canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        new SimpleRenderer(ctx, turtle);
        const interp = new TurtleInterpreter(turtle);
        interp.interpret("f 50 f 50 l 45 f 50 l 45 f 50 r 90 f 100");
      } 
    }, [canvasRef]);

    return (
        <div className="App">
            <canvas width={400} height={400} ref={canvasRef} />
        </div>
    );
}

export default App;
