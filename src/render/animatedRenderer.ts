import { Turtle } from "../turtles/turtle";
import { delay } from "../util/misc";
import { EventArgs, Notifier } from "../util/notifier";

// type Point = [number, number];
// type Milliseconds = number;

// class LineTraveler {
//     private _time: Milliseconds;
//     private _frequency: Milliseconds;

//     notifier: Notifier<LineTraveler, Point> = new Notifier();

//     constructor(time: Milliseconds = 500, frequency: Milliseconds = 50) {
//         this._time = time;
//         this._frequency = frequency;
//     }

//     async travel(from: Point, to: Point): Promise<void> {
//         const startTime: Milliseconds = new Date().valueOf();
//         let curTime = startTime;
//         this.notifier.notify(this, 'start', from);
//         while (curTime - startTime < this._time) {
//             await delay(this._frequency);
//             curTime = new Date().valueOf();
//             const d = Math.min(1, (curTime - startTime) / this._time);
//             const x = (to[0]*(d) + from[0]*(1-d));
//             const y = (to[1]*(d) + from[1]*(1-d));
//             this.notifier.notify(this, 'update', [x,y]);
//         }
//         this.notifier.notify(this, 'finish', to);
//     }
// }

// export class AnimatedRenderer {
//     private _ctx: CanvasRenderingContext2D | null = null;
//     private _turtle: Turtle | null = null;
//     private _id: string = "animated-renderer";

//     private positionSequence: [number, number][] = [];

//     styles = {
//         strokeStyle: "#000",
//         lineWidth: 10,
//         width: 200,
//         height: 200,
//     };

//     connect(ctx: CanvasRenderingContext2D, turtle: Turtle) {
//         this._ctx = ctx;
//         this._turtle = turtle;

//         const { width, height } = this.styles;

//         this._ctx.beginPath();
//         this._ctx.moveTo(width / 2, height / 2);
//         this._turtle.notifer.subscribe(this._id, (turtle: Turtle, args: EventArgs<null>) => {
//             // this.pushAnimation(this.animateTo(turtle.x, turtle.y));
//         });
//     }

//     travelSettings = {
//         time: 500,
//         frequency: 50
//     }

//     async animateTo(x: number, y: number): Promise<void> {
//         let res: () => void;
//         let result = new Promise<void>(_res => { res = _res; })
//         const lineTraveler = new LineTraveler()
//         return result;
//     }

//     render() {
//         this._ctx?.moveTo(0, 0);
//         this._ctx?.beginPath();
//         for (let [x, y] of this.positionSequence) {
//             this._ctx?.lineTo(x, y);
//         }
//         this._ctx?.stroke();
//     }
// }
