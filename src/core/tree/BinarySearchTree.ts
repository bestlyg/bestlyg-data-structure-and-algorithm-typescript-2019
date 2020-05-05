/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BinaryTree from "./BinaryTree";
import Node from "./Node";
import { Comparator } from "../../types";
export default class BinarySearchTree<T> extends BinaryTree<T> {
  private _comparator: Comparator<T>;
  constructor(comparator: Comparator<T>) {
    super();
    this._comparator = comparator;
  }
  /**
   * 添加元素
   * @param {T} element 元素的值
   */
  public add(element: T): void {
    const root = this._root;
    if (root === undefined) {
      this._root = this.createNode(element, undefined);
      this._size++;
      this.afterAdd(this._root);
      return;
    }
    let node: Node<T> | undefined = root;
    let parent: Node<T> = node;
    let cmp;
    do {
      cmp = this._comparator(element, node.element);
      parent = node;
      if (cmp > 0) {
        node = node.right;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        node.element = element;
        return;
      }
    } while (node != undefined);
    const newNode = this.createNode(element, parent);
    if (cmp > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this._size++;
    this.afterAdd(newNode);
  }
  /**
   * 删除元素
   * @param {T} element 元素的值，若不存在则树不动
   */
  public remove(element: T): void {
    this._remove(this.node(element));
  }
  private _remove(node: Node<T> | undefined): void {
    if (node === undefined) return;
    this._size--;
    if (node.hasTwoChildren()) {
      const s = this.successor(node);
      node.element = (s as Node<T>).element;
      node = s as Node<T>;
    }
    const replacement = node.left !== undefined ? node.left : node.right;
    if (replacement !== undefined) {
      replacement.parent = node.parent;
      if (node.parent === undefined) {
        this._root = replacement;
      } else if (node === node.parent.left) {
        node.parent.left = replacement;
      } else {
        node.parent.right = replacement;
      }
      this.afterRemove(replacement);
    } else if (node.parent === undefined) {
      this._root = undefined;
      this.afterRemove(node);
    } else {
      if (node === node.parent.left) {
        node.parent.left = undefined;
      } else {
        node.parent.right = undefined;
      }
      this.afterRemove(node);
    }
  }
  /**
   * 判断该值是否在树中
   * @param {T} element 值
   * @return {boolean} true|false
   */
  public contains(element: T): boolean {
    return this.node(element) !== undefined;
  }
  /**
   * 获取值所在的节点
   * @param {T} element 值
   * @return {Node<T>|undefined} 返回节点或undefined
   */
  public get(element: T): Node<T> | undefined {
    return this.node(element);
  }
  protected afterAdd(node: Node<T>): void {}
  protected afterRemove(node: Node<T>): void {}
  private node(element: T): Node<T> | undefined {
    let node = this._root;
    while (node !== undefined) {
      const cmp = this._comparator(element, node.element);
      if (cmp === 0) return node;
      if (cmp > 0) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return undefined;
  }
}
