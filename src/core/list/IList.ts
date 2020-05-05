/**
 * @type 列表接口
 */
export default interface List<T> {
  /**
   * 清除所有元素
   */
  clear(): void;
  /**
   * 返回节点的数量
   * @return {number}
   */
  size(): number;
  /**
   * 是否为空
   * @return {boolean}
   */
  isEmpty(): boolean;
  /**
   * 是否包含某个元素
   * @param {T} element 元素类型
   * @return {boolean} true|false
   */
  contains(element: T): boolean;
  /**
   * 在index位置插入元素
   * @param {T} element 插入元素值
   * @param {number} index 插入的位置下标
   * @return {void}
   */
  add(element: T, index?: number): void;
  /**
   * 获index位置的元素
   * @param {number} index 元素的下标
   * @return {T} 返回index位置的元素
   */
  get(index: number): T;
  /**
   * 设置index位置的元素
   * @param {number} index 元素的下标
   * @param {T} element 更改的值
   * @return 原来的元素
   */
  set(index: number, element: T): T;
  /**
   * 删除元素
   * 当传入元素下标返回删除的节点值
   * @param {number} element 传入元素的下标
   * @return {T} 删除成功返回值
   */
  remove(index: number): T;
  /**
   * 获取元素的index
   * @param {T} element 元素的值
   * @return {number} 元素的下标，若不存在返回-1
   */
  indexOf(element: T): number;
  /**
   * 获取头节点
   * @return {T} 返回节点的值
   */
  first(): T;
  /**
   * 在头部添加一个节点
   * @param {T} element 节点的值
   */
  addFirst(element: T): void;
  /**
   * 删除头节点
   * @return {T} 返回删除的节点值
   */
  delFirst(): T;
  /**
   * 获取尾元素
   * @return {T} 返回节点值
   */
  last(): T;
  /**
   * 在尾部添加一个元素
   * @param {T} element 值
   */
  addLast(element: T): void;
  /**
   * 删除尾元素
   * @return {T} 返回删除的元素
   */
  delLast(): T;
}
