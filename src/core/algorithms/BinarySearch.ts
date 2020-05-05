/**
 * 查找value在array中的位置索引，不存在则返回-1
 * @param array
 * @param value
 */
export function indexOf(array: number[], value: number): number {
  if (array.length === 0) return -1;
  let begin = 0;
  let end = array.length;
  while (begin < end) {
    const mid = (begin + end) >> 1;
    if (value < array[mid]) end = mid;
    else if (value > array[mid]) begin = mid + 1;
    else return mid;
  }
  return -1;
}
export function search(array: number[], value: number): number {
  if (array.length === 0) return -1;
  let begin = 0;
  let end = array.length;
  while (begin < end) {
    const mid = (begin + end) >> 1;
    if (value < array[mid]) end = mid;
    else begin = mid + 1;
  }
  return begin;
}
