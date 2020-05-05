import AVLTree from "../../src/core/tree/AVLTree";
import BinaryTreesPrinter, {
  BinaryTreesPrintStyle
} from "../../src/utils/BinaryTreesPrinter";
import BinarySearchTree from "../../src/core/tree/BinarySearchTree";
describe("BinaryTreesPrinterPrinter", () => {
  const tree = new AVLTree<number>((num1, num2) => num1 - num2);
  const nums = [74, 56, 14];
  for (const num of nums) {
    tree.add(num);
  }
  test("default", () => {
    expect(BinaryTreesPrinter.printString(tree)).toBe(
      `56_P(undefined)\n       ├─────── R 74_P(56)\n       └─────── L 14_P(56)\n`
    );
  });
  test("preorder", () => {
    expect(
      BinaryTreesPrinter.printString(tree, BinaryTreesPrintStyle.PREORDER)
    ).toBe(
      `56_P(undefined)\n       ├─────── R 74_P(56)\n       └─────── L 14_P(56)\n`
    );
  });
  test("inorder", () => {
    expect(
      BinaryTreesPrinter.printString(tree, BinaryTreesPrintStyle.INORDER)
    ).toBe(``);
  });
  test("postorder", () => {
    expect(
      BinaryTreesPrinter.printString(tree, BinaryTreesPrintStyle.POSTORDER)
    ).toBe(``);
  });
  test("levelOrderSlashes", () => {
    expect(
      BinaryTreesPrinter.printString(
        tree,
        BinaryTreesPrintStyle.LEVEL_ORDER_SLASHES
      )
    ).toBe(``);
  });
  test("levelOrderLines", () => {
    expect(
      BinaryTreesPrinter.printString(
        tree,
        BinaryTreesPrintStyle.LEVEL_ORDER_LINES
      )
    ).toBe(``);
  });
  test("only left", () => {
    const tree = new BinarySearchTree<number>((n1, n2) => n1 - n2);
    tree.add(10);
    tree.add(5);
    expect(BinaryTreesPrinter.printString(tree)).toBe(
      "10_P(undefined)\n       └─────── L 5_P(10)\n"
    );
  });
  test("only right", () => {
    const tree = new BinarySearchTree<number>((n1, n2) => n1 - n2);
    tree.add(10);
    tree.add(15);
    expect(BinaryTreesPrinter.printString(tree)).toBe(
      "10_P(undefined)\n       └─────── R 15_P(10)\n"
    );
  });
  describe("print", () => {
    test("common", () => {
      // const tree = new AVLTree<number>((num1, num2) => num1 - num2);
      // const nums = [74, 56, 14];
      // for (const num of nums) {
      //   tree.add(num);
      // }
      let err = "";
      try {
        BinaryTreesPrinter.print(tree);
        BinaryTreesPrinter.print(tree, BinaryTreesPrintStyle.PREORDER);
      } catch (error) {
        err = error;
      }
      expect(err).toBe("");
    });
    test("no root", () => {
      let err = "";
      const root = new BinarySearchTree<number>((n1, n2) => n1 - n2);
      try {
        BinaryTreesPrinter.print(root);
      } catch (error) {
        err = error;
      }
      expect(err).toBe("");
      expect(BinaryTreesPrinter.printString(root)).toBe("");
    });
  });
});
