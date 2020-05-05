import { Person, getPerson } from "../../src/utils/model";
import RedBlackTree from "../../src/core/tree/RedBlackTree";

function testCompare(p1: Person, p2: Person): number {
  return p1.age - p2.age;
}
function getNewRBT(
  fn: (p1: Person, p2: Person) => number = testCompare
): RedBlackTree<Person> {
  return new RedBlackTree<Person>(fn);
}
function levelOrderToString(tree: RedBlackTree<Person>): string {
  let string = "";
  tree.levelOrder((el: Person) => {
    string += el.age + " ";
    return false;
  });
  return string;
}
function getRBT(
  nums: number[] = [55, 87, 56, 74, 96, 22, 62, 20, 70, 68, 90, 50, 99]
): RedBlackTree<Person> {
  const tree = getNewRBT();
  for (const num of nums) {
    tree.add(getPerson(num));
  }
  return tree;
}
describe("RedBlackTree", () => {
  describe("add", () => {
    test("parent is black", () => {
      const tree = getRBT();
      tree.add(getPerson(19));
      expect(levelOrderToString(tree)).toBe(
        "70 56 87 22 62 74 96 20 55 68 90 99 19 50 "
      );
    });
    test("overflow", () => {
      const tree = getRBT();
      tree.add(getPerson(100));
      expect(levelOrderToString(tree)).toBe(
        "70 56 87 22 62 74 96 20 55 68 90 99 50 100 "
      );
    });
    test("LR", () => {
      const tree = getRBT();
      tree.add(getPerson(69));
      expect(levelOrderToString(tree)).toBe(
        "70 56 87 22 68 74 96 20 55 62 69 90 99 50 "
      );
    });
  });
  describe("remove", () => {
    test("remove red", () => {
      const tree = getRBT();
      tree.remove(getPerson(99));
      expect(levelOrderToString(tree)).toBe(
        "70 56 87 22 62 74 96 20 55 68 90 50 "
      );
    });
    test("sibling has left red", () => {
      const tree = getRBT();
      tree.remove(getPerson(20));
      expect(levelOrderToString(tree)).toBe(
        "70 56 87 50 62 74 96 22 55 68 90 99 "
      );
    });
    describe("tree in left", () => {
      test("sibling is red", () => {
        const tree = getRBT([84, 23, 66, 52, 57, 79, 69, 72, 55, 58, 59]);
        tree.remove(getPerson(23));
        expect(levelOrderToString(tree)).toBe("66 57 79 52 58 69 84 55 59 72 ");
      });
      test("sibling is black , sibling has no leaf , parent is black", () => {
        const tree = getRBT([84, 23, 66, 52]);
        tree.remove(getPerson(52));
        tree.remove(getPerson(23));
        expect(levelOrderToString(tree)).toBe("66 84 ");
      });
      test("sibling is black , sibling has one leaf in right", () => {
        const tree = getRBT([68, 11, 62, 75, 83, 36, 22, 5, 99]);
        tree.remove(getPerson(68));
        expect(levelOrderToString(tree)).toBe("62 22 83 11 36 75 99 5 ");
      });
    });
    describe("tree in right", () => {
      test("sibling is red", () => {
        const tree = getRBT([84, 23, 66, 52, 57, 26, 79, 26, 69, 72, 22, 27]);
        tree.remove(getPerson(57));
        expect(levelOrderToString(tree)).toBe("66 23 79 22 27 69 84 26 52 72 ");
      });
      test("sibling is black , sibling has no leaf", () => {
        const tree = getRBT([74, 56, 25, 79, 69, 4, 41, 72, 26, 89, 97, 48]);
        tree.remove(getPerson(26));
        tree.remove(getPerson(48));
        tree.remove(getPerson(41));
        expect(levelOrderToString(tree)).toBe("56 25 74 4 69 89 72 79 97 ");
      });
      test("sibling is black , sibling has no leaf , parent is black", () => {
        const tree = getRBT([84, 23, 66, 52]);
        tree.remove(getPerson(52));
        tree.remove(getPerson(84));
        expect(levelOrderToString(tree)).toBe("66 23 ");
      });
      test("sibling is black , sibling has one leaf in right", () => {
        const tree = getRBT([68, 11, 62, 75, 83, 36, 22, 5, 99]);
        tree.remove(getPerson(36));
        expect(levelOrderToString(tree)).toBe("62 11 75 5 22 68 83 99 ");
      });
    });
  });
});
