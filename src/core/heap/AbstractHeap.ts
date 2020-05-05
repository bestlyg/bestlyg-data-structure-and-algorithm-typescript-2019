import IHeap from "./IHeap";
import { Comparator } from "../../types";
export default abstract class AbstractHeap<T> implements IHeap<T> {
  protected _size = 0;
  protected _comparator: Comparator<T>;
  constructor(comparator: Comparator<T>) {
    this._comparator = comparator;
  }
  size(): number {
    return this._size;
  }
  isEmpty(): boolean {
    return this._size === 0;
  }
  abstract clear(): void;
  abstract add(element: T);
  abstract get(): T;
  abstract remove(): T;
  abstract replace(element: T): T | undefined;
}
