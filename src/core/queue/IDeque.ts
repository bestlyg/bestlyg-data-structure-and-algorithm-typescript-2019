import Queue from "./IQueue";
/**
 * @type 双端队列接口
 */
export default interface Deque<T> extends Queue<T> {
  /**
   * 尾部入队
   * @param {T} element 入队的值
   */
  enQueueRear(element: T): void;
  /**
   * 头部入队
   * @param {T} element 入队的值
   */
  enQueueFront(element: T): void;
  /**
   * 尾部出队
   * @return {T} 出队节点的值
   */
  deQueueRear(): T;
  /**
   * 头部出队
   * @return {T} 出队节点的值
   */
  deQueueFront(): T;
  /**
   * 查看尾元素
   * @return {T} 尾节点的值
   */
  rear(): T;
}
