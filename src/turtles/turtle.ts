import { Notifier } from "../util/notifier";

type Degrees = number;

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

    moveForward(d: number) {
        const dx = d * Math.cos(this.radians + Math.PI / 2);
        const dy = d * Math.sin(this.radians + Math.PI / 2);
        this.setPosition(this.x + dx, this.y + dy);
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

    private setPosition(x: number, y: number): void {
        this._x = x;
        this._y = y;
        this.notifer.notify(this, "set-position");
    }

    private setAngle(a: Degrees): void {
        this._a = a;
        this.notifer.notify(this, "set-angle");
    }
}
