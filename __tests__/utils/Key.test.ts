import { Key, getKey } from "../../src/utils/model";

describe("Key", () => {
  test("Key", () => {
    const obj = getKey(1);
    const obj2 = getKey(1);
    expect(obj === obj2).toBe(true);
    expect(obj.value).toBe(1);
    const p = new Key(1);
    expect(obj.value === p.value).toBe(true);
  });
  const obj = getKey(1);
  const obj2 = getKey(10);
  test("hashCode", () => {
    expect(obj.hashCode()).toBe(0);
    expect(obj2.hashCode()).toBe(0);
  });
  test("equals", () => {
    const obj3 = getKey(3);
    const obj1_1 = getKey(1);
    expect(obj.equals(obj1_1)).toBe(true);
    expect(obj.equals(obj3)).toBe(false);
    expect(obj.equals(null)).toBe(false);
  });
  test("toString", () => {
    expect(obj.toString()).toBe("Key value:1");
    expect(obj2.toString()).toBe("Key value:10");
  });
});
