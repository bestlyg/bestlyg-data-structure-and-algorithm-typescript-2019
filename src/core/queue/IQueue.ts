/**
 * @type 队列接口
 */
export default interface Queue<T> {
  /**
   * 获取队列长度
   * @return {T} 队列的长度
   */
  size(): number;
  /**
   * 判断是否为空
   * @return {boolean} true|false
   */
  isEmpty(): boolean;
  /**
   * 清空队列
   */
  clear(): void;
  /**
   * 入队
   * @param {T} element 节点的值
   */
  enQueue(element: T): void;
  /**
   * 出队
   * @return {T} 返回队头节点的值
   */
  deQueue(): T;
  /**
   * 查看头元素
   * @return {T} 返回队头节点的值
   */
  front(): T;
}
