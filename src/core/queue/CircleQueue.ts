import AbstractQueue from "./AbstractQueue";

export default class CircleQueue<T> extends AbstractQueue<T> {
  protected _head = 0;
  protected _size = 0;
  private _capacity = 10;
  protected _elements: T[];
  constructor(capacity: number) {
    super();
    this._capacity = capacity <= this._capacity ? this._capacity : capacity;
    this._elements = new Array<T>(this._capacity);
  }
  size(): number {
    return this._size;
  }
  isEmpty(): boolean {
    return this._size === 0;
  }
  clear(): void {
    this._elements.length = 0;
    this._head = 0;
    this._size = 0;
  }
  front(): T {
    this.thorwEmpty("front");
    return this._elements[this.index(0)] as T;
  }
  enQueue(element: T): void {
    this.ensureCapacity();
    this._elements[this.index(this.size())] = element;
    this._size++;
  }
  deQueue(): T {
    this.thorwEmpty("deQueue");
    const index = this.index(0);
    const el = this._elements[index];
    Reflect.deleteProperty(this._elements, index);
    this._head = this.index(1);
    this._size--;
    return el;
  }
  protected ensureCapacity(): void {
    const _capacity = this._capacity;
    if (_capacity !== this.size()) return;
    this._capacity = _capacity + (_capacity >> 1);
    const newEl = new Array<T>(this._capacity);
    for (let i = 0, len = this._capacity; i < len; i++) {
      newEl[i] = this._elements[this.index(i)];
    }
    this._elements = newEl;
    this._head = 0;
  }
  protected index(index: number): number {
    index += this._head;
    if (index < 0) {
      return index + this._capacity;
    }
    return index - (index >= this._capacity ? this._capacity : 0);
  }
  toString(): string {
    let string = `size:${this.size()},head:${this._head},[`;
    for (let i = 0, len = this._capacity; i < len; i++) {
      if (i != 0) {
        string += ",";
      }
      string += this._elements[i] ? this._elements[i] : "null";
    }
    string += "]";
    return string;
  }
}
