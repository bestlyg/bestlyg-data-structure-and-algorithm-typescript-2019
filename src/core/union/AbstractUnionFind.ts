import IUnionFind from "./IUnionFind";
import { error } from "../../utils";
export default abstract class AbstractUnionFind implements IUnionFind {
  protected _parents: number[];
  constructor(capacity: number) {
    if (capacity < 0) error("capacity must be >= 1");
    this._parents = new Array<number>(capacity);
    for (let i = 0; i < capacity; i++) this._parents[i] = i;
  }
  abstract find(v: number): number;
  abstract union(v1: number, v2: number): void;
  public isSame(v1: number, v2: number): boolean {
    return this.find(v1) === this.find(v2);
  }
  protected rangeCheck(v: number): void {
    if (v < 0 || v >= this._parents.length) error("v is out of bounds");
  }
}
