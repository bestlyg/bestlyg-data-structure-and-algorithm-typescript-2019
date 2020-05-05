import {
  same,
  random,
  ascOrder,
  descOrder,
  copy,
  isSame,
  isAscOrder,
  isDescOrder,
  print
} from "../../src/utils/Arrays";

describe("Arrays", () => {
  describe("random", () => {
    test("common", () => {
      const arr = random(10, 0, 10);
      for (const num of arr) {
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThanOrEqual(10);
      }
    });
    test("error", () => {
      try {
        const arr = random(-1, 0, 1);
      } catch (error) {
        expect(error.toString()).toBe("Error: count > 0 , min < max");
      }
      try {
        const arr = random(2, 6, 1);
      } catch (error) {
        expect(error.toString()).toBe("Error: count > 0 , min < max");
      }
    });
  });
  describe("same", () => {
    test("common", () => {
      const array = same(3, 0);
      expect(array).toStrictEqual([0, 0, 0]);
    });
    test("error", () => {
      try {
        const arr = same(-1);
      } catch (error) {
        expect(error.toString()).toBe("Error: count > 0");
      }
    });
  });
  describe("ascOrder", () => {
    test("common", () => {
      const arr = ascOrder(0, 10);
      for (let i = 0; i <= 10; i++) expect(arr[i]).toBe(i);
    });
    test("error", () => {
      try {
        const arr = ascOrder(1, 0);
      } catch (error) {
        expect(error.toString()).toBe("Error: min < max");
      }
    });
  });
  describe("descOrder", () => {
    test("common", () => {
      const arr = descOrder(0, 10);
      for (let i = 10; i >= 0; i--) expect(arr[10 - i]).toBe(i);
    });
    test("error", () => {
      try {
        const arr = descOrder(1, 0);
      } catch (error) {
        expect(error.toString()).toBe("Error: min < max");
      }
    });
  });
  test("copy", () => {
    const arr1 = [1, 2, 3];
    const arr2 = copy(arr1);
    expect(isSame(arr1, arr2)).toBeTruthy();
  });
  test("isSame", () => {
    const arr1 = [];
    const arr2 = [1];
    expect(isSame(arr1, arr2)).toBeFalsy();
    const arr3 = [2];
    const arr4 = [1];
    expect(isSame(arr3, arr4)).toBeFalsy();
  });
  test("isAscOrder isDescOrder", () => {
    const arr = [];
    expect(isAscOrder(arr)).toBeFalsy();
    expect(isDescOrder(arr)).toBeFalsy();
    const arr1 = ascOrder(0, 100);
    expect(isAscOrder(arr1)).toBeTruthy();
    expect(isDescOrder(arr1)).toBeFalsy();
    const arr2 = descOrder(0, 100);
    expect(isAscOrder(arr2)).toBeFalsy();
    expect(isDescOrder(arr2)).toBeTruthy();
  });
  test("print", () => {
    const arr = same(10);
    let e = "";
    try {
      print(arr);
    } catch (error) {
      e = error.toString();
    }
    expect(e).toBe("");
  });
});
