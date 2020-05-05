export default interface Trie<V> {
  /**
   * 返回前序树的节点数
   * @return {number} 节点数
   */
  size(): number;
  /**
   * 判断前序树是否为空
   * @return {boolean} true|false
   */
  isEmpty(): boolean;
  /**
   * 清空前序树
   */
  clear(): void;
  /**
   * 通过key获取key所对应的值
   * @param {string} key 字符串
   * @returns {V | undefined} 若存在则返回值不存在则返回undefined
   */
  get(key: string): V | undefined;
  /**
   * 判断key是否存在树种
   * @param {string} key 字符串
   * @return {boolean} true|false
   */
  contains(key: string): boolean;
  /**
   * 添加key和所对应的值
   * @param {string} key 字符串
   * @param {V} value 值
   * @returns {V | undefined} 若该字符串存在则覆盖值并返回原值，不存在则返回undefined
   */
  add(key: string, value: V): V | undefined;
  /**
   * 删除key
   * @param {string} key 字符串
   * @returns {V | undefined} 若该字符串存在则返回值，不存在则返回undefined
   */
  remove(key: string): V | undefined;
  /**
   * 判断树中是否包含含有该前缀的key
   * @param {string} prefix 字符串
   * @return {boolean} true|false
   */
  startsWith(prefix: string): boolean;
}
