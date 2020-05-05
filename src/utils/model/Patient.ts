export default class Patient {
  private _name: string;
  private _boneBreak: number;
  constructor(name: string, boneBreak: number) {
    this._name = name;
    this._boneBreak = boneBreak;
  }
  get name(): string {
    return this._name;
  }
  get boneBreak(): number {
    return this._boneBreak;
  }
  toString(): string {
    return `Patient name:${this._name} boneBreak:${this._boneBreak}`;
  }
}
