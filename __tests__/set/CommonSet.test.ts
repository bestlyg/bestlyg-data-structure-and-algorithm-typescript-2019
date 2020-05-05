import { Person, getPerson } from "../../src/utils/model";
import ISet from "../../src/core/set/ISet";
import ListSet from "../../src/core/set/ListSet";
import TreeSet from "../../src/core/set/TreeSet";
import TreeSet2 from "../../src/core/set/TreeSet2";

const run = (name: string, getNewSet: () => ISet<Person>): void => {
  describe(name, () => {
    test("size", () => {
      const set = getNewSet();
      set.add(getPerson(1));
      set.add(getPerson(2));
      expect(set.size()).toBe(2);
      set.add(getPerson(2));
      expect(set.size()).toBe(2);
    });
    test("isEmpty", () => {
      const set = getNewSet();
      expect(set.isEmpty()).toBe(true);
      set.add(getPerson(1));
      expect(set.isEmpty()).toBe(false);
    });
    test("clear", () => {
      const set = getNewSet();
      set.add(getPerson(1));
      set.add(getPerson(2));
      set.clear();
      expect(set.isEmpty()).toBe(true);
    });
    describe("remove", () => {
      test("element in set", () => {
        const set = getNewSet();
        for (let i = 0; i < 15; i++) {
          set.add(getPerson(i));
        }
        for (let i = 8; i < 12; i++) {
          set.add(getPerson(i));
        }
        for (let i = 0; i < 15; i++) {
          set.remove(getPerson(i));
        }
        expect(set.isEmpty()).toBe(true);
      });
      test("element not in set", () => {
        const set = getNewSet();
        for (let i = 0; i < 15; i++) {
          set.add(getPerson(i));
        }
        for (let i = 8; i < 12; i++) {
          set.add(getPerson(i));
        }
        for (let i = 15; i < 20; i++) {
          set.remove(getPerson(i));
        }
        expect(set.size()).toBe(15);
      });
    });

    test("contains", () => {
      const set = getNewSet();
      for (let i = 0; i < 15; i++) {
        set.add(getPerson(i));
      }
      expect(set.contains(getPerson(12))).toBe(true);
      expect(set.contains(getPerson(100))).toBe(false);
    });
    test("traversal", () => {
      const set = getNewSet();
      for (let i = 0; i < 15; i++) {
        set.add(getPerson(i));
      }
      let string = "";
      set.traversal((p) => {
        string += p.age + " ";
        if (p.age === 12) return true;
        return false;
      });
      expect(string).toBe("0 1 2 3 4 5 6 7 8 9 10 11 12 ");
    });
  });
};
describe("All Set Test", () => {
  run("ListSet", () => {
    return new ListSet<Person>();
  });
  run("TreeSet", () => {
    return new TreeSet<Person>((e1, e2) => e1.age - e2.age);
  });
  run("TreeSet2", () => {
    return new TreeSet2<Person>((e1, e2) => e1.age - e2.age);
  });
});
