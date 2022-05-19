import { Degrees, Point } from "../util/geometry";
import { Notifier } from "../util/notifier";

const toRad = (d: Degrees) => (d / 180) * Math.PI;

export class Turtle {
    private _a: Degrees = 0;
    private _x: number = 0;
    private _y: number = 0;

    notifer: Notifier<Turtle> = new Notifier();

    public get a() {
        return this._a;
    }
    public get x() {
        return this._x;
    }
    public get y() {
        return this._y;
    }

    public get radians(): number {
        return toRad(this.a);
    }

    reset() {
        this.setPosition(0, 0, "reset-position");
        this.setAngle(0, "reset-angle");
    }

    lookToward(d: number, a: Degrees): Point {
        const angle = toRad(this.a + a);
        const dx = d * Math.cos(angle + Math.PI / 2);
        const dy = d * Math.sin(angle + Math.PI / 2);
        return [this.x + dx, this.y + dy];
    }

    moveForward(d: number) {
        const [x, y] = this.lookToward(d, 0);
        this.setPosition(x, y);
    }

    moveTo(x: number, y: number): void {
        this.setPosition(x, y);
    }

    turn(da: Degrees): void {
        this.setAngle(this.a + da);
    }

    turnTo(a: Degrees): void {
        this.setAngle(a % 360);
    }

    private setPosition(x: number, y: number, event: string = "set-position"): void {
        this.notifer.notify(this, `pre-${event}`);
        this._x = x;
        this._y = y;
        this.notifer.notify(this, event);
    }

    private setAngle(a: Degrees, event: string = "set-angle"): void {
        this.notifer.notify(this, `pre-${event}`);
        this._a = a;
        this.notifer.notify(this, event);
    }
}
