/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  hashCode,
  toUint32,
  toString,
  equals,
  isIHash,
  isIComparable,
  getClassName
} from "./../../utils";
import {
  Color,
  ColorEnum,
  black,
  isBlack,
  red,
  isRed,
  color,
  colorOf
} from "../../utils/color";
import { VisitorIterator } from "../../utils/visitor_KV";
import IMap from "../map/IMap";
import { Hash } from "../../types";
import Queue from "../queue/Queue";
import BinaryTreesPrinter from "../../utils/BinaryTreesPrinter";
export class Node<K, V> implements Color {
  hash: number;
  key: K;
  value: V;
  color: ColorEnum = ColorEnum.RED;
  left: Node<K, V> | undefined = undefined;
  right: Node<K, V> | undefined = undefined;
  parent: Node<K, V> | undefined;
  constructor(key: K, value: V, parent?: Node<K, V>) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.hash = toUint32(hashCode(key));
  }
  public hasTwoChildren(): boolean {
    return this.left !== undefined && this.right !== undefined;
  }
  public isLeftChild(): boolean {
    return this.parent !== undefined && this === this.parent.left;
  }
  public isRightChild(): boolean {
    return this.parent !== undefined && this === this.parent.right;
  }
  public sibling(): Node<K, V> | undefined {
    if (this.isLeftChild()) return (this.parent as Node<K, V>).right;
    if (this.isRightChild()) return (this.parent as Node<K, V>).left;
    return undefined;
  }
  public toString(): string {
    return `${this.color === ColorEnum.RED ? "R" : "B"}_key:【${
      this.key
    }】_value:【${this.value}】`;
  }
}
function levelOrder<K, V>(
  visitor: VisitorIterator<K, V>,
  node: Node<K, V>
): void {
  const queue = new Queue<Node<K, V>>();
  queue.enQueue(node);
  while (!queue.isEmpty()) {
    const node = queue.deQueue();
    if (visitor(node.key, node.value)) return;
    if (node.left != undefined) {
      queue.enQueue(node.left);
    }
    if (node.right != undefined) {
      queue.enQueue(node.right);
    }
  }
}
const DEFAULT_CAPACITY: number = 1 << 4;
const DEFAULT_LOAD_FACTOR = 0.75;
export default class HashMap<K extends Hash, V> implements IMap<K, V> {
  private _size = 0;
  private _table: Node<K, V>[] = [];
  private _capacity: number = DEFAULT_CAPACITY;
  size(): number {
    return this._size;
  }
  isEmpty(): boolean {
    return this._size === 0;
  }
  clear(): void {
    if (this._size === 0) return;
    this._size = 0;
    this._table.length = 0;
  }
  get(key: K): V | undefined {
    const node = this.node(key);
    return node !== undefined ? node.value : undefined;
  }
  containsKey(key: K): boolean {
    return this.node(key) !== undefined;
  }
  containsValue(value: V): boolean {
    if (this._size === 0) return false;
    const queue = new Queue<Node<K, V>>();
    for (let i = 0, len = this._table.length; i < len; i++) {
      const root = this._table[i];
      if (root === undefined) continue;
      queue.enQueue(root);
      while (!queue.isEmpty()) {
        const node = queue.deQueue();
        if (equals(value, node.value)) return true;
        if (node.left !== undefined) queue.enQueue(node.left);
        if (node.right !== undefined) queue.enQueue(node.right);
      }
    }
    return false;
  }
  traversal(visitor: (key: K, value: V) => boolean): void {
    if (this._size === 0) return;
    for (let i = 0, len = this._capacity; i < len; i++) {
      const root = this._table[i];
      if (root === undefined) continue;
      levelOrder(visitor, root);
    }
  }
  print(): void {
    if (this._size == 0) return;
    const _table = this._table;
    for (let i = 0, len = this._capacity; i < len; i++) {
      const root: Node<K, V> = _table[i];
      if (root === undefined) continue;
      console.log("【index = " + i + "】");
      BinaryTreesPrinter.print({
        _printerRoot(): object {
          return root;
        },
        _printerLeft(node: object): any {
          return (node as Node<K, V>).left;
        },
        _printerRight(node: object): any {
          return (node as Node<K, V>).right;
        },
        _printerString(node: object): string {
          const myNode = node as Node<K, V>;
          let parentString = "undefined";
          if (myNode.parent !== undefined)
            parentString = toString(myNode.parent.key);
          return toString(myNode) + "_P(" + parentString + ")";
        }
      });
      console.log("---------------------------------------------------");
    }
  }
  put(key: K, value: V): V | undefined {
    this.resize();
    const index = this.index(key);
    let root = this._table[index];
    if (root === undefined) {
      root = this.createNode(key, value);
      this._table[index] = root;
      this._size++;
      this.fixAfterPut(root);
      return undefined;
    }
    let parent = root;
    let node: Node<K, V> | undefined = root;
    let cmp = 0;
    const k1 = key;
    const h1 = hashCode(k1);
    let result: Node<K, V> | undefined;
    let searched = false;
    do {
      parent = node;
      const k2 = node.key;
      const h2 = node.hash;
      if (h1 > h2) {
        cmp = 1;
      } else if (h1 < h2) {
        cmp = -1;
      } else if (equals(k1, k2)) {
        cmp = 0;
      } else if (
        k1 !== undefined &&
        k2 !== undefined &&
        isIComparable(k1) &&
        getClassName(k1) === getClassName(k2) &&
        (cmp = k1.compareTo(k2)) !== 0
      ) {
      } else if (searched) {
        cmp = 1;
      } else {
        if (
          (node.left !== undefined &&
            (result = this.node(k1, node.left)) !== undefined) ||
          (node.right !== undefined &&
            (result = this.node(k1, node.right)) !== undefined)
        ) {
          node = result;
          cmp = 0;
        } else {
          searched = true;
          cmp = 1;
        }
      }
      if (cmp > 0) {
        node = node.right;
      } else if (cmp < 0) {
        node = node.left;
      } else {
        const oldValue = node.value;
        node.key = key;
        node.value = value;
        node.hash = h1;
        return oldValue;
      }
    } while (node !== undefined);
    const newNode = this.createNode(key, value, parent);
    if (cmp > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this._size++;
    this.fixAfterPut(newNode);
    return undefined;
  }
  remove(key: K): V | undefined {
    return this._removeReturnValue(this.node(key));
  }
  removeBoolean(key: K): boolean {
    return this._removeReturnBoolean(this.node(key));
  }
  private resize(): void {
    const _capacity = this._capacity;
    if (this._size / _capacity <= DEFAULT_LOAD_FACTOR) return;
    const oldTable = this._table;
    this._table = [];
    this._capacity = _capacity << 1;
    const queue = new Queue<Node<K, V>>();
    for (let i = 0; i < _capacity; i++) {
      if (oldTable[i] === undefined) continue;
      queue.enQueue(oldTable[i] as Node<K, V>);
      while (!queue.isEmpty()) {
        const node = queue.deQueue();
        if (node.left !== undefined) queue.enQueue(node.left);
        if (node.right !== undefined) queue.enQueue(node.right);
        this.moveNode(node);
      }
    }
  }
  private moveNode(newNode: Node<K, V>): void {
    newNode.parent = undefined;
    newNode.left = undefined;
    newNode.right = undefined;
    newNode.color = ColorEnum.RED;
    const index = this.index(newNode);
    let root = this._table[index];
    if (root === undefined) {
      root = newNode;
      this._table[index] = newNode;
      this.fixAfterPut(root);
      return;
    }
    let parent = root;
    let node: Node<K, V> | undefined = root;
    let cmp = 0;
    const k1 = newNode.key;
    const h1 = newNode.hash;
    do {
      parent = node;
      const k2 = node.key;
      const h2 = node.hash;
      if (h1 > h2) {
        cmp = 1;
      } else if (h1 < h2) {
        cmp = -1;
      } else if (
        k1 !== undefined &&
        k2 !== undefined &&
        isIComparable(k1) &&
        getClassName(k1) === getClassName(k2) &&
        (cmp = k1.compareTo(k2)) !== 0
      ) {
      } else {
        cmp = 1;
      }
      if (cmp > 0) {
        node = node.right;
      } else {
        node = node.left;
      }
    } while (node !== undefined);
    newNode.parent = parent;
    if (cmp > 0) {
      parent.right = newNode;
    } else {
      parent.left = newNode;
    }
    this.fixAfterPut(newNode);
  }
  private fixAfterPut(node: Node<K, V>): void {
    const parent = node.parent;
    if (parent === undefined) {
      black(node);
      return;
    }
    if (isBlack(parent)) return;
    const uncle = parent.sibling();
    const grand = red(parent.parent) as Node<K, V>;
    if (isRed(uncle)) {
      black(parent);
      black(uncle);
      this.fixAfterPut(grand);
      return;
    }
    if (parent.isLeftChild()) {
      if (node.isLeftChild()) {
        black(parent);
      } else {
        black(node);
        this.rotateLeft(parent);
      }
      this.rotateRight(grand);
    } else {
      if (node.isLeftChild()) {
        black(node);
        this.rotateRight(parent);
      } else {
        black(parent);
      }
      this.rotateLeft(grand);
    }
  }
  private _remove(node: Node<K, V>): void {
    const willNode = node;
    this._size--;
    if (node.hasTwoChildren()) {
      const s = this.successor(node);
      node.key = s.key;
      node.value = s.value;
      node.hash = s.hash;
      node = s;
    }
    const replacement = node.left !== undefined ? node.left : node.right;
    const index = this.index(node);
    if (replacement !== undefined) {
      replacement.parent = node.parent;
      if (node.parent === undefined) {
        this._table[index] = replacement;
      } else if (node.isLeftChild()) {
        node.parent.left = replacement;
      } else {
        node.parent.right = replacement;
      }
      this.fixAfterRemove(replacement);
    } else if (node.parent === undefined) {
      Reflect.deleteProperty(this._table, index);
    } else {
      if (node.isLeftChild()) {
        node.parent.left = undefined;
      } else {
        node.parent.right = undefined;
      }
      this.fixAfterRemove(node);
    }
    this.afterRemove(willNode, node);
  }
  private _removeReturnValue(node: Node<K, V> | undefined): V | undefined {
    if (node === undefined) return undefined;
    const oldValue = node.value;
    this._remove(node);
    return oldValue;
  }
  private _removeReturnBoolean(node: Node<K, V> | undefined): boolean {
    if (node === undefined) return false;
    this._remove(node);
    return true;
  }
  private fixAfterRemove(node: Node<K, V>): void {
    if (isRed(node)) {
      black(node);
      return;
    }
    const parent = node.parent;
    if (parent === undefined) return;
    const left = parent.left === undefined || node.isLeftChild();
    let sibling: Node<K, V> = left
      ? (parent.right as Node<K, V>)
      : (parent.left as Node<K, V>);
    if (left) {
      if (isRed(sibling)) {
        black(sibling);
        red(parent);
        this.rotateLeft(parent);
        sibling = parent.right as Node<K, V>;
      }
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const parentBlack = isBlack(parent);
        black(parent);
        red(sibling);
        if (parentBlack) this.fixAfterRemove(parent);
      } else {
        if (isBlack(sibling.right)) {
          this.rotateRight(sibling);
          sibling = parent.right as Node<K, V>;
        }
        color(sibling, colorOf(parent));
        black(sibling.right);
        black(parent);
        this.rotateLeft(parent);
      }
    } else {
      if (isRed(sibling)) {
        black(sibling);
        red(parent);
        this.rotateRight(parent);
        sibling = parent.left as Node<K, V>;
      }
      if (isBlack(sibling.left) && isBlack(sibling.right)) {
        const parentBlack = isBlack(parent);
        black(parent);
        red(sibling);
        if (parentBlack) this.fixAfterRemove(parent);
      } else {
        if (isBlack(sibling.left)) {
          this.rotateLeft(sibling);
          sibling = parent.left as Node<K, V>;
        }
        color(sibling, colorOf(parent));
        black(sibling.left);
        black(parent);
        this.rotateRight(parent);
      }
    }
  }
  protected afterRemove(willNode: Node<K, V>, removeNode: Node<K, V>): void {}
  protected createNode(
    key: K,
    value: V,
    parent: Node<K, V> | undefined = undefined
  ): Node<K, V> {
    return new Node<K, V>(key, value, parent);
  }
  private node(
    k1: K,
    node: Node<K, V> | undefined = undefined
  ): Node<K, V> | undefined {
    if (node === undefined) {
      const root = this._table[this.index(k1)];
      if (root == undefined) return undefined;
      else return this.node(k1, root);
    }
    const h1 = hashCode(k1);
    let result: Node<K, V> | undefined;
    let cmp = 0;
    while (node !== undefined) {
      const k2 = node.key;
      const h2 = node.hash;
      if (h1 > h2) {
        node = node.right;
      } else if (h1 < h2) {
        node = node.left;
      } else if (equals(k1, k2)) {
        return node;
      } else if (
        k1 !== undefined &&
        k2 !== undefined &&
        isIComparable(k1) &&
        getClassName(k1) === getClassName(k2) &&
        (cmp = k1.compareTo(k2)) != 0
      ) {
        node = cmp > 0 ? node.right : node.left;
      } else if (
        node.right !== undefined &&
        (result = this.node(k1, node.right)) !== undefined
      ) {
        return result;
      } else {
        node = node.left;
      }
    }
    return undefined;
  }
  private index(key: K): number;
  private index(node: Node<K, V>): number;
  private index(key: K | Node<K, V>): number {
    if (isIHash(key)) return hashCode(key) & (this._capacity - 1);
    return key.hash & (this._capacity - 1);
  }
  private rotateLeft(grand: Node<K, V>): void {
    const parent: Node<K, V> = grand.right as Node<K, V>;
    const child: Node<K, V> | undefined = parent.left;
    grand.right = child;
    parent.left = grand;
    this.afterRotate(grand, parent, child);
  }
  private rotateRight(grand: Node<K, V>): void {
    const parent: Node<K, V> = grand.left as Node<K, V>;
    const child: Node<K, V> | undefined = parent.right;
    grand.left = child;
    parent.right = grand;
    this.afterRotate(grand, parent, child);
  }
  private afterRotate(
    grand: Node<K, V>,
    parent: Node<K, V>,
    child: Node<K, V> | undefined
  ): void {
    parent.parent = grand.parent;
    if (grand.isLeftChild()) {
      (grand.parent as Node<K, V>).left = parent;
    } else if (grand.isRightChild()) {
      (grand.parent as Node<K, V>).right = parent;
    } else {
      this._table[this.index(grand)] = parent;
    }
    if (child !== undefined) child.parent = grand;
    grand.parent = parent;
  }
  public getNode(key: K): Node<K, V> | undefined {
    return this.node(key);
  }
  public successor(node: Node<K, V>): Node<K, V> {
    let p = node.right;
    if (p !== undefined) {
      while (p.left != undefined) p = p.left;
      return p;
    }
    while (node.isRightChild()) node = node.parent as Node<K, V>;
    return node.parent as Node<K, V>;
  }
}
