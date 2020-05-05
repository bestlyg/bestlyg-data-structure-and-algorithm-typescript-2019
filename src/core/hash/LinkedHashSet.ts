import ISet from "../set/ISet";
import IMap from "../map/IMap";
import LinkedHashMap from "./LinkedHashMap";
import { Hash } from "../../types";
/**
 * 内置LinkedHashMap
 */
export default class LinkedHashSet<T extends Hash> implements ISet<T> {
  private _map: IMap<T, undefined> = new LinkedHashMap<T, undefined>();
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
  traversal(visitor: (element: T) => boolean): void {
    this._map.traversal(visitor);
  }
}
