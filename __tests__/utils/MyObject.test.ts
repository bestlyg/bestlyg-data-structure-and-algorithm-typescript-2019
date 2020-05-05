import { MyObject, getMyObject } from "../../src/utils/model";

describe("MyObject", () => {
  test("MyObject", () => {
    const obj = getMyObject(1);
    const obj2 = getMyObject(1);
    expect(obj === obj2).toBe(true);
    expect(obj.value).toBe(1);
    const p = new MyObject(1);
    expect(obj.value === p.value).toBe(true);
  });
});
