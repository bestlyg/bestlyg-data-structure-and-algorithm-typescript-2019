import { blank, repeat } from "../utils";
import { BinaryTreesPrinter } from "../types";

export enum BinaryTreesPrintStyle {
  PREORDER,
  INORDER,
  POSTORDER,
  LEVEL_ORDER_SLASHES,
  LEVEL_ORDER_LINES
}
abstract class Printer {
  protected tree: BinaryTreesPrinter;
  constructor(tree: BinaryTreesPrinter) {
    this.tree = tree;
  }
  public abstract printString(): string;
  public print(): void {
    console.log(this.printString());
  }
}
class PreorderPrinter extends Printer {
  constructor(tree: BinaryTreesPrinter) {
    super(tree);
  }
  //├│─└┌
  public printString(): string {
    const root = this.tree._printerRoot();
    if (root === undefined) return "";
    return this._printString(root, "");
  }
  private _printString(node: object, prefix: string): string {
    const left = this.tree._printerLeft(node);
    const right = this.tree._printerRight(node);
    const nodeString = this.tree._printerString(node);
    const halfLength = nodeString.length >> 1;
    let string = `${this.tree._printerString(node)}\n`;
    if (right !== undefined) {
      string +=
        prefix +
        blank(halfLength) +
        (left === undefined ? "└" : "├") +
        repeat("─", halfLength) +
        " R ";
      string += this._printString(
        right,
        prefix +
          blank(halfLength) +
          (left === undefined ? " " : "│") +
          blank(halfLength)
      );
    }
    if (left !== undefined) {
      string +=
        prefix + blank(halfLength) + "└" + repeat("─", halfLength) + " L ";
      string += this._printString(
        left,
        prefix + blank(halfLength) + blank(halfLength + 1)
      );
    }
    return string;
  }
}
class InorderPrinter extends Printer {
  constructor(tree: BinaryTreesPrinter) {
    super(tree);
  }
  public printString(): string {
    return "";
  }
}
class PostorderPrinter extends Printer {
  constructor(tree: BinaryTreesPrinter) {
    super(tree);
  }
  public printString(): string {
    return "";
  }
}
class LevelOrderSlashes extends Printer {
  constructor(tree: BinaryTreesPrinter) {
    super(tree);
  }
  public printString(): string {
    return "";
  }
}
class LevelOrderLines extends Printer {
  constructor(tree: BinaryTreesPrinter) {
    super(tree);
  }
  public printString(): string {
    return "";
  }
}

export default class {
  public static print(
    tree: BinaryTreesPrinter,
    style: BinaryTreesPrintStyle = BinaryTreesPrintStyle.PREORDER
  ): void {
    if (tree === undefined || tree._printerRoot() === undefined) return;
    this.printer(tree, style).print();
  }
  public static printString(
    tree: BinaryTreesPrinter,
    style: BinaryTreesPrintStyle = BinaryTreesPrintStyle.PREORDER
  ): string {
    return this.printer(tree, style).printString();
  }
  private static printer(
    tree: BinaryTreesPrinter,
    style: BinaryTreesPrintStyle
  ): Printer {
    switch (style) {
      case BinaryTreesPrintStyle.PREORDER:
        return new PreorderPrinter(tree);
      case BinaryTreesPrintStyle.INORDER:
        return new InorderPrinter(tree);
      case BinaryTreesPrintStyle.POSTORDER:
        return new PostorderPrinter(tree);
      case BinaryTreesPrintStyle.LEVEL_ORDER_LINES:
        return new LevelOrderLines(tree);
      case BinaryTreesPrintStyle.LEVEL_ORDER_SLASHES:
        return new LevelOrderSlashes(tree);
    }
  }
}
