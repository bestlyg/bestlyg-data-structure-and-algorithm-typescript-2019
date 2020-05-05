import RedBlackNode from "../../src/core/tree/RedBlackNode";
import {
  black,
  isBlack,
  isRed,
  red,
  colorOf,
  color,
  ColorEnum
} from "../../src/utils/color";

describe("RedBlackNode", () => {
  const node = new RedBlackNode<number>(1);
  const node2 = new RedBlackNode<number>(1);
  describe("Color", () => {
    black(node2);
    test("red", () => {
      expect(colorOf(node)).toBe(ColorEnum.RED);
      black(node);
      red(node);
      expect(colorOf(node)).toBe(ColorEnum.RED);
    });
    test("black", () => {
      expect(colorOf(node2)).toBe(ColorEnum.BLACK);
    });
    test("isBlack", () => {
      expect(isBlack(node2)).toBe(true);
      expect(isBlack(node)).toBe(false);
    });
    test("isRed", () => {
      expect(isRed(node2)).toBe(false);
      expect(isRed(node)).toBe(true);
    });
    test("undefined", () => {
      const node3 = undefined;
      expect(colorOf(node3)).toBe(ColorEnum.BLACK);
      expect(color(node3, ColorEnum.BLACK)).toBeUndefined();
    });
  });
  test("toString", () => {
    expect(String(node)).toBe("R_1");
    expect(String(node2)).toBe("B_1");
  });
});
