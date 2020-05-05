import Node from "./Node";
export default interface BinaryTree<T> {
  /**
   * 返回树的大小
   * @return {number} 返回树的大小
   */
  size(): number;
  /**
   * 判断树是否为空
   * @return {boolean} true|false
   */
  isEmpty(): boolean;
  clear(): void;
  /**
   * 添加元素
   * @param {T} element 元素的值
   */
  add(element: T): void;
  /**
   * 删除元素
   * @param {T} element 元素的值，若不存在则树不动
   */
  remove(element: T): void;
  /**
   * 判断该值是否在树中
   * @param {T} element 值
   * @return {boolean} true|false
   */
  contains(element: T): boolean;
  /**
   * 获取值所在的节点
   * @param {T} element 值
   * @return {Node<T>|undefined} 返回节点或undefined
   */
  get(element: T): Node<T> | undefined;
  /**
   * 前序遍历
   * @param {(Element:T)=>boolean} visitor 遍历监视器 函数返回false时停止遍历
   */
  preorder(visitor: (element: T) => boolean): void;
  /**
   * 中序遍历
   * @param {(Element:T)=>boolean} visitor 遍历监视器 函数返回false时停止遍历
   */
  inorder(visitor: (element: T) => boolean): void;
  /**
   * 后序遍历
   * @param {(Element:T)=>boolean} visitor 遍历监视器 函数返回false时停止遍历
   */
  postorder(visitor: (element: T) => boolean): void;
  /**
   * 层序遍历
   * @param {(Element:T)=>boolean} visitor 遍历监视器 函数返回false时停止遍历
   */
  levelOrder(visitor: (element: T) => boolean): void;
  /**
   * 判断是否为真二叉树
   * @return {boolean} true|false
   */
  isProper(): boolean;
  /**
   * 判断是否为满二叉树
   * @return {boolean} true|false
   */
  isFull(): boolean;
  /**
   * 判断是否为完全二叉树
   * @return {boolean} true|false
   */
  isComplete(): boolean;
  /**
   * 返回树的高度
   */
  height(): number;
  /**
   * 获取前驱节点
   * @param {Node<T>} node 节点
   * @return {Node<T>|undefined} 返回前驱节点或undefined
   */
  predecessor(node: Node<T>): Node<T> | undefined;
  /**
   * 获取后继结点
   * @param {Node<T>} node 节点
   * @return {Node<T>|undefined} 返回前驱节点或undefined
   */
  successor(node: Node<T>): Node<T> | undefined;
}
