import Queue from "./Queue";
import IDeque from "./IDeque";

export default class Deque<T> extends Queue<T> implements IDeque<T> {
  enQueueRear(element: T): void {
    this._list.push(element);
  }
  enQueueFront(element: T): void {
    this._list.unshift(element);
  }
  deQueueRear(): T {
    this.thorwEmpty("deQueueRear");
    return this._list.pop() as T;
  }
  deQueueFront(): T {
    this.thorwEmpty("deQueueFront");
    return this._list.shift() as T;
  }
  rear(): T {
    return this._list[this.size() - 1];
  }
}
