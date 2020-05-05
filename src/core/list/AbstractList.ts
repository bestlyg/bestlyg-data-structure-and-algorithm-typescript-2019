import { thorwEmptyError } from "../../utils";
import List from "./IList";
import { ELEMENT_NOT_FOUND } from "../../types";
export default abstract class AbstractList<T> implements List<T> {
  protected _size = 0;
  public size(): number {
    return this._size;
  }
  public isEmpty(): boolean {
    return this._size === 0;
  }
  public contains(element: T): boolean {
    return this.indexOf(element) !== ELEMENT_NOT_FOUND;
  }
  protected rangeCheck(index: number): void {
    if (index < 0 || index >= this.size()) {
      this.outOfBounds(index);
    }
  }
  protected rangeCheckForAdd(index: number): void {
    if (index < 0 || index > this.size()) {
      this.outOfBounds(index);
    }
  }
  protected thorwEmpty(method: string): void {
    if (this.isEmpty()) {
      thorwEmptyError("List")(method);
    }
  }
  protected outOfBounds(index: number): void {
    throw new Error("Index:" + index + ", Size:" + this.size());
  }
  abstract remove(element: number): T;
  abstract add(element: T, index?: number): void;
  abstract clear(): void;
  abstract get(index: number): T;
  abstract set(index: number, element: T): T;
  abstract indexOf(element: T): number;
  abstract first(): T;
  abstract addFirst(element: T): void;
  abstract delFirst(): T;
  abstract last(): T;
  abstract addLast(element: T): void;
  abstract delLast(): T;
}
