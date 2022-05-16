import { turtleLex } from "./turtleLex";

const testString1 = "forward left right r r f";

it(`lexes "${testString1}"`, () => {
    const lexemes = turtleLex(testString1);
    expect(lexemes.length).toBe(6);
    expect(lexemes[0].position).toBe(0);
    expect(lexemes[0].value).toBe("forward");
    expect(lexemes[1].position).toBe(8);
    expect(lexemes[1].value).toBe("left");
    expect(lexemes[5].position).toBe(testString1.length - 1);
    expect(lexemes[5].value).toBe("f");
});