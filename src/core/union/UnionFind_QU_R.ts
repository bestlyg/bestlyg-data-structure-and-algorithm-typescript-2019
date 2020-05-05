import UnionFind_QU from "./UnionFind_QU";
/**
 * Quick Union - 基于rank的优化
 */
export default class UnionFind_QU_R extends UnionFind_QU {
  private ranks: number[];
  /* istanbul ignore next */
  constructor(capacity: number) {
    super(capacity);
    this.ranks = new Array<number>(capacity).fill(1);
  }
  union(v1: number, v2: number): void {
    const p1 = this.find(v1);
    const p2 = this.find(v2);
    if (p1 === p2) return;
    if (this.ranks[p1] < this.ranks[p2]) {
      this._parents[p1] = p2;
    } else if (this.ranks[p2] < this.ranks[p1]) {
      this._parents[p2] = p1;
    } else {
      this._parents[p1] = p2;
      this.ranks[p2]++;
    }
  }
}
