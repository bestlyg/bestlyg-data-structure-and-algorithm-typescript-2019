import { Key } from ".";
import { getClassName } from "..";
import SubKey1 from "./SubKey1";

export default class SubKey2 extends Key {
  equals(obj: any): boolean {
    if (obj === this) return true;
    if (
      obj === null ||
      (getClassName(obj) !== SubKey1.name && getClassName(obj) !== SubKey2.name)
    )
      return false;
    return (obj as SubKey2).value === this.value;
  }
}
