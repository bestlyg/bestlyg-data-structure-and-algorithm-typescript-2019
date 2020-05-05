import { Person, getPerson } from "../../src/utils/model";
import AVLTree from "../../src/core/tree/AVLTree";
function testCompare(p1: Person, p2: Person): number {
  return p1.age - p2.age;
}
function getNewAVLT(
  fn: (p1: Person, p2: Person) => number = testCompare
): AVLTree<Person> {
  return new AVLTree<Person>(fn);
}
function levelOrderToString(tree: AVLTree<Person>): string {
  let string = "";
  tree.levelOrder((el: Person) => {
    string += el.age + " ";
    return false;
  });
  return string;
}
function getAVLT(
  nums: number[] = [79, 91, 14, 51, 10, 11, 95, 62, 84, 74, 19, 9, 18, 12]
): AVLTree<Person> {
  const tree = getNewAVLT();
  for (const num of nums) {
    tree.add(getPerson(num));
  }
  return tree;
}
describe("AVLTree", () => {
  test("common test1", () => {
    const tree = getNewAVLT();
    expect(levelOrderToString(tree)).toBe("");
  });
  test("common test2", () => {
    const tree = getAVLT();
    expect(levelOrderToString(tree)).toBe(
      "62 14 79 10 19 74 91 9 11 18 51 84 95 12 "
    );
  });
  describe("add", () => {
    test("LL", () => {
      const tree = getAVLT([56, 40, 39]);
      expect(levelOrderToString(tree)).toBe("40 39 56 ");
    });
    test("LR", () => {
      const tree = getAVLT([56, 40, 55]);
      expect(levelOrderToString(tree)).toBe("55 40 56 ");
    });
    test("RR", () => {
      const tree = getAVLT([56, 78, 79]);
      expect(levelOrderToString(tree)).toBe("78 56 79 ");
    });
    test("RL", () => {
      const tree = getAVLT([56, 78, 57]);
      expect(levelOrderToString(tree)).toBe("57 56 78 ");
    });
  });
  describe("add", () => {
    test("no break", () => {
      const tree = getAVLT();
      tree.remove(getPerson(18));
      expect(levelOrderToString(tree)).toBe(
        "62 14 79 10 19 74 91 9 11 51 84 95 12 "
      );
    });
    test("break", () => {
      const tree = getAVLT();
      tree.remove(getPerson(74));
      expect(levelOrderToString(tree)).toBe(
        "62 14 91 10 19 79 95 9 11 18 51 84 12 "
      );
    });
  });
});
