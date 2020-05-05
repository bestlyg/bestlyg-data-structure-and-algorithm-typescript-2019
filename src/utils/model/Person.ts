import { Comparable, Hash } from "../../types";
import { hashCode as hash, getClassName } from "../index";
export default class Person implements Comparable<Person>, Hash {
  private _age: number;
  private _name: string;
  constructor(name: string, age: number) {
    this._age = age;
    this._name = name;
  }
  get age(): number {
    return this._age;
  }
  get name(): string {
    return this._name;
  }
  hashCode(): number {
    let hashCode = hash(this._age);
    hashCode = hashCode * 31 + hash(this._name);
    return hashCode;
  }
  equals(obj: any): boolean {
    if (obj === this) return true;
    if (obj === null || getClassName(this) !== getClassName(obj)) return false;
    return (
      (obj as Person).age === this.age && (obj as Person).name === this.name
    );
  }
  compareTo(obj: Person): number {
    return this.age - obj.age;
  }
  public toString(): string {
    return `Person name:${this.name} age:${this.age}`;
  }
}
