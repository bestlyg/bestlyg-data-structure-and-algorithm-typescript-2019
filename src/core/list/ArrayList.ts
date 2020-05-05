import AbstractList from "./AbstractList";
import { ELEMENT_NOT_FOUND } from "../../types";
export default class ArrayList<T> extends AbstractList<T> {
  private _elements: T[] = []; //所有元素储存
  /**
   * 清除所有元素
   */
  public clear(): void {
    this._elements.length = 0;
  }
  /**
   * 元素的数量
   * @return
   */
  public size(): number {
    return this._elements.length;
  }
  /**
   * 是否为空
   * @return
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }
  /**
   * 查看元素的索引
   * @param element
   * @return
   */
  public indexOf(element: T): number {
    for (let i = 0, len = this.size(); i < len; i++) {
      if (this._elements[i] === element) {
        return i;
      }
    }
    return ELEMENT_NOT_FOUND;
  }
  /**
   * 获取index位置的元素
   * @param index
   * @return
   */
  public get(index: number): T {
    this.rangeCheck(index);
    return this._elements[index];
  }
  /**
   * 设置index位置的元素
   * @param index
   * @param element
   * @return 原来的元素ֵ
   */
  public set(index: number, element: T): T {
    this.rangeCheck(index);
    return this._elements.splice(index, 1, element)[0];
  }
  /**
   * 是否包含某个元素
   * @param element
   * @return
   */
  public contains(element: T): boolean {
    return this.indexOf(element) !== ELEMENT_NOT_FOUND;
  }
  add(element: T, index: number = this.size()): void {
    this._elements.splice(index, 0, element);
  }
  public remove(index: number): T {
    this.rangeCheck(index);
    return this._elements.splice(index, 1)[0];
  }
  public toString(): string {
    let string = `size:${this.size()},elements:[`;
    for (let i = 0, len = this.size(); i < len; i++) {
      if (i !== 0) {
        string += ",";
      }
      string += `${this._elements[i]}`;
    }
    string += "]";
    return string;
  }

  public first(): T {
    this.thorwEmpty("first");
    return this._elements[0];
  }
  public addFirst(element: T): void {
    this._elements.unshift(element);
  }
  public delFirst(): T {
    this.thorwEmpty("delFirst");
    return this._elements.shift() as T;
  }
  public last(): T {
    this.thorwEmpty("last");
    return this._elements[this.size() - 1];
  }
  public addLast(element: T): void {
    this._elements.push(element);
  }
  public delLast(): T {
    this.thorwEmpty("delLast");
    return this._elements.pop() as T;
  }
}
