import { Comparable, Hash } from "../../types";
import { hashCode as hash, getClassName } from "../index";
export default class MyNumber implements Comparable<MyNumber>, Hash {
  private _number: number;
  constructor(number: number) {
    this._number = number;
  }
  get number(): number {
    return this._number;
  }
  hashCode(): number {
    return hash(this._number);
  }
  equals(obj: any): boolean {
    if (obj === this) return true;
    if (obj === null || getClassName(this) !== getClassName(obj)) return false;
    return (obj as MyNumber).number === this._number;
  }
  compareTo(obj: MyNumber): number {
    return this.number - obj.number;
  }
  public toString(): string {
    return `Number value:${this._number}`;
  }
}
