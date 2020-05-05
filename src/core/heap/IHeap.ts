export default interface Heap<T> {
  /**
   * 获取堆大小
   * @return {number} 返回堆的大小
   */
  size(): number;
  /**
   * 判断堆是否为空
   * @return {boolean} true|false
   */
  isEmpty(): boolean;
  /**
   * 清空堆
   */
  clear(): void;
  /**
   * 往堆中添加元素
   * @param {T} element 元素的值
   */
  add(element: T): void;
  /**
   * 获取堆顶元素
   * @return {T} 堆顶元素
   */
  get(): T;
  /**
   * 移除堆顶元素
   * @return {T} 堆顶元素
   */
  remove(): T;
  /**
   * 移除对顶元素并向堆顶元素添加新元素element
   * @param element
   * @return {T|undefined} 堆顶元素 若堆为空则返回undefined
   */
  replace(element: T): T | undefined;
}
