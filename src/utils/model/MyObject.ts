export default class MyObject {
  private _value = 0;
  constructor(value: number) {
    this._value = value;
  }
  get value(): number {
    return this._value;
  }
}
