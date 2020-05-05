import RedBlackTree from "../tree/RedBlackTree";
import Set from "./ISet";
import { Comparator } from "../../types";
/**
 * 内置红黑树
 */
export default class TreeSet2<T> implements Set<T> {
  private _tree: RedBlackTree<T>;
  constructor(comparator: Comparator<T>) {
    this._tree = new RedBlackTree<T>(comparator);
  }
  size(): number {
    return this._tree.size();
  }
  isEmpty(): boolean {
    return this._tree.isEmpty();
  }
  clear(): void {
    this._tree.clear();
  }
  contains(element: T): boolean {
    return this._tree.contains(element);
  }
  add(element: T): void {
    this._tree.add(element);
  }
  remove(element: T): void {
    this._tree.remove(element);
  }
  traversal(visitor: (element: T) => boolean): void {
    this._tree.inorder(visitor);
  }
}
