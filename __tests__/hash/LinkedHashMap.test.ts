import LinkedHashMap from "../../src/core/hash/LinkedHashMap";
import { Hash as IHash } from "../../src/types";
import { getKey } from "../../src/utils/model";
function getNewMap(): LinkedHashMap<IHash, any> {
  return new LinkedHashMap<IHash, any>();
}
function getMap(
  nums: number[] = [55, 87, 56, 74, 96, 22, 62, 20, 70, 68, 90, 50, 99]
): LinkedHashMap<IHash, any> {
  const map = getNewMap();
  for (const num of nums) {
    map.put(getKey(num), num);
  }
  return map;
}
describe("LinkedHashMap", () => {
  test("clear", () => {
    const map = getNewMap();
    map.put(getKey(1), 1);
    map.clear();
    expect(map.size()).toBe(0);
  });
  test("containsValue", () => {
    const map = getNewMap();
    for (let i = 0; i < 100; i++) {
      map.put(getKey(i), i);
    }
    expect(map.containsValue(1)).toBeTruthy();
    expect(map.containsValue(100)).toBeFalsy();
  });
  test("traversal", () => {
    const map = getMap();
    let err = "";
    try {
      map.traversal((k: IHash, v: any) => {
        console.log(k, v);
        if (v === 99) return true;
        return false;
      });
    } catch (error) {
      err = error;
    }
    expect(err).toBe("");
  });
  describe("remove", () => {
    test("common remove", () => {
      const nums = [43, 28, 24, 1, 97, 27, 9, 40, 85];
      const map = getMap(nums);
      for (const num of nums) {
        map.remove(getKey(num));
      }
      expect(map.isEmpty()).toBeTruthy();
    });
    test("node2.prev !== undefined", () => {
      const map = getMap();
      map.remove(getKey(70));
      expect(map.size()).toBe(12);
    });
    test("node1.prev === undefined", () => {
      const map = getMap([55, 87, 56, 74, 96, 22, 62, 20, 70, 68, 90]);
      map.remove(getKey(22));
      expect(map.size()).toBe(10);
    });
    test("node2.next === undefined", () => {
      const map = getMap([28, 46, 13, 22, 15, 99, 50]);
      map.remove(getKey(50));
      expect(map.size()).toBe(6);
    });
  });
});
