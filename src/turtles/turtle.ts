type Degrees = number;
type PositionChangeEventHandler = (sender: Turtle, data: any) => void;
type AngleChangeEventHandler = (sender: Turtle, data: any) => void;

const toRad = (d: Degrees) => d / 180 * Math.PI;

export class Turtle {
  x: number = 0;
  y: number = 0;
  a: Degrees = 0;

  public get radians(): number { return toRad(this.a); }

  moveTo(x: number, y: number): void {
    this.setPosition(x, y);
  }

  moveForward(d: number) {
    const dx = d * Math.cos(this.radians + Math.PI / 2);
    const dy = d * Math.sin(this.radians + Math.PI / 2);
    this.setPosition(this.x + dx, this.y + dy);
  }

  turnTo(a: Degrees): void {
    this.setAngle(a % 360);
  }

  turn(da: Degrees): void {
    this.setAngle(this.a + da);
  }

  addPositionChangeEventHandler(id: string, handler: PositionChangeEventHandler) {
    this.onPositionChangeMap.set(id, handler);
  }

  addAngleChangeEventHandler(id: string, handler: AngleChangeEventHandler) {
    this.onAngleChangeMap.set(id, handler);
  }

  removePositionChangeEventHandler(id: string) {
    this.onPositionChangeMap.delete(id);
  }

  removeAngleChangeEventHandler(id: string) {
    this.onAngleChangeMap.delete(id);
  }

  private setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
    for (let [id, cb] of Array.from(this.onPositionChangeMap.entries())) {
      cb(this, { id });
    }
  }

  private setAngle(a: Degrees): void {
    this.a = a;
    for (let [id, cb] of Array.from(this.onAngleChangeMap.entries())) {
      cb(this, { id });
    }
  }

  private onPositionChangeMap: Map<string, PositionChangeEventHandler> = new Map();
  private onAngleChangeMap: Map<string, AngleChangeEventHandler> = new Map();
}
