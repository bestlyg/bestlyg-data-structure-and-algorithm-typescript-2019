import IStack from "./IStack";
import { thorwEmptyError } from "../../utils";
/**
 * @constructor
 * @type 栈
 */
export default class Stack<T> implements IStack<T> {
  private list: T[] = new Array<T>();
  /**
   * 清空栈
   */
  public clear(): void {
    this.list.length = 0;
  }
  /**
   * 获取栈的大小
   * @return {number} 返回大小
   */
  public size(): number {
    return this.list.length;
  }
  /**
   * 判断栈是否为空
   *@return {boolean} true|false
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }
  /**
   * 压栈
   * @param {T} element 压栈的元素
   */
  public push(element: T): void {
    this.list.push(element);
  }
  /**
   * 出栈
   * @return {T} 出栈的元素
   */
  public pop(): T {
    this.thorwEmpty("pop");
    return this.list.pop() as T;
  }
  /**
   * 返回栈顶的元素
   * @return {T} 返回栈顶元素的值
   */
  public top(): T {
    return this.list[this.size() - 1];
  }
  private thorwEmpty(method: string): void {
    if (this.isEmpty()) {
      thorwEmptyError("Stack")(method);
    }
  }
}
