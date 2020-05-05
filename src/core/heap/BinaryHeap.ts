import AbstractHeap from "./AbstractHeap";
import { BinaryTreesPrinter, Comparator } from "../../types";
import { thorwEmptyError, toString } from "../../utils";
export default class BinaryHeap<T> extends AbstractHeap<T>
  implements BinaryTreesPrinter {
  private _elements: T[] = [];
  constructor(comparator: Comparator<T>, elements: T[] = []) {
    super(comparator);
    const size = elements.length;
    if (size !== 0) {
      this._elements = [...elements];
      this._size = size;
      this.heapify();
    }
  }
  clear(): void {
    this._elements.length = 0;
    this._size = 0;
  }
  add(element: T): void {
    this._elements.push(element);
    this.siftUp(this._size++);
  }
  get(): T {
    this.emptyCheck("get");
    return this._elements[0];
  }
  remove(): T {
    this.emptyCheck("remove");
    const root = this._elements[0];
    this._elements[0] = this._elements.pop() as T;
    this._size--;
    this.siftDown(0);
    return root;
  }
  replace(element: T): T | undefined {
    let root: T | undefined = undefined;
    if (this._size === 0) {
      this._elements[0] = element;
      this._size++;
    } else {
      root = this._elements[0];
      this._elements[0] = element;
      this.siftDown(0);
    }
    return root;
  }
  heapify(): void {
    for (let i = (this._size >> 1) - 1; i >= 0; i--) {
      this.siftDown(i);
    }
  }
  private siftUp(index: number): void {
    const element = this._elements[index];
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      const parent = this._elements[parentIndex];
      if (this._comparator(element, parent) <= 0) break;
      this._elements[index] = parent;
      index = parentIndex;
    }
    this._elements[index] = element;
  }
  private siftDown(index: number): void {
    const element = this._elements[index];
    const half = this._size >> 1;
    while (index < half) {
      let childIndex = (index << 1) + 1;
      let child = this._elements[childIndex];
      const rightIndex = childIndex + 1;
      if (
        rightIndex < this._size &&
        this._comparator(this._elements[rightIndex], child) > 0
      ) {
        child = this._elements[(childIndex = rightIndex)];
      }
      if (this._comparator(element, child) >= 0) break;
      this._elements[index] = child;
      index = childIndex;
    }
    this._elements[index] = element;
  }
  private emptyCheck(string: string): void {
    if (this.isEmpty()) thorwEmptyError("BinaryHeap")(string);
  }
  _printerRoot(): any {
    return 0;
  }
  _printerLeft(node: any): any {
    const index = ((node as number) << 1) + 1;
    return index >= this._size ? undefined : index;
  }
  _printerRight(node: any): any {
    const index = ((node as number) << 1) + 2;
    return index >= this._size ? undefined : index;
  }
  _printerString(node: any): string {
    return toString(this._elements[node as number]);
  }
}
