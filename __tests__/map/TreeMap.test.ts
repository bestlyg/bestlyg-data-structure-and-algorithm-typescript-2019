import TreeMap, { Node } from "../../src/core/map/TreeMap";
import { Person, getPerson } from "../../src/utils/model";
function testCompare(e1: number, e2: number): number {
  return e1 - e2;
}
function getNewMap(
  fn: (e1: number, e2: number) => number = testCompare
): TreeMap<number, Person> {
  return new TreeMap<number, Person>(fn);
}
function getMap(
  nums: number[] = [55, 87, 56, 74, 96, 22, 62, 20, 70, 68, 90, 50, 99]
): TreeMap<number, Person> {
  const map = getNewMap();
  for (const num of nums) {
    map.put(num, getPerson(num));
  }
  return map;
}
describe("TreeMap", () => {
  test("size", () => {
    const map = getNewMap();
    expect(map.size()).toBe(0);
    map.put(1, getPerson(1));
    expect(map.size()).toBe(1);
  });
  test("isEmpty", () => {
    const map = getNewMap();
    expect(map.isEmpty()).toBe(true);
    map.put(1, getPerson(1));
    expect(map.isEmpty()).toBe(false);
  });
  test("clear", () => {
    const map = getMap([1, 100, 69, 65, 84, 83, 54, 10]);
    map.clear();
    expect(map.isEmpty()).toBe(true);
  });
  test("successor", () => {
    const map = getMap([1, 100, 69, 65, 84, 83, 54, 10]);
    const node = map.getNode(65) as Node<number, Person>;
    expect(map.successor(node).key).toBe(69);
  });
  describe("get", () => {
    test("no key", () => {
      const map = getNewMap();
      map.put(1, getPerson(1));
      expect(map.get(3)).toBeUndefined();
    });
    test("has key", () => {
      const map = getNewMap();
      map.put(1, getPerson(1));
      expect(map.get(1)).toBe(getPerson(1));
      map.put(1, getPerson(2));
      expect(map.get(1)).toBe(getPerson(2));
    });
  });
  test("containsKey", () => {
    const map = getNewMap();
    map.put(1, getPerson(1));
    expect(map.containsKey(1)).toBe(true);
    expect(map.containsKey(2)).toBe(false);
  });
  test("containsValue", () => {
    const map = getNewMap();
    expect(map.containsValue(getPerson(2))).toBe(false);
    map.put(1, getPerson(1));
    expect(map.containsValue(getPerson(1))).toBe(true);
    expect(map.containsValue(getPerson(2))).toBe(false);
  });
  test("common put and remove", () => {
    const nums = [
      79,
      2,
      64,
      63,
      85,
      91,
      71,
      40,
      7,
      94,
      78,
      47,
      43,
      68,
      46,
      13,
      95,
      69,
      28,
      31,
      89,
      85,
      54,
      43,
      52,
      34,
      2,
      13,
      40
    ];
    const map = getMap(nums);
    for (const num of nums) map.remove(num);
    expect(map.size()).toBe(0);
  });
  describe("put", () => {
    test("root", () => {
      const map = getNewMap();
      map.put(1, getPerson(1));
      expect(map.get(1)).toBe(getPerson(1));
    });
    test("parent is black", () => {
      const map = getMap([50]);
      map.put(10, getPerson(10));
      expect(map.size()).toBe(2);
    });
    describe("parent is red", () => {
      test("RR", () => {
        const map = getMap();
        map.put(60, getPerson(69));
        expect(map.size()).toBe(14);
      });
      test("RL", () => {
        const map = getMap();
        map.put(60, getPerson(67));
        expect(map.size()).toBe(14);
      });
      test("LL", () => {
        const map = getMap();
        map.put(30, getPerson(40));
        expect(map.size()).toBe(14);
      });
      test("LR", () => {
        const map = getMap();
        map.put(30, getPerson(52));
        expect(map.size()).toBe(14);
      });
    });
  });
  describe("remove", () => {
    test("map is red", () => {
      const map = getMap();
      map.remove(99);
      expect(map.size()).toBe(12);
    });
    describe("map has one child", () => {
      test("in left", () => {
        const map = getMap();
        map.remove(55);
        expect(map.size()).toBe(12);
      });
      test("in right", () => {
        const map = getMap();
        map.remove(62);
        expect(map.size()).toBe(12);
      });
    });

    describe("map in left", () => {
      test("sibling is red", () => {
        const map = getMap([84, 23, 66, 52, 57, 79, 69, 72, 55, 58, 59]);
        map.remove(23);
        expect(map.size()).toBe(10);
      });
      test("sibling is black , sibling has no leaf , parent is black", () => {
        const map = getMap([84, 23, 66, 52]);
        map.remove(52);
        map.remove(23);
        expect(map.size()).toBe(2);
      });
      test("sibling is black , sibling has one leaf in right", () => {
        const map = getMap([68, 11, 62, 75, 83, 36, 22, 5, 99]);
        map.remove(68);
        expect(map.size()).toBe(8);
      });
    });
    describe("map in right", () => {
      test("sibling is red", () => {
        const map = getMap([84, 23, 66, 52, 57, 79, 26, 69, 72, 22, 27]);
        map.remove(57);
        expect(map.size()).toBe(10);
      });
      test("sibling is black , sibling has no leaf", () => {
        const map = getMap([74, 56, 25, 79, 69, 4, 41, 72, 26, 89, 97, 48]);
        map.remove(26);
        map.remove(48);
        map.remove(41);
        expect(map.size()).toBe(9);
      });
      test("sibling is black , sibling has no leaf , parent is black", () => {
        const map = getMap([84, 23, 66, 52]);
        map.remove(52);
        map.remove(84);
        expect(map.size()).toBe(2);
      });
      test("sibling is black , sibling has one leaf in right", () => {
        const map = getMap([68, 11, 62, 75, 83, 36, 22, 5, 99]);
        map.remove(36);
        expect(map.size()).toBe(8);
      });
    });
  });
  describe("node", () => {
    const node = new Node<number, number>(1, 1);
    test("sibling undefined", () => {
      expect(node.sibling()).toBeUndefined();
    });
    test("toString", () => {
      const map = getMap([1, 100, 69]);
      const node1 = map.getNode(69);
      expect(String(node1)).toBe("B_Key:69,Value:Person name:69 age:69");
      const node2 = map.getNode(1);
      expect(String(node2)).toBe("R_Key:1,Value:Person name:1 age:1");
    });
  });
});
