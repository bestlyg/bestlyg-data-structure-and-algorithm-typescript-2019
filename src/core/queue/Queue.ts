import AbstractQueue from "./AbstractQueue";
export default class Queue<T> extends AbstractQueue<T> {
  protected _list: T[] = new Array<T>();
  size(): number {
    return this._list.length;
  }
  isEmpty(): boolean {
    return this.size() === 0;
  }
  clear(): void {
    this._list.length = 0;
  }
  enQueue(element: T): void {
    this._list.push(element);
  }
  deQueue(): T {
    this.thorwEmpty("deQueue");
    return this._list.shift() as T;
  }
  front(): T {
    this.thorwEmpty("front");
    return this._list[0];
  }
  toString(): string {
    let string = `size:${this.size()},front->[`;
    for (let i = 0, len = this.size(); i < len; i++) {
      if (i != 0) {
        string += ",";
      }
      string += this._list[i];
    }
    string += "]<-rear";
    return string;
  }
}
