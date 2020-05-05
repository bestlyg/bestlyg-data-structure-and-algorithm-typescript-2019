import { VisitorIterator } from "./../../utils/visitor_T";
import IBinaryTree from "./IBinaryTree";
// import { heightMethodType } from "./../../types/index";
import { toString } from "../../utils/index";
import Node, {
  iSComplete,
  isProper,
  postorder,
  preorder,
  inorder,
  levelOrder,
  height
} from "./Node";
import { BinaryTreesPrinter } from "../../types";

export default abstract class BinaryTree<T>
  implements IBinaryTree<T>, BinaryTreesPrinter {
  abstract add(element: T): void;
  abstract remove(element: T): void;
  abstract contains(element: T): boolean;
  abstract get(element: T): Node<T> | undefined;
  protected _size = 0;
  protected _root: Node<T> | undefined = undefined;
  /**
   * 返回树的大小
   * @return {number} 返回树的大小
   */
  public size(): number {
    return this._size;
  }
  /**
   * 判断树是否为空
   * @return {boolean} true|false
   */
  public isEmpty(): boolean {
    return this._size === 0;
  }
  public clear(): void {
    this._root = undefined;
    this._size = 0;
  }
  /**
   * 前序遍历
   * @param {VisitorIterator<T>} visitor 遍历监视器 函数返回false时停止遍历
   */
  public preorder(visitor: VisitorIterator<T>): void {
    const root = this._root;
    if (root === undefined) return;
    preorder(visitor, root);
  }
  /**
   * 中序遍历
   * @param {VisitorIterator<T>} visitor 遍历监视器 函数返回false时停止遍历
   */
  public inorder(visitor: VisitorIterator<T>): void {
    const root = this._root;
    if (root === undefined) return;
    inorder(visitor, root);
  }
  /**
   * 后序遍历
   * @param {VisitorIterator<T>} visitor 遍历监视器 函数返回false时停止遍历
   */
  public postorder(visitor: VisitorIterator<T>): void {
    const root = this._root;
    if (root === undefined) return;
    postorder(visitor, root);
  }
  /**
   * 层序遍历
   * @param {VisitorIterator<T>} visitor 遍历监视器 函数返回false时停止遍历
   */
  public levelOrder(visitor: VisitorIterator<T>): void {
    if (this._root === undefined) return;
    levelOrder(visitor, this._root);
  }
  /**
   * 判断是否为真二叉树
   * @return {boolean} true|false
   */
  public isProper(): boolean {
    if (this._root === undefined) return false;
    return isProper(this._root);
  }
  /**
   * 判断是否为满二叉树
   * @return {boolean} true|false
   */
  public isFull(): boolean {
    if (this._root === undefined) return false;
    return Math.pow(2, this.height()) - 1 === this.size();
  }
  /**
   * 判断是否为完全二叉树
   * @return {boolean} true|false
   */
  public isComplete(): boolean {
    if (this._root === undefined) return false;
    return iSComplete(this._root);
  }
  /**
   * 返回树的高度
   */
  public height(): number {
    return height(this._root);
  }
  /**
   * 获取前驱节点
   * @param {Node<T>} node 节点
   * @return {Node<T>|undefined} 返回前驱节点或undefined
   */
  public predecessor(node: Node<T>): Node<T> | undefined {
    let p = node.left;
    if (p != undefined) {
      while (p.right !== undefined) {
        p = p.right;
      }
      return p;
    }
    while (node.parent !== undefined && node === node.parent.left) {
      node = node.parent;
    }
    return node.parent;
  }
  /**
   * 获取后继结点
   * @param {Node<T>} node 节点
   * @return {Node<T>|undefined} 返回前驱节点或undefined
   */
  public successor(node: Node<T>): Node<T> | undefined {
    let p = node.right;
    if (p !== undefined) {
      while (p.left !== undefined) {
        p = p.left;
      }
      return p;
    }
    while (node.parent !== undefined && node === node.parent.right) {
      node = node.parent;
    }
    return node.parent;
  }
  protected createNode(element: T, parent?: Node<T>): Node<T> {
    return new Node<T>(element, parent);
  }
  public _printerRoot(): any {
    return this._root;
  }

  public _printerLeft(node: object): any {
    return (node as Node<T>).left;
  }

  public _printerRight(node: object): any {
    return (node as Node<T>).right;
  }

  public _printerString(node: object): any {
    const myNode = node as Node<T>;
    const parentString = toString(myNode.parent?.element);
    return toString(myNode) + "_P(" + parentString + ")";
  }
}
