import BinarySearchTree from "./BinarySearchTree";
import Node from "./Node";
export default class BalanceBinarySearchTree<T> extends BinarySearchTree<T> {
  protected rotate(
    r: Node<T>,
    b: Node<T>,
    c: Node<T> | undefined,
    d: Node<T>,
    e: Node<T> | undefined,
    f: Node<T>
  ): void {
    d.parent = r.parent;
    if (r.isLeftChild()) {
      (r.parent as Node<T>).left = d;
    } else if (r.isRightChild()) {
      (r.parent as Node<T>).right = d;
    } else {
      this._root = d;
    }
    b.right = c;
    if (c != undefined) {
      c.parent = b;
    }
    f.left = e;
    if (e != undefined) {
      e.parent = f;
    }
    d.left = b;
    d.right = f;
    b.parent = d;
    f.parent = d;
  }
  protected rotateLeft(grand: Node<T>): void {
    const parent: Node<T> = grand.right as Node<T>;
    const child: Node<T> | undefined = parent.left;
    grand.right = child;
    parent.left = grand;
    this.afterRotate(grand, parent, child);
  }
  protected rotateRight(grand: Node<T>): void {
    const parent: Node<T> = grand.left as Node<T>;
    const child: Node<T> | undefined = parent.right;
    grand.left = child;
    parent.right = grand;
    this.afterRotate(grand, parent, child);
  }
  protected afterRotate(
    grand: Node<T>,
    parent: Node<T>,
    child: Node<T> | undefined
  ): void {
    parent.parent = grand.parent;
    if (grand.isLeftChild()) {
      (grand.parent as Node<T>).left = parent;
    } else if (grand.isRightChild()) {
      (grand.parent as Node<T>).right = parent;
    } else {
      this._root = parent;
    }
    if (child !== undefined) {
      child.parent = grand;
    }
    grand.parent = parent;
  }
}
