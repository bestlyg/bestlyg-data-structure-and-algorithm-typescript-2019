import Node from "./Node";
export default class AVLNode<T> extends Node<T> {
  private height = 1;
  constructor(element: T, parent?: Node<T>) {
    super(element, parent);
  }
  public balanceFactor(): number {
    return this.leftHeight() - this.rightHeight();
  }
  public updateHeight(): void {
    this.height = 1 + Math.max(this.leftHeight(), this.rightHeight());
  }
  public tallerChild(): Node<T> {
    const leftHeight = this.leftHeight();
    const rightHeight = this.rightHeight();
    if (leftHeight > rightHeight) {
      return this.left as Node<T>;
    } else if (leftHeight < rightHeight) {
      return this.right as Node<T>;
    } else {
      return this.isLeftChild()
        ? (this.left as Node<T>)
        : (this.right as Node<T>);
    }
  }
  private leftHeight(): number {
    return this.left === undefined ? 0 : (this.left as AVLNode<T>).height;
  }
  private rightHeight(): number {
    return this.right === undefined ? 0 : (this.right as AVLNode<T>).height;
  }
}
