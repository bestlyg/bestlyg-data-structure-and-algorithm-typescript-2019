import { Hash, Comparable } from "../types";
function timePrint(fn: Function, name = "Function"): void {
  const timeTag: string = "Time -> " + name;
  console.time(timeTag);
  fn();
  console.timeEnd(timeTag);
}
function timeString(fn: Function): number {
  const start = new Date().getTime();
  fn();
  return new Date().getTime() - start;
}
function error(string: string): never {
  throw new Error(string);
}
function warn(string: string): void {
  console.warn(`Here's a Warn : ${string}`);
}
function thorwEmptyError(struct: string) {
  return function (method: string): never {
    return error(`${struct} is Empty can not use the Method: ${method}`);
  };
}
function isNumber(number: any): number is number {
  if (number === null) return false;
  return typeof number === "number";
}
function isBoolean(boolean: any): boolean is boolean {
  if (boolean === null) return false;
  return typeof boolean === "boolean";
}
function isString(string: any): string is string {
  if (string === null) return false;
  return typeof string == "string";
}
function isObject(object: any): object is object {
  if (object === null) return false;
  return typeof object == "object";
}
function isIHash(obj: any): obj is Hash {
  if (obj === null) return false;
  return obj.hashCode && obj.equals;
}
function isIComparable<T>(obj: any): obj is Comparable<T> {
  if (obj === null) return false;
  return obj.compareTo;
}
function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}
type padType = "Start" | "End";
function padCompletion(
  string: string,
  count: number,
  padString: string,
  type: padType = "Start"
): string {
  return string["pad" + type](count, padString);
}
function repeat(string: string, count: number): string {
  if (count <= 0) return "";
  return padCompletion("", count, string);
}
function blank(count: number): string {
  return repeat(" ", count);
}
function numberString(number: number): string {
  if (number < 10000) return (number / 1.0).toFixed(2) + "次";
  if (number < 100000000) return (number / 10000).toFixed(2) + "万";
  return (number / 100000000).toFixed(2) + "亿";
}
function toString(val): string {
  return String(val);
}
function toUint32(x: any): number {
  return x >>> 0;
}
function hashCode(obj: any): number {
  if (isString(obj)) {
    let hash = 0;
    const len = obj.length;
    if (len == 0) return hash;
    for (let i = 0; i < len; i++) {
      const char = obj.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }
  if (isBoolean(obj)) return obj ? 1231 : 1237;
  if (isIHash(obj)) return obj.hashCode();
  return toUint32(obj);
}
function getClassName(obj: any): string {
  if (!isObject(obj)) return "";
  return obj.constructor.name;
}
function equals(a: any, b: any): boolean {
  if (isIHash(a)) return a.equals(b);
  return a === b;
}
function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export {
  //Type protection
  isNumber,
  isString,
  isBoolean,
  isObject,
  isIComparable,
  isIHash,
  //other
  extend,
  timePrint,
  timeString,
  toString,
  numberString,
  padCompletion,
  repeat,
  blank,
  hashCode,
  error,
  warn,
  thorwEmptyError,
  toUint32,
  getClassName,
  equals,
  random
};
