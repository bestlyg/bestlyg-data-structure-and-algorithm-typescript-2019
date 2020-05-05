import { Hash } from "../../types";
import { getClassName } from "..";

export default class MyHash implements Hash {
  private _value = 0;
  constructor(value: number) {
    this._value = value;
  }
  get value(): number {
    return this._value;
  }
  toString(): string {
    return `Hash_number:${this._value}`;
  }
  hashCode(): number {
    return 0;
  }
  equals(obj: any): boolean {
    if (obj === this) return true;
    if (obj === null || getClassName(this) != getClassName(obj)) return false;
    return (obj as MyHash).value === this.value;
  }
}
