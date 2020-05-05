import Set from "./ISet";
import Map from "../map/IMap";
import TreeMap from "../map/TreeMap";
import { Comparator } from "../../types";
/**
 * 内置TreeMap
 */
export default class TreeSet<T> implements Set<T> {
  private _map: Map<T, null>;
  constructor(comparator: Comparator<T>) {
    this._map = new TreeMap<T, null>(comparator);
  }
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
    this._map.put(element, null);
  }
  remove(element: T): void {
    this._map.remove(element);
  }
  traversal(visitor: (element: T) => boolean): void {
    this._map.traversal(visitor);
  }
}
