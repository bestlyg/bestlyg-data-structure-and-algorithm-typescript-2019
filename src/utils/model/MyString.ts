import { Comparable, Hash } from "../../types";
import { hashCode as hash, getClassName } from "../index";
export default class MyString implements Comparable<MyString>, Hash {
  private _string: string;
  constructor(string: string) {
    this._string = string;
  }
  get string(): string {
    return this._string;
  }
  hashCode(): number {
    return hash(this._string);
  }
  equals(obj: any): boolean {
    if (obj === this) return true;
    if (obj === null || getClassName(this) !== getClassName(obj)) return false;
    return (obj as MyString).string === this._string;
  }
  compareTo(obj: MyString): number {
    return this.hashCode() - hash(obj);
  }
  public toString(): string {
    return `String value:${this._string}`;
  }
}
