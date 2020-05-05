import { Key } from ".";
import { getClassName } from "..";
import SubKey2 from "./SubKey2";

export default class SubKey1 extends Key {
  equals(obj: any): boolean {
    if (obj === this) return true;
    if (
      obj === null ||
      (getClassName(obj) !== SubKey1.name && getClassName(obj) !== SubKey2.name)
    )
      return false;
    return (obj as SubKey1).value === this.value;
  }
}
