import ISet from "../set/ISet";
import HashMap from "./HashMap";
import { Hash } from "../../types";
import { toString } from "../../utils";
/**
 * 内置HashMap
 */
export default class HashSet<T extends Hash> implements ISet<T> {
  private _map: HashMap<T, undefined> = new HashMap<T, undefined>();
  size(): number {
    return this._map.size();
  }
  isEmpty(): boolean {
    return this._map.isEmpty();
  }
  clear(): void {
    this._map.clear();
  }
  contains(element: T): boolean {
    return this._map.containsKey(element);
  }
  add(element: T): void {
    this._map.put(element, undefined);
  }
  remove(element: T): void {
    this._map.remove(element);
  }
  removeBoolean(element: T): boolean {
    return this._map.removeBoolean(element);
  }
  traversal(visitor: (element: T) => boolean): void {
    this._map.traversal(visitor);
  }
  toString(): string {
    let string = "";
    this._map.traversal((key) => {
      string += key + ",";
      return false;
    });
    string = string.substring(0, string.length - 1);
    return string;
  }
}
