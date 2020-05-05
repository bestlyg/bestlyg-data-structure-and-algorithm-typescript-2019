/**
 * 双向循环链表
 */
import AbstractList from "./AbstractList";
import { ELEMENT_NOT_FOUND } from "../../types";
class Node<T> {
  element: T;
  prev: Node<T>;
  next: Node<T>;
  constructor(prev: Node<T>, element: T, next: Node<T>) {
    this.prev = prev;
    this.element = element;
    this.next = next;
  }
  toString(): string {
    return `Node:${this.prev.element}->${this.element}->${this.next.element}`;
  }
}
export default class DuCircleLinkedList<T> extends AbstractList<T> {
  _firstNode: Node<T> | undefined = undefined;
  _lastNode: Node<T> | undefined = undefined;
  public add(element: T, index: number = this.size()): void {
    this.rangeCheckForAdd(index);
    if (index === 0) {
      this.addFirst(element);
    } else if (index === this.size()) {
      this.addLast(element);
    } else {
      const next = this.node(index);
      const prev = next.prev;
      const newNode: Node<T> = new Node(prev, element, next);
      prev.next = newNode;
      next.prev = newNode;
      this._size++;
    }
  }
  public remove(element: number): T {
    this.rangeCheck(element);
    let el: T;
    if (element === 0) {
      el = this.delFirst();
    } else if (element === this.size() - 1) {
      el = this.delLast();
    } else {
      const prev = this.node(element - 1);
      el = prev.next.element;
      prev.next = prev.next.next;
      this._size--;
    }
    return el;
  }
  public clear(): void {
    this._firstNode = undefined;
    this._lastNode = undefined;
    this._size = 0;
  }
  public get(index: number): T {
    return this.node(index).element;
  }
  public set(index: number, element: T): T {
    this.rangeCheck(index);
    const node = this.node(index);
    const oldElement = node.element;
    node.element = element;
    return oldElement;
  }
  public indexOf(element: T): number {
    let cur = this._firstNode;
    for (let i = 0, len = this.size(); i < len; i++) {
      if ((cur as Node<T>).element === element) {
        return i;
      }
      cur = (cur as Node<T>).next;
    }
    return ELEMENT_NOT_FOUND;
  }
  public first(): T {
    this.thorwEmpty("first");
    return (this._firstNode as Node<T>).element;
  }
  public addFirst(element: T): void {
    if (this._firstNode) {
      const oldNode = this._firstNode;
      this._firstNode = new Node<T>(
        this._lastNode as Node<T>,
        element,
        this._firstNode
      );
      (this._lastNode as Node<T>).next = this._firstNode;
      oldNode.prev = this._firstNode;
    } else {
      const newNode = new Node<T>({} as Node<T>, element, {} as Node<T>);
      this._firstNode = newNode;
      this._lastNode = newNode;
      newNode.prev = newNode;
      newNode.next = newNode;
    }
    this._size++;
  }
  public delFirst(): T {
    this.thorwEmpty("delFirst");
    if (this._size === 1) {
      return this.delLastNode();
    }
    const oldNode = this._firstNode;
    this._firstNode = (this._firstNode as Node<T>).next;
    this._size--;
    return (oldNode as Node<T>).element;
  }
  public last(): T {
    this.thorwEmpty("last");
    return (this._lastNode as Node<T>).element;
  }
  public addLast(element: T): void {
    if (this._lastNode) {
      const newNode = new Node<T>(
        this._lastNode,
        element,
        this._firstNode as Node<T>
      );
      this._lastNode.next = newNode;
      this._lastNode = newNode;
      (this._firstNode as Node<T>).prev = newNode;
      this._size++;
    } else {
      this.addFirst(element);
    }
  }
  public delLast(): T {
    this.thorwEmpty("delLast");
    if (this._size === 1) {
      return this.delLastNode();
    } else {
      const oldNode = this.node(this.size() - 1);
      const prev = oldNode.prev;
      prev.next = this._firstNode as Node<T>;
      this._lastNode = prev;
      this._size--;
      return oldNode.element;
    }
  }
  private delLastNode(): T {
    const el = (this._firstNode as Node<T>).element;
    this.clear();
    return el;
  }
  /**
   * 根据index返回Node
   * @param index
   */
  private node(index: number): Node<T> {
    this.rangeCheck(index);
    const _size = this.size();
    if (index <= _size >> 1) {
      let cur = this._firstNode;
      for (let i = 0; i < index; i++) {
        cur = (cur as Node<T>).next;
      }
      return cur as Node<T>;
    } else {
      let cur = this._lastNode;
      for (let i = this.size() - 1; i > index; i--) {
        cur = (cur as Node<T>).prev;
      }
      return cur as Node<T>;
    }
  }
  toString(): string {
    let string = `size:${this.size()},elements:[`;
    let cur = this._firstNode;
    for (let i = 0, len = this.size(); i < len; i++) {
      if (i !== 0) {
        string += ",";
      }
      string += cur;
      cur = (cur as Node<T>).next;
    }
    string += "]";
    return string;
  }
}
