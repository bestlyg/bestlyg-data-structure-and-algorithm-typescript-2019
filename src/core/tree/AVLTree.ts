import BalanceBinarySearchTree from "./BalanceBinarySearchTree";
import Node from "./Node";
import AVLNode from "./AVLNode";
export default class AVLTree<T> extends BalanceBinarySearchTree<T> {
  protected afterAdd(node: Node<T>): void {
    while (node.parent !== undefined) {
      node = node.parent;
      if (this.isBalanced(node)) {
        this.updateHeight(node);
      } else {
        this.rebalance(node);
        break;
      }
    }
  }
  protected afterRemove(node: Node<T>): void {
    while (node.parent !== undefined) {
      node = node.parent;
      if (this.isBalanced(node)) {
        this.updateHeight(node);
      } else {
        this.rebalance(node);
      }
    }
  }
  protected createNode(element: T, parent: Node<T> | undefined): Node<T> {
    return new AVLNode<T>(element, parent);
  }
  private isBalanced(node: Node<T>): boolean {
    return Math.abs((node as AVLNode<T>).balanceFactor()) <= 1;
  }
  private updateHeight(node: Node<T>): void {
    (node as AVLNode<T>).updateHeight();
  }
  private rebalance(grand: Node<T>): void {
    const parent = (grand as AVLNode<T>).tallerChild();
    const node = (parent as AVLNode<T>).tallerChild();
    if (parent.isLeftChild()) {
      if (node.isLeftChild()) {
        this.rotate(grand, node, node.right, parent, parent.right, grand);
      } else {
        this.rotate(grand, parent, node.left, node, node.right, grand);
      }
    } else {
      if (node.isLeftChild()) {
        this.rotate(grand, grand, node.left, node, node.right, parent);
      } else {
        this.rotate(grand, grand, parent.left, parent, node.left, node);
      }
    }
  }
  // protected afterRotate(
  //   grand: Node<T>,
  //   parent: Node<T>,
  //   child: Node<T> | undefined
  // ) {
  //   super.afterRotate(grand, parent, child);
  //   this.updateHeight(grand);
  //   this.updateHeight(parent);
  // }
  protected rotate(
    r: Node<T>,
    b: Node<T>,
    c: Node<T> | undefined,
    d: Node<T>,
    e: Node<T> | undefined,
    f: Node<T>
  ): void {
    super.rotate(r, b, c, d, e, f);
    this.updateHeight(b);
    this.updateHeight(f);
    this.updateHeight(d);
  }
}
