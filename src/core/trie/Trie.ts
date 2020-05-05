import { error } from "../../utils";
import ITrie from "./ITrie";
class Node<V> {
  parent: Node<V> | undefined;
  children: Map<string, Node<V>> | undefined = undefined;
  character = "";
  value: V | undefined = undefined;
  word = false;
  constructor(parent?: Node<V>) {
    this.parent = parent;
  }
}
export default class Trie<V> implements ITrie<V> {
  _size = 0;
  _root: Node<V> | undefined = undefined;
  size(): number {
    return this._size;
  }
  isEmpty(): boolean {
    return this._size === 0;
  }
  clear(): void {
    this._size = 0;
    this._root = undefined;
  }
  get(key: string): V | undefined {
    const node = this.node(key);
    return node !== undefined && node.word ? node.value : undefined;
  }
  contains(key: string): boolean {
    const node = this.node(key);
    return node !== undefined && node.word;
  }
  add(key: string, value: V): V | undefined {
    this.keyCheck(key);
    if (this._root === undefined) this._root = new Node<V>();
    let node = this._root;
    for (const c of key) {
      let childNode = node.children?.get(c);
      if (childNode === undefined) {
        childNode = new Node<V>(node);
        childNode.character = c;
        node.children = node.children
          ? node.children
          : new Map<string, Node<V>>();
        node.children.set(c, childNode);
      }
      node = childNode;
    }
    if (node.word) {
      const oldValue = node.value;
      node.value = value;
      return oldValue;
    }
    node.word = true;
    node.value = value;
    this._size++;
    return undefined;
  }
  remove(key: string): V | undefined {
    let node = this.node(key);
    if (node === undefined || !node.word) return undefined;
    this._size--;
    const oldValue = node.value;
    if (node.children !== undefined && !(node.children.size === 0)) {
      node.word = false;
      node.value = undefined;
      return oldValue;
    }
    let parent: Node<V> | undefined;
    while ((parent = node.parent) !== undefined) {
      (parent.children as Map<string, Node<V>>).delete(node.character);
      if (
        parent.word ||
        !((parent.children as Map<string, Node<V>>).size === 0)
      )
        break;
      node = parent;
    }
    return oldValue;
  }
  startsWith(prefix: string): boolean {
    return this.node(prefix) !== undefined;
  }
  private node(key: string): Node<V> | undefined {
    this.keyCheck(key);
    let node = this._root;
    for (const c of key) {
      if (
        node === undefined ||
        node.children === undefined ||
        node.children.size === 0
      )
        return undefined;
      node = node.children.get(c);
    }
    return node;
  }
  private keyCheck(key: string): void {
    if (key === "") error("key must not be empty");
  }
}
