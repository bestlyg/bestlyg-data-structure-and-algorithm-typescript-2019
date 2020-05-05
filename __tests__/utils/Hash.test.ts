import { getMyHash } from "../../src/utils/model";

describe("Hash", () => {
  test("equals", () => {
    const obj = getMyHash(1);
    const obj3 = getMyHash(3);
    const obj1_1 = getMyHash(1);
    expect(obj.equals(obj1_1)).toBe(true);
    expect(obj.equals(obj3)).toBe(false);
    expect(obj.equals(null)).toBe(false);
  });
  test("toString", () => {
    const obj = getMyHash(1);
    expect(obj.toString()).toBe(`Hash_number:1`);
  });
});
