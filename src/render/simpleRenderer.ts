import { Turtle } from "../turtles/turtle";
import { EventArgs } from "../util/notifier";

export class SimpleRenderer {
    private _ctx: CanvasRenderingContext2D;
    private _turtle: Turtle;
    private _id: string = 'simple-renderer'
    private _scale: number = 200;

    private positionSequence: [number, number][] = [];

    constructor(ctx: CanvasRenderingContext2D, turtle: Turtle) {
        this._ctx = ctx;
        this._turtle = turtle;
        this.connect();
    }

    connect() {
        this._turtle.notifer.subscribe(this._id, (turtle: Turtle, args: EventArgs) => {
            this.positionSequence.push([turtle.x, turtle.y]);
            this.render();
        });
    }

    render() {
        this._ctx.moveTo(0,0);
        for (let [x, y] of this.positionSequence) {
            let [sx, sy] = this.scale(x,y);
            this._ctx.moveTo(sx,sy);
        }
        this._ctx.stroke();
    }

    private scale(x: number, y: number): [number, number] {
        return [x*this._scale, y*this._scale];
    }
}
