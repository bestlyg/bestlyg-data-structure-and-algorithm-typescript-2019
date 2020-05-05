import { Color, ColorEnum } from "../../utils/color";
import Node from "./Node";
export default class RedBlackNode<T> extends Node<T> implements Color {
  color: ColorEnum = ColorEnum.RED;
  public toString(): string {
    return (this.color === ColorEnum.RED ? "R" : "B") + "_" + this.element;
  }
}
