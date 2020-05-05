import UnionFind_QU_R from "./UnionFind_QU_R";
/**
 * Quick Union - 基于rank的优化 - 路径压缩(Path Compression)
 */
export default class UnionFind_QU_R_PC extends UnionFind_QU_R {
  find(v: number): number {
    this.rangeCheck(v);
    if (this._parents[v] !== v) this._parents[v] = this.find(this._parents[v]);
    return this._parents[v];
  }
}
