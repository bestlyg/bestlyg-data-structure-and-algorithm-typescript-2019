import { getMyNumber } from "../../src/utils/model";

describe("MyNumber", () => {
  test("get number", () => {
    const obj = getMyNumber(1);
    expect(obj.number).toBe(1);
  });
  test("compareTo", () => {
    const p1 = getMyNumber(1);
    const p2 = getMyNumber(2);
    expect(p1.compareTo(p2)).toBe(-1);
  });
  test("equals", () => {
    const n1 = getMyNumber(1);
    const n2 = getMyNumber(1);
    const n3 = getMyNumber(3);
    expect(n1.equals(n2)).toBeTruthy();
    expect(n1.equals(null)).toBeFalsy();
    expect(n1.equals(n3)).toBeFalsy();
  });
  test("toString", () => {
    const n1 = getMyNumber(1);
    expect(n1.toString()).toBe("Number value:1");
  });
});
