export default interface Stack<T> {
  /**
   * 清空栈
   */
  clear(): void;
  /**
   * 获取栈的大小
   * @return {number} 返回大小
   */
  size(): number;
  /**
   * 判断栈是否为空
   *@return {boolean} true|false
   */
  isEmpty(): boolean;
  /**
   * 压栈
   * @param {T} element 压栈的元素
   */
  push(element: T): void;
  /**
   * 出栈
   * @return {T} 出栈的元素
   */
  pop(): T;
  /**
   * 返回栈顶的元素
   * @return {T} 返回栈顶元素的值
   */
  top(): T;
}
