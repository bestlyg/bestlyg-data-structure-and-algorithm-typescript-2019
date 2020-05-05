import CircleQueue from "./CircleQueue";
import Deque from "./IDeque";

export default class CircleDeque<T> extends CircleQueue<T> implements Deque<T> {
  rear(): T {
    this.thorwEmpty("rear");
    return this._elements[this.index(this.size() - 1)] as T;
  }
  enQueueRear(element: T): void {
    this.enQueue(element);
  }
  enQueueFront(element: T): void {
    this.ensureCapacity();
    this._head = this.index(-1);
    this._elements[this._head] = element;
    this._size++;
  }
  deQueueFront(): T {
    this.thorwEmpty("deQueueFront");
    return this.deQueue();
  }
  deQueueRear(): T {
    this.thorwEmpty("deQueueRear");
    const index = this.index(this.size() - 1);
    const el = this._elements[index] as T;
    Reflect.deleteProperty(this._elements, index);
    this._size--;
    return el;
  }
}
