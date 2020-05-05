import { getMyString } from "../../src/utils/model";

describe("MyString", () => {
  test("get number", () => {
    const obj = getMyString(1);
    expect(obj.string).toBe("1");
  });
  test("compareTo", () => {
    const p1 = getMyString(1);
    const p2 = getMyString(2);
    expect(p1.compareTo(p2)).toBe(-1);
  });
  test("equals", () => {
    const n1 = getMyString(1);
    const n2 = getMyString(1);
    const n3 = getMyString(3);
    expect(n1.equals(n2)).toBeTruthy();
    expect(n1.equals(null)).toBeFalsy();
    expect(n1.equals(n3)).toBeFalsy();
  });
  test("toString", () => {
    const n1 = getMyString(1);
    expect(n1.toString()).toBe("String value:1");
  });
});
