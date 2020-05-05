/**
 * 集合 Set实现
 * Javascript中在es6中已新增Set
 */
export default interface Set<T> {
  /**
   * 返回集合元素数量
   * @return {number} 数量的值
   */
  size(): number;
  /**
   * 返回集合是否为空
   * @return {boolean} true|false
   */
  isEmpty(): boolean;
  /**
   * 清空集合
   */
  clear(): void;
  /**
   * 判断元素是否在集合内
   * @param {T} element 元素的值
   * @return {boolean} true|false
   */
  contains(element: T): boolean;
  /**
   * 添加元素
   * @param {T} element 元素的值
   */
  add(element: T): void;
  /**
   * 删除元素
   * @param {T} element 元素的值
   */
  remove(element: T): void;
  /**
   * 遍历集合
   * @param {Visitor<T>} visitor 遍历器 ((element: T) => boolean) & IVisitor;
   */
  traversal(visitor: (element: T) => boolean): void;
}
