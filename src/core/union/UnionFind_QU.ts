import AbstractUnionFind from "./AbstractUnionFind";
/**
 * Quick Union
 */
export default class UnionFind_QU extends AbstractUnionFind {
  find(v: number): number {
    this.rangeCheck(v);
    while (v != this._parents[v]) v = this._parents[v];
    return v;
  }
  union(v1: number, v2: number): void {
    const p1 = this.find(v1);
    const p2 = this.find(v2);
    if (p1 === p2) return;
    this._parents[p1] = p2;
  }
}
