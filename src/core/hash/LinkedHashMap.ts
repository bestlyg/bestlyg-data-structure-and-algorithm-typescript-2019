import HashMap, { Node } from "./HashMap";
import { Hash } from "../../types";
import { equals } from "../../utils";
class LinkedNode<K, V> extends Node<K, V> {
  prev: LinkedNode<K, V> | undefined = undefined;
  next: LinkedNode<K, V> | undefined = undefined;
}
export default class LinkedHashMap<K extends Hash, V> extends HashMap<K, V> {
  private _first: LinkedNode<K, V> | undefined = undefined;
  private _last: LinkedNode<K, V> | undefined = undefined;
  clear(): void {
    super.clear();
    this._first = undefined;
    this._last = undefined;
  }
  protected createNode(
    key: K,
    value: V,
    parent: Node<K, V> | undefined = undefined
  ): Node<K, V> {
    const node = new LinkedNode(key, value, parent);
    if (this._last === undefined) {
      this._first = this._last = node;
    } else {
      this._last.next = node;
      node.prev = this._last;
      this._last = node;
    }
    return node;
  }
  containsValue(value: V): boolean {
    let node = this._first;
    while (node !== undefined) {
      if (equals(value, node.value)) return true;
      node = node.next;
    }
    return false;
  }
  traversal(visitor: (key: K, value: V) => boolean): void {
    let node = this._first;
    while (node !== undefined) {
      if (visitor(node.key, node.value)) return;
      node = node.next;
    }
  }
  protected afterRemove(willNode: Node<K, V>, removeNode: Node<K, V>): void {
    const node1 = willNode as LinkedNode<K, V>;
    const node2 = removeNode as LinkedNode<K, V>;
    if (node1 !== node2) {
      let tmp = node1.prev;
      node1.prev = node2.prev;
      node2.prev = tmp;
      if (node1.prev === undefined) this._first = node1;
      else node1.prev.next = node1;
      if (node2.prev === undefined) this._first = node2;
      else node2.prev.next = node2;
      tmp = node1.next;
      node1.next = node2.next;
      node2.next = tmp;
      if (node1.next === undefined) this._last = node1;
      else node1.next.prev = node1;
      if (node2.next === undefined) this._last = node2;
      else node2.next.prev = node2;
    }
    const prev = node2.prev;
    const next = node2.next;
    if (prev === undefined) this._first = next;
    else prev.next = next;
    if (next === undefined) this._last = prev;
    else next.prev = prev;
  }
}
