import { Hash, Comparable } from "../../types";
import { getClassName } from "..";
export default class Key implements Hash, Comparable<Key> {
  protected _value: number;
  constructor(value: number) {
    this._value = value;
  }
  hashCode(): number {
    return 0;
    // return Math.floor(this.value / 10);
  }
  equals(obj: any): boolean {
    if (obj === this) return true;
    if (obj === null || getClassName(this) != getClassName(obj)) return false;
    return (obj as Key).value === this.value;
  }
  toString(): string {
    return "Key value:" + this.value;
  }
  compareTo(obj: Key): number {
    return this._value - obj._value;
  }
  get value(): number {
    return this._value;
  }
}
