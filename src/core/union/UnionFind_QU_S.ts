import UnionFind_QU from "./UnionFind_QU";
/**
 * Quick Union - 基于size的优化
 */
export default class UnionFind_QU_S extends UnionFind_QU {
  private _sizes: number[];
  /* istanbul ignore next */
  constructor(capacity: number) {
    super(capacity);
    this._sizes = new Array<number>(capacity).fill(1);
  }
  union(v1: number, v2: number): void {
    const p1 = this.find(v1);
    const p2 = this.find(v2);
    if (p1 === p2) return;
    if (this._sizes[p1] < this._sizes[p2]) {
      this._parents[p1] = p2;
      this._sizes[p2] += this._sizes[p1];
    } else {
      this._parents[p2] = p1;
      this._sizes[p1] += this._sizes[p2];
    }
  }
}
