import { getSubKey1, getSubKey2, getPerson } from "../../src/utils/model";
describe("SubKey", () => {
  describe("SubKey1", () => {
    const s1_1 = getSubKey1(1);
    const s2_1 = getSubKey2(1);
    test("equals", () => {
      const s1_1_1 = getSubKey1(1);
      expect(s1_1.equals(s1_1)).toBe(true);
      expect(s1_1.equals(s1_1_1)).toBe(true);
      expect(s1_1.equals(s2_1)).toBe(true);
      expect(s1_1.equals(null)).toBe(false);
      expect(s1_1.equals(getPerson(1))).toBe(false);
    });
  });
  describe("SubKey2", () => {
    const s1_1 = getSubKey2(1);
    const s2_1 = getSubKey1(1);
    test("equals", () => {
      const s1_1_1 = getSubKey2(1);
      expect(s1_1.equals(s1_1)).toBe(true);
      expect(s1_1.equals(s1_1_1)).toBe(true);
      expect(s1_1.equals(s2_1)).toBe(true);
      expect(s1_1.equals(null)).toBe(false);
      expect(s1_1.equals(getPerson(1))).toBe(false);
    });
  });
});
