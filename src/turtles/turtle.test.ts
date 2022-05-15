import { Turtle } from "./turtle";

it('moves back to start', () => {
    let t = new Turtle();
    t.moveForward(1);
    t.turn(90);
    t.moveForward(1);
    t.turn(90);
    t.moveForward(1);
    t.turn(90);
    t.moveForward(1);
    expect(t.x).toBeCloseTo(0);
    expect(t.y).toBeCloseTo(0);
})