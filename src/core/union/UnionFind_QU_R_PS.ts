import UnionFind_QU_R from "./UnionFind_QU_R";
/**
 * Quick Union - 基于rank的优化 - 路径分裂(Path Spliting)
 */
export default class UnionFind_QU_R_PS extends UnionFind_QU_R {
  find(v: number): number {
    this.rangeCheck(v);
    while (v !== this._parents[v]) {
      const p = this._parents[v];
      this._parents[v] = this._parents[this._parents[v]];
      v = p;
    }
    return v;
  }
}
