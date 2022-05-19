import { debug } from "console";
import { Turtle } from "../turtles/turtle";
import { Point } from "../util/geometry";
import { EventArgs } from "../util/notifier";

export class SimpleRenderer {
    private _ctx: CanvasRenderingContext2D | null = null;
    private _turtle: Turtle | null = null;
    private _id: string = "simple-renderer";

    private positionSequence: [number, number][] = [];

    styles = {
        strokeStyle: "#000",
        fillStyle: "#333",
        lineWidth: 10,
        width: 200,
        height: 200,
        turtleLength: 5,
    };

    translatePoint(point: Point): Point {
        return [point[0] + this.styles.width / 2, point[1] + this.styles.height / 2];
    }

    clearCanvas() {
        if (!this._ctx) return;
        const { width, height } = this.styles;
        this._ctx.clearRect(0, 0, width, height);
    }

    reset() {
        if (this._turtle) {
            this._turtle.reset();
        }
        if (this._ctx) {
            const [x, y] = this.translatePoint([0, 0]);
            this._ctx.moveTo(x, y);
            this._ctx.beginPath();
            this.clearCanvas();
        }
        // this.drawTurtle();
    }

    connect(ctx: CanvasRenderingContext2D, turtle: Turtle) {
        this._ctx = ctx;
        this._turtle = turtle;
        this.reset();

        this._turtle.notifer.subscribe(this._id, (turtle: Turtle, args: EventArgs) => {
            // this.positionSequence.push([turtle.x, turtle.y]);
            // this.render();
            if (!this._turtle || !this._ctx) return;
            if (args.event === "set-angle") {
                this.clearTurtle();
                this.drawTurtle();
            } else {
                const toPoint = this.translatePoint([this._turtle.x, this._turtle.y]);
                this._ctx.lineTo(toPoint[0], toPoint[1]);
                this._ctx.stroke();
                this.drawTurtle();
                this._ctx.beginPath();
                this._ctx.moveTo(toPoint[0], toPoint[1]);
            }
        });
    }

    drawTurtle() {
        if (!this._turtle || !this._ctx) return;
        const p1 = this.translatePoint(this._turtle.lookToward(this.styles.turtleLength, 0));
        const p2 = this.translatePoint(this._turtle.lookToward(this.styles.turtleLength, 120));
        const p3 = this.translatePoint(this._turtle.lookToward(this.styles.turtleLength, 240));
        const path = new Path2D();
        path.moveTo(p1[0], p1[1]);
        path.lineTo(p2[0], p2[1]);
        path.lineTo(p3[0], p3[1]);
        path.closePath();
        this._ctx.save();
        this._ctx.fillStyle = this.styles.fillStyle;
        this._ctx.fill(path);
        this._ctx.restore();
    }

    clearTurtle() {
        if (!this._turtle || !this._ctx) return;
        const c = this.translatePoint([this._turtle.x, this._turtle.y]);
        const r = 10 // this.styles.turtleLength;
        this._ctx.save();
        this._ctx.fillStyle = "#fff";
        this._ctx.strokeStyle = "#fff";
        this._ctx.beginPath();
        this._ctx.ellipse(c[0], c[1], r, r, 0, 0, 2 * Math.PI);
        // this._ctx.stroke();
        this._ctx.fill();
        this._ctx.moveTo(c[0], c[1]);
        this._ctx.restore();
    }

    // render() {
        // this._ctx?.moveTo(0, 0);
    //     this._ctx?.beginPath();
    //     for (let [x, y] of this.positionSequence) {
    //         this._ctx?.lineTo(x, y);
    //     }
    //     this._ctx?.stroke();
    // }
}
