import Queue from "../queue/Queue";
import { VisitorIterator } from "../../utils/visitor_T";
import Stack from "../stack/Stack";
export default class Node<T> {
  element: T;
  left: Node<T> | undefined = undefined;
  right: Node<T> | undefined = undefined;
  parent: Node<T> | undefined = undefined;
  /**
   * 构造一个树节点
   * @param element 节点元素
   * @param parent 父节点
   */
  public constructor(element: T, parent?: Node<T>) {
    this.element = element;
    this.parent = parent;
  }
  public hasNoChildren(): boolean {
    return this.left === undefined && this.right === undefined;
  }
  public hasOneChildren(): boolean {
    return !this.hasNoChildren() && !this.hasTwoChildren();
  }
  public hasTwoChildren(): boolean {
    return this.left !== undefined && this.right !== undefined;
  }
  public isLeftChild(): boolean {
    return this.parent !== undefined && this === this.parent.left;
  }
  public isRightChild(): boolean {
    return this.parent !== undefined && this === this.parent.right;
  }
  public sibling(): Node<T> | undefined {
    if (this.isLeftChild()) return (this.parent as Node<T>).right;
    if (this.isRightChild()) return (this.parent as Node<T>).left;
    return undefined;
  }
  public toString(): string {
    return this.element + "";
  }
}
/**
 * 判断是否是完全二叉树
 * @param node
 */
export function iSComplete<T>(node: Node<T>): boolean {
  const queue = new Queue<Node<T>>();
  queue.enQueue(node);
  let leaf = false;
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    if (leaf && !node.hasNoChildren()) return false;
    if (node.left != undefined) {
      queue.enQueue(node.left);
    } else if (node.right != undefined) {
      return false;
    }
    if (node.right != undefined) {
      queue.enQueue(node.right);
    } else {
      leaf = true;
    }
  }
  return true;
}
/**
 * 判断是否是真二叉树
 * @param node
 */
export function isProper<T>(node: Node<T>): boolean {
  const queue = new Queue<Node<T>>();
  queue.enQueue(node);
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    if (node.hasOneChildren()) return false;
    if (node.hasTwoChildren()) {
      queue.enQueue(node.left as Node<T>);
      queue.enQueue(node.right as Node<T>);
    }
  }
  return true;
}

/**
 * 前序遍历
 * @param visitor
 * @param node
 */

//递归
// export function preorder<T>(visitor: Visitor<T>, node?: Node<T>): void {
//   _preorder(visitorMixin(visitor), node);
// }
// function _preorder<T>(visitor: IVisitor<T>, node?: Node<T>): void  {
//   if (node === undefined || visitor.stop) return;
//   visitor.stop = visitor(node.element);
//   _preorder(visitor, node.left);
//   _preorder(visitor, node.right);
// }

//迭代2
// export function preorder2<T>(visitor: Visitor<T>, node: Node<T>): void {
//   const stack = new Stack<Node<T>>();
//   stack.push(node);
//   let temp: Node<T> | undefined = node;
//   while (true) {
//     if (temp !== undefined) {
//       if (visitor(temp.element)) return;
//       if (temp.right !== undefined) stack.push(temp.right);
//       temp = temp.left;
//     } else if (stack.isEmpty()) {
//       return;
//     } else {
//       temp = stack.pop();
//     }
//   }
// }

//迭代前序遍历
export function preorder<T>(visitor: VisitorIterator<T>, node: Node<T>): void {
  const stack = new Stack<Node<T>>();
  stack.push(node);
  while (!stack.isEmpty()) {
    const node = stack.pop();
    if (visitor(node.element)) return;
    if (node.right !== undefined) stack.push(node.right);
    if (node.left !== undefined) stack.push(node.left);
  }
}

/**
 * 中序遍历
 * @param visitor
 * @param node
 */
// export function inorder<T>(visitor: Visitor<T>, node?: Node<T>): void {
//   _inorder(visitorMixin(visitor), node);
// }
// function _inorder<T>(visitor: IVisitor<T>, node?: Node<T>) {
//   if (node === undefined || visitor.stop) return;
//   _inorder(visitor, node.left);
//   if (visitor.stop) return;
//   visitor.stop = visitor(node.element);
//   _inorder(visitor, node.right);
// }
export function inorder<T>(visitor: VisitorIterator<T>, node: Node<T>): void {
  const stack = new Stack<Node<T>>();
  let temp: Node<T> | undefined = node;
  while (true) {
    if (temp !== undefined) {
      stack.push(temp);
      temp = temp.left;
    } else if (stack.isEmpty()) {
      return;
    } else {
      temp = stack.pop();
      if (visitor(temp.element)) return;
      temp = temp.right;
    }
  }
}
/**
 * 后序遍历
 * @param visitor
 * @param node
 */
// export function postorder<T>(visitor: Visitor<T>, node?: Node<T>): void {
//   _postorder(visitorMixin(visitor), node);
// }
// function _postorder<T>(visitor: IVisitor<T>, node?: Node<T>) {
//   if (node === undefined || visitor.stop) return;
//   _postorder(visitor, node.left);
//   _postorder(visitor, node.right);
//   if (visitor.stop) return;
//   visitor.stop = visitor(node.element);
// }
export function postorder<T>(visitor: VisitorIterator<T>, node: Node<T>): void {
  let prev: Node<T> | undefined = undefined;
  const stack = new Stack<Node<T>>();
  stack.push(node);
  while (!stack.isEmpty()) {
    const top = stack.top();
    if (top.hasNoChildren() || (prev !== undefined && prev.parent === top)) {
      prev = stack.pop();
      if (visitor(prev.element)) return;
    } else {
      if (top.right !== undefined) stack.push(top.right);
      if (top.left !== undefined) stack.push(top.left);
    }
  }
}
/**
 * 层序遍历
 * @param visitor
 * @param node
 */
export function levelOrder<T>(
  visitor: VisitorIterator<T>,
  node: Node<T>
): void {
  const queue = new Queue<Node<T>>();
  queue.enQueue(node);
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    if (visitor(node.element)) return;
    if (node.left != undefined) {
      queue.enQueue(node.left);
    }
    if (node.right != undefined) {
      queue.enQueue(node.right);
    }
  }
}
//迭代
export function height<T>(node?: Node<T>): number {
  if (node === undefined) return 0;
  let height = 0;
  let levelSize = 1;
  const queue = new Queue<Node<T>>();
  queue.enQueue(node);
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    levelSize--;
    if (node.left != undefined) {
      queue.enQueue(node.left);
    }
    if (node.right != undefined) {
      queue.enQueue(node.right);
    }
    if (levelSize === 0) {
      levelSize = queue.size();
      height++;
    }
  }
  return height;
}
//递归
// export function height<T>(node?: Node<T>): number {
//   if (node === undefined) return 0;
//   return 1 + Math.max(height(node.left), height(node.right));
// }
