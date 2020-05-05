import AbstractUnionFind from "./AbstractUnionFind";
/**
 * Quick Find
 */
export default class UnionFind_QF extends AbstractUnionFind {
  find(v: number): number {
    this.rangeCheck(v);
    return this._parents[v];
  }
  union(v1: number, v2: number): void {
    const p1 = this.find(v1);
    const p2 = this.find(v2);
    if (p1 === p2) return;
    for (let i = 0, len = this._parents.length; i < len; i++)
      if (this._parents[i] === p1) this._parents[i] = p2;
  }
}
