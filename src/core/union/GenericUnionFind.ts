import HashMap from "../hash/HashMap";
import { Hash } from "../../types";
import { equals } from "../../utils";
class Node<V> {
  parent: Node<V> = this;
  rank = 1;
  constructor(public value: V) {}
}
export default class GenericUnionFind<V extends Hash> {
  private _nodes = new HashMap<V, Node<V>>();
  makeSet(v: V): void {
    if (this._nodes.containsKey(v)) return;
    this._nodes.put(v, new Node<V>(v));
  }
  private findNode(v: V): undefined | Node<V> {
    let node = this._nodes.get(v);
    if (node === undefined) return undefined;
    while (!equals(node.value, node.parent.value)) {
      node.parent = node.parent.parent;
      node = node.parent;
    }
    return node;
  }
  find(v: V): undefined | V {
    const node = this.findNode(v);
    return node === undefined ? undefined : node.value;
  }
  union(v1, v2): void {
    const p1 = this.findNode(v1);
    const p2 = this.findNode(v2);
    if (p1 === undefined || p2 === undefined) return;
    if (equals(p1, p2)) return;
    if (p1.rank < p2.rank) {
      p1.parent = p2;
    } else if (p1.rank > p2.rank) {
      p2.parent = p1;
    } else {
      p1.parent = p2;
      p2.rank += 1;
    }
  }
  isSame(v1: V, v2: V): boolean {
    return equals(this.find(v1), this.find(v2));
  }
}
