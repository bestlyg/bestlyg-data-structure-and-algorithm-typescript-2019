import { error, random as randomNumber, toString } from "./index";
/**
 * 根据条件返回数组
 * @param count 数组大小
 * @param min 最小值
 * @param max 最大值
 */
export function random(count: number, min: number, max: number): number[] {
  if (count <= 0 || min > max) error("count > 0 , min < max");
  const array = new Array(count);
  for (let i = 0; i < count; i++) {
    array[i] = randomNumber(min, max);
  }
  return array;
}
/**
 * 返回一个含有相同元素的数组
 * @param count
 * @param number
 */
export function same(count: number, number = 0): number[] {
  if (count <= 0) error("count > 0");
  return new Array(count).fill(number);
}
/**
 * 根据最小值和最大值返回正序数组
 * @param min 最小值
 * @param max 最大值
 */
export function ascOrder(min: number, max: number): number[] {
  if (min > max) error("min < max");
  const len = max - min + 1;
  const array = new Array(len);
  for (let i = 0; i < len; i++) {
    array[i] = min++;
  }
  return array;
}
/**
 * 根据最小值和最大值返回倒序数组
 * @param min 最小值
 * @param max 最大值
 */
export function descOrder(min: number, max: number): number[] {
  if (min > max) error("min < max");
  const len = max - min + 1;
  const array = new Array(len);
  for (let i = 0; i < len; i++) {
    array[i] = max--;
  }
  return array;
}
/**
 * 浅复制数组
 * @param array
 */
export function copy(array: number[]): number[] {
  return [...array];
}
/**
 * 判断数组是否正序
 * @param array
 */
export function isAscOrder(array: number[]): boolean {
  if (array.length === 0) return false;
  for (let i = 1; i < array.length; i++)
    if (array[i - 1] > array[i]) return false;
  return true;
}
/**
 * 判断数组是否逆序
 * @param array
 */
export function isDescOrder(array: number[]): boolean {
  if (array.length === 0) return false;
  for (let i = 1; i < array.length; i++)
    if (array[i - 1] < array[i]) return false;
  return true;
}
export function isSame<T>(array1: T[], array2: T[]): boolean {
  const len1 = array1.length,
    len2 = array2.length;
  if (len1 !== len2) return false;
  for (let i = 0; i < len1; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}
/**
 * 输出数组
 * @param array
 */
export function print<T>(array: T[]): void {
  let string = "Array:[";
  for (let i = 0, len = array.length; i < len; i++) {
    if (i !== 0) string += ",";
    string += toString(array[i]);
  }
  string += "]";
  console.log(string);
}
