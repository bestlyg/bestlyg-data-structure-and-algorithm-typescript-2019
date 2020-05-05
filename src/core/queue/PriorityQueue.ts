import IQueue from "./IQueue";
import BinaryHeap from "../heap/BinaryHeap";
export default class PriorityQueue<T> implements IQueue<T> {
  private _heap: BinaryHeap<T>;
  constructor(comparator: (t1: T, t2: T) => number) {
    this._heap = new BinaryHeap<T>(comparator);
  }
  size(): number {
    return this._heap.size();
  }
  isEmpty(): boolean {
    return this._heap.isEmpty();
  }
  clear(): void {
    this._heap.clear();
  }
  enQueue(element: T): void {
    this._heap.add(element);
  }
  deQueue(): T {
    return this._heap.remove();
  }
  front(): T {
    return this._heap.get();
  }
}
