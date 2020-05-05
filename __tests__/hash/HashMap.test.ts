import HashMap, { Node } from "../../src/core/hash/HashMap";
import {
  getMyNumber,
  Key,
  MyString,
  getMyString,
  SubKey1,
  SubKey2,
  getKey,
  MyHash,
  getMyHash,
  getPerson
} from "../../src/utils/model";
import { Hash as IHash } from "../../src/types";
function getNewMap(): HashMap<IHash, any> {
  return new HashMap<IHash, any>();
}
function getMap(
  nums: number[] = [55, 87, 56, 74, 96, 22, 62, 20, 70, 68, 90, 50, 99]
): HashMap<IHash, any> {
  const map = getNewMap();
  for (const num of nums) {
    map.put(getKey(num), num);
  }
  return map;
}
describe("HashMap", () => {
  describe("Node", () => {
    test("sibling", () => {
      const node = new Node<number, number>(1, 1);
      expect(node.sibling()).toBeUndefined();
    });
  });
  describe("common test", () => {
    test(" 1", () => {
      const map = getNewMap();
      for (let i = 1; i <= 20; i++) {
        map.put(new Key(i), i);
      }
      for (let i = 5; i <= 7; i++) {
        map.put(new Key(i), i + 5);
      }
      expect(map.size()).toBe(20);
      expect(map.get(new Key(4))).toBe(4);
      expect(map.get(new Key(5))).toBe(10);
      expect(map.get(new Key(6))).toBe(11);
      expect(map.get(new Key(7))).toBe(12);
      expect(map.get(new Key(8))).toBe(8);
    });
    test("2", () => {
      const map = getNewMap();
      map.put(getMyString(123), 3); // 3
      map.put(getMyNumber(10), 4); // 4
      map.put(getMyString(123), 6);
      map.put(getMyNumber(10), 7);
      expect(map.size()).toBe(2);
      expect(map.get(getMyString(123))).toBe(6);
      expect(map.get(getMyNumber(10))).toBe(7);
      expect(map.containsKey(getMyNumber(10))).toBeTruthy();
      expect(map.containsValue(1)).toBeFalsy();
    });
    test("3", () => {
      const map = getNewMap();
      map.put(new MyString("jack"), 1);
      map.put(new MyString("rose"), 2);
      map.put(new MyString("jim"), 3);
      map.put(new MyString("jake"), 4);
      map.remove(new MyString("jack"));
      map.remove(new MyString("jim"));
      for (let i = 1; i <= 10; i++) {
        map.put(new MyString("test" + i), i);
        map.put(new Key(i), i);
      }
      for (let i = 5; i <= 7; i++) {
        expect(map.remove(new Key(i)) == i);
      }
      for (let i = 1; i <= 3; i++) {
        map.put(new Key(i), i + 5);
      }
      expect(map.size()).toBe(19);
      expect(map.get(new Key(1))).toBe(6);
      expect(map.get(new Key(2))).toBe(7);
      expect(map.get(new Key(3))).toBe(8);
      expect(map.get(new Key(4))).toBe(4);
      expect(map.get(new Key(5))).toBeUndefined();
      expect(map.get(new Key(6))).toBeUndefined();
      expect(map.get(new Key(7))).toBeUndefined();
      expect(map.get(new Key(8))).toBe(8);
    });
    test("4", () => {
      const map = getNewMap();
      for (let i = 1; i <= 20; i++) {
        map.put(new SubKey1(i), i);
      }
      map.put(new SubKey2(1), 5);
      expect(map.get(new SubKey1(1))).toBe(5);
      expect(map.get(new SubKey2(1))).toBe(5);
      expect(map.size()).toBe(20);
    });
  });
  test("size", () => {
    const map = getNewMap();
    expect(map.size()).toBe(0);
    map.put(getMyNumber(1), 1);
    expect(map.size()).toBe(1);
    map.remove(getMyNumber(1));
    expect(map.size()).toBe(0);
  });
  test("isEmpty", () => {
    const map = getNewMap();
    expect(map.isEmpty()).toBeTruthy();
    map.put(getKey(1), 1);
    expect(map.isEmpty()).toBeFalsy();
    map.remove(getKey(1));
    expect(map.isEmpty()).toBeTruthy();
  });
  test("clear", () => {
    const map = getNewMap();
    map.put(getKey(1), 1);
    map.clear();
    expect(map.isEmpty()).toBeTruthy();
    expect(map.size()).toBe(0);
    map.clear();
    expect(map.isEmpty()).toBeTruthy();
  });
  test("traversal", () => {
    const map = getNewMap();
    let err = "";
    try {
      map.traversal((k: IHash, v: number) => {
        console.log(k, v);
        return false;
      });
      for (let i = 0; i < 10; i++) {
        map.put(getKey(i), i);
      }
      map.traversal((k: IHash, v: number) => {
        console.log(k, v);
        if (k === getKey(9)) return true;
        return false;
      });
    } catch (error) {
      err = error;
    }
    expect(err).toBe("");
  });
  test("successor", () => {
    const map = getMap([1, 100, 69, 65, 84, 83, 54, 10]);
    const node = map.getNode(getKey(65)) as Node<IHash, any>;
    expect(map.successor(node).key).toBe(getKey(69));
  });
  describe("get", () => {
    test("no key", () => {
      const map = getNewMap();
      map.put(getKey(1), 1);
      expect(map.get(getKey(3))).toBeUndefined();
    });
    test("has key", () => {
      const map = getNewMap();
      map.put(getKey(1), 1);
      expect(map.get(getKey(1))).toBe(1);
      map.put(getKey(1), 2);
      expect(map.get(getKey(1))).toBe(2);
    });
  });
  test("containsKey", () => {
    const map = getNewMap();
    map.put(getKey(1), 1);
    expect(map.containsKey(getKey(1))).toBeTruthy();
    expect(map.containsKey(getKey(2))).toBeFalsy();
  });
  test("containsValue", () => {
    let map = getNewMap();
    expect(map.containsValue(1)).toBeFalsy();
    map = getMap();
    expect(map.containsValue(99)).toBeTruthy();
    expect(map.containsValue(101)).toBeFalsy();
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
    for (const num of nums) map.remove(getKey(num));
    expect(map.size()).toBe(0);
  });
  test("print", () => {
    const map = getNewMap();
    let err = "";
    try {
      map.print();
      map.put(getKey(1), 1);
      map.put(getKey(2), 1);
      map.put(getKey(3), 1);
      map.print();
    } catch (error) {
      err = error;
    }
    expect(err).toBe("");
  });
  test("node", () => {
    const map = getNewMap();
    const nums = [55, 87, 56, 74, 96, 22, 62, 20, 70, 68, 90, 50, 99];
    for (const num of nums) map.put(getPerson(num), num);
    expect((map.getNode(getPerson(50)) as Node<IHash, any>).value).toBe(50);
    expect((map.getNode(getPerson(99)) as Node<IHash, any>).value).toBe(99);
    map.clear();
    for (const num of nums) map.put(getMyHash(num), num);
    expect((map.getNode(getMyHash(99)) as Node<IHash, any>).value).toBe(99);
  });
  test("moveNode", () => {
    const map = getNewMap();
    for (let i = 0; i < 100; i++) map.put(getKey(i), i);
    expect(map.size()).toBe(100);
  });
  describe("put", () => {
    test("can not compare", () => {
      const map = new HashMap<MyHash, number>();
      for (let i = 0; i < 100; i++) map.put(getMyHash(i), i);
      expect(map.size()).toBe(100);
    });
    test("root === undefined", () => {
      const map = getNewMap();
      map.put(getMyNumber(1), 1);
    });
    test("root", () => {
      const map = getNewMap();
      map.put(getKey(1), 1);
      expect(map.get(getKey(1))).toBe(1);
    });
    test("parent is black", () => {
      const map = getMap([50]);
      map.put(getKey(10), 10);
      expect(map.size()).toBe(2);
    });
    describe("parent is red", () => {
      test("RR", () => {
        const map = getMap();
        map.put(getKey(60), 69);
        expect(map.size()).toBe(14);
      });
      test("RL", () => {
        const map = getMap();
        map.put(getKey(60), 67);
        expect(map.size()).toBe(14);
      });
      test("LL", () => {
        const map = getMap();
        map.put(getKey(30), 40);
        expect(map.size()).toBe(14);
      });
      test("LR", () => {
        const map = getMap();
        map.put(getKey(30), 52);
        expect(map.size()).toBe(14);
      });
    });
  });
  describe("remove", () => {
    test("remove root", () => {
      const map = getNewMap();
      map.put(getMyNumber(1), 1);
      map.remove(getMyNumber(1));
      expect(map.size()).toBe(0);
    });
    test("map is red", () => {
      const map = getMap();
      map.remove(getKey(99));
      expect(map.size()).toBe(12);
    });
    describe("map has one child", () => {
      test("in left", () => {
        const map = getMap();
        map.remove(getKey(55));
        expect(map.size()).toBe(12);
      });
      test("in right", () => {
        const map = getMap();
        map.remove(getKey(62));
        expect(map.size()).toBe(12);
      });
    });
    describe("map in left", () => {
      test("sibling is red", () => {
        const map = getMap([84, 23, 66, 52, 57, 79, 69, 72, 55, 58, 59]);
        map.remove(getKey(23));
        expect(map.size()).toBe(10);
      });
      test("sibling is black , sibling has no leaf , parent is black", () => {
        const map = getMap([84, 23, 66, 52]);
        map.remove(getKey(52));
        map.remove(getKey(23));
        expect(map.size()).toBe(2);
      });
      test("sibling is black , sibling has one leaf in right", () => {
        const map = getMap([68, 11, 62, 75, 83, 36, 22, 5, 99]);
        map.remove(getKey(68));
        expect(map.size()).toBe(8);
      });
    });
    describe("map in right", () => {
      test("sibling is red", () => {
        const map = getMap([84, 23, 66, 52, 57, 79, 26, 69, 72, 22, 27]);
        map.remove(getKey(57));
        expect(map.size()).toBe(10);
      });
      test("sibling is black , sibling has no leaf", () => {
        const map = getMap([74, 56, 25, 79, 69, 4, 41, 72, 26, 89, 97, 48]);
        map.remove(getKey(26));
        map.remove(getKey(48));
        map.remove(getKey(41));
        expect(map.size()).toBe(9);
      });
      test("sibling is black , sibling has no leaf , parent is black", () => {
        const map = getMap([84, 23, 66, 52]);
        map.remove(getKey(52));
        map.remove(getKey(84));
        expect(map.size()).toBe(2);
      });
      test("sibling is black , sibling has one leaf in right", () => {
        const map = getMap([68, 11, 62, 75, 83, 36, 22, 5, 99]);
        map.remove(getKey(36));
        expect(map.size()).toBe(8);
      });
    });
  });
});
