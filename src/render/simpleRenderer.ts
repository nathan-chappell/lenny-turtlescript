import { Turtle } from "../turtles/turtle";
import { EventArgs } from "../util/notifier";

export class SimpleRenderer {
    private _ctx: CanvasRenderingContext2D;
    private _turtle: Turtle;
    private _id: string = 'simple-renderer'
    private _scale: number = 50;

    private positionSequence: [number, number][] = [];

    constructor(ctx: CanvasRenderingContext2D, turtle: Turtle) {
        this._ctx = ctx;
        this._turtle = turtle;
        this.connect();
    }

    connect() {
        this._ctx.strokeStyle = '#000';
        this._ctx.lineWidth = 10;

        this._ctx.beginPath();
        this._ctx.moveTo(200,200);
        this._turtle.notifer.subscribe(this._id, (turtle: Turtle, args: EventArgs) => {
            // this.positionSequence.push([turtle.x, turtle.y]);
            // this.render();
            this._ctx.lineTo(200 + turtle.x,200 + turtle.y);
            this._ctx.stroke();
        });
    }

    render() {
        
        this._ctx.moveTo(0,0);
        this._ctx.beginPath();
        for (let [x, y] of this.positionSequence) {
            this._ctx.lineTo(x,y);
        }
        this._ctx.stroke();
    }

    private scale(x: number, y: number): [number, number] {
        return [x*this._scale, y*this._scale];
    }
}
