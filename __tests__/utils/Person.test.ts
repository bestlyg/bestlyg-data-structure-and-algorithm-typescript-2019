import { Person, getPerson } from "../../src/utils/model";

describe("Person", () => {
  test("Person", () => {
    const obj = getPerson(1);
    const obj2 = getPerson(1);
    expect(obj === obj2).toBe(true);
    expect(obj.age).toBe(1);
    expect(obj.name).toBe("1");
    const p = new Person("1", 1);
    expect(obj.age === p.age).toBe(true);
    expect(obj.name === p.name).toBe(true);
  });
  test("compareTo", () => {
    const p1 = getPerson(1);
    const p2 = getPerson(2);
    expect(p1.compareTo(p2)).toBe(-1);
  });
  test("hashCode", () => {
    const obj = getPerson(1);
    expect(obj.hashCode()).toBe(80);
  });
  test("equals", () => {
    const obj = getPerson(1);
    const obj2 = getPerson(1);
    expect(obj.equals(obj2)).toBeTruthy();
    const obj3 = getPerson(3);
    expect(obj.equals(obj3)).toBeFalsy();
    expect(obj.equals(null)).toBeFalsy();
    const obj4 = new Person("1", 1);
    expect(obj.equals(obj4)).toBeTruthy();
  });
});
