export default class EdgeInfo<V, E> {
  constructor(private _from: V, private _to: V, private _weight: E) {}
  toString(): string {
    return `EdgeInfo [from=${this._from}, to=${this._to}, weight=${this._weight}]`;
  }
}
