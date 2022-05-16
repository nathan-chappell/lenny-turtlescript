import { Turtle } from "../turtles/turtle";
import { EventArgs } from "../util/notifier";

export class SimpleRenderer {
    private _ctx: CanvasRenderingContext2D | null = null;
    private _turtle: Turtle | null = null;
    private _id: string = "simple-renderer";

    private positionSequence: [number, number][] = [];

    styles = {
        strokeStyle: "#000",
        lineWidth: 10,
        width: 200,
        height: 200,
    };

    connect(ctx: CanvasRenderingContext2D, turtle: Turtle) {
        this._ctx = ctx;
        this._turtle = turtle;

        const { width, height } = this.styles;

        this._ctx.beginPath();
        this._ctx.moveTo(width / 2, height / 2);
        this._turtle.notifer.subscribe(this._id, (turtle: Turtle, args: EventArgs) => {
            // this.positionSequence.push([turtle.x, turtle.y]);
            // this.render();
            this._ctx?.lineTo(width / 2 + turtle.x, height / 2 + turtle.y);
            this._ctx?.stroke();
        });
    }

    render() {
        this._ctx?.moveTo(0, 0);
        this._ctx?.beginPath();
        for (let [x, y] of this.positionSequence) {
            this._ctx?.lineTo(x, y);
        }
        this._ctx?.stroke();
    }
}
