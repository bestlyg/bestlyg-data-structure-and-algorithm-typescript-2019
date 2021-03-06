/**
 * 单链表 无头结点
 */
import AbstractList from "./AbstractList";
import { ELEMENT_NOT_FOUND } from "../../types";
class Node<T> {
  element: T;
  next: Node<T> | undefined;
  constructor(element: T, next?: Node<T>) {
    this.element = element;
    this.next = next;
  }
  toString(): string {
    return `Node:${this.element}->${this.next?.element}`;
  }
}
export default class SingleLinkedList<T> extends AbstractList<T> {
  _firstNode: Node<T> | undefined = undefined;
  public remove(element: number): T {
    this.rangeCheck(element);
    let el: T;
    if (element === 0) {
      el = this.delFirst();
    } else if (element === this.size() - 1) {
      el = this.delLast();
    } else {
      const prev = this.node(element - 1);
      el = (prev.next as Node<T>).element;
      prev.next = (prev.next as Node<T>).next;
      this._size--;
    }
    return el;
  }
  public add(element: T, index: number = this.size()): void {
    this.rangeCheckForAdd(index);
    if (index === 0) {
      this.addFirst(element);
    } else if (index === this.size()) {
      this.addLast(element);
    } else {
      const prev = this.node(index - 1);
      const newNode: Node<T> = new Node(element, prev.next);
      prev.next = newNode;
      this._size++;
    }
  }
  public clear(): void {
    this._firstNode = undefined;
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
    if (cur === undefined) return ELEMENT_NOT_FOUND;
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
      const newNode = new Node<T>(element, this._firstNode);
      this._firstNode = newNode;
    } else {
      this._firstNode = new Node<T>(element);
    }
    this._size++;
  }
  public delFirst(): T {
    this.thorwEmpty("delFirst");
    const oldNode = this._firstNode;
    if (this.size() == 1) {
      return this.delLastNode();
    }
    this._firstNode = (this._firstNode as Node<T>).next;
    this._size--;
    return (oldNode as Node<T>).element;
  }
  public last(): T {
    this.thorwEmpty("last");
    return this.node(this.size() - 1).element;
  }
  public addLast(element: T): void {
    if (this._firstNode) {
      const newNode = new Node<T>(element);
      const prev = this.node(this.size() - 1);
      prev.next = newNode;
    } else {
      this._firstNode = new Node<T>(element);
    }
    this._size++;
  }
  public delLast(): T {
    this.thorwEmpty("delLast");
    if (this._size === 1) {
      return this.delLastNode();
    } else {
      const prev = this.node(this.size() - 2);
      const oldNode = prev.next as Node<T>;
      prev.next = undefined;
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
    let cur = this._firstNode as Node<T>;
    for (let i = 0; i < index; i++) {
      cur = cur.next as Node<T>;
    }
    return cur;
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
