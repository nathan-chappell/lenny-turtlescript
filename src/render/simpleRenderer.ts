import { debug } from "console";
import { styles } from "../styles";
import { Turtle } from "../turtles/turtle";
import { Point } from "../util/geometry";
import { EventArgs } from "../util/notifier";

export class SimpleRenderer {
    private _ctx: CanvasRenderingContext2D | null = null;
    private _turtle: Turtle | null = null;
    private _id: string = "simple-renderer";
    private _previousLocation: Point | null = null;

    styles = {...styles};

    private positionSequence: [number, number][] = [];

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
            this.clearCanvas();
            this.drawTurtle();
            this._ctx.beginPath();
            this._ctx.moveTo(x,y);
        }
    }

    connect(ctx: CanvasRenderingContext2D, turtle: Turtle) {
        this._ctx = ctx;
        this._turtle = turtle;
        this.reset();

        this._turtle.notifer.subscribe(this._id, (turtle: Turtle, args: EventArgs) => {
            // this.positionSequence.push([turtle.x, turtle.y]);
            // this.render();
            if (!this._turtle || !this._ctx) return;
            console.log(args);
            if (args.event.includes("reset")) {
                // this.reset();
                this._previousLocation = [turtle.x, turtle.y];
            } else if (args.event === "pre-set-angle") {
                this.clearTurtle();
            } else if (args.event === "set-angle") {
                this.clearTurtle();
                this.drawTurtle();
            } else if (args.event === "pre-set-position") {
                this.clearTurtle();
            } else if (args.event === "set-position") {
                this._previousLocation = [turtle.x, turtle.y];
                const toPoint = this.translatePoint([this._turtle.x, this._turtle.y]);
                this._ctx.lineTo(toPoint[0], toPoint[1]);
                this._ctx.stroke();
                this.drawTurtle();
                this._ctx.beginPath();
                this._ctx.moveTo(toPoint[0], toPoint[1]);
            }
        });
    }

    drawTurtle(fillStyle: string | null = null) {
        if (!this._turtle || !this._ctx) return;
        const p1 = this.translatePoint(this._turtle.lookToward(this.styles.turtleLength*2, 0));
        const p2 = this.translatePoint(this._turtle.lookToward(this.styles.turtleLength, 120));
        const p3 = this.translatePoint(this._turtle.lookToward(this.styles.turtleLength, 240));
        const path = new Path2D();
        path.moveTo(p1[0], p1[1]);
        path.lineTo(p2[0], p2[1]);
        path.lineTo(p3[0], p3[1]);
        path.closePath();
        this._ctx.save();
        this._ctx.fillStyle = fillStyle ?? this.styles.fillStyle;
        this._ctx.fill(path);
        this._ctx.restore();
    }

    clearTurtle() {
        if (!this._turtle || !this._ctx) return;
        this.drawTurtle('#fff');
        // const c = this.translatePoint([this._turtle.x, this._turtle.y]);
        // const r = this.styles.turtleLength*2;
        // this._ctx.save();
        // this._ctx.fillStyle = "#fff";
        // this._ctx.strokeStyle = "#fff";
        // const path = new Path2D();
        // path.ellipse(c[0], c[1], r, r, 0, 0, 2 * Math.PI);
        // this._ctx.fill(path);
        // this._ctx.restore();
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
