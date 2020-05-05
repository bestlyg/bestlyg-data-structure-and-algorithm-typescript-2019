import { Person, getPerson } from "../../src/utils/model";
import ISet from "../../src/core/set/ISet";
import { toString } from "../../src/utils/";
import HashSet from "../../src/core/hash/HashSet";
import LinkedHashSet from "../../src/core/hash/LinkedHashSet";

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
    test("contains", () => {
      const set = getNewSet();
      set.add(getPerson(1));
      expect(set.contains(getPerson(1))).toBeTruthy();
      expect(set.contains(getPerson(2))).toBeFalsy();
    });
    test("remove", () => {
      const set = getNewSet();
      set.add(getPerson(1));
      set.remove(getPerson(1));
      expect(set.size()).toBe(0);
    });
    test("traversal", () => {
      const set = getNewSet();
      set.add(getPerson(1));
      let s = "";
      set.traversal((el) => {
        s = toString(el);
        return false;
      });
      expect(s).toBe("Person name:1 age:1");
    });
  });
};
describe("All Set Test", () => {
  run("HashSet", () => {
    return new HashSet<Person>();
  });
  run("LinkedHashSet", () => {
    return new LinkedHashSet<Person>();
  });
});
