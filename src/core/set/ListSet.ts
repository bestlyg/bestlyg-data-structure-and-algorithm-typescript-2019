import Set from "./ISet";
import { ELEMENT_NOT_FOUND } from "../../types";
import { VisitorIterator } from "../../utils/visitor_T";
export default class ListSet<T> implements Set<T> {
  private _list: T[] = [];
  size(): number {
    return this._list.length;
  }
  isEmpty(): boolean {
    return this.size() === 0;
  }
  clear(): void {
    this._list.length = 0;
  }
  contains(element: T): boolean {
    return this._list.includes(element);
  }
  add(element: T): void {
    const _list = this._list;
    const index = _list.indexOf(element);
    if (index !== ELEMENT_NOT_FOUND) {
      _list[index] = element;
    } else {
      _list.push(element);
    }
  }
  remove(element: T): void {
    const _list = this._list;
    const index = _list.indexOf(element);
    if (index != ELEMENT_NOT_FOUND) {
      _list.splice(index, 1);
    }
  }
  traversal(visitor: VisitorIterator<T>): void {
    for (const el of this._list) if (visitor(el)) return;
  }
}
