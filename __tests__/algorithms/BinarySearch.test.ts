import { ascOrder } from "../../src/utils/Arrays";
import { indexOf, search } from "../../src/core/algorithms/BinarySearch";

describe("BinarySearch", () => {
  test("indexOf", () => {
    const arr = ascOrder(0, 10);
    expect(indexOf(arr, 6)).toBe(6);
    expect(indexOf(arr, -1)).toBe(-1);
    const arr1 = [];
    expect(indexOf(arr1, -1)).toBe(-1);
  });
  test("search", () => {
    const arr = ascOrder(0, 10);
    expect(search(arr, 1)).toBe(2);
    const arr1 = [];
    expect(search(arr1, -1)).toBe(-1);
  });
});
