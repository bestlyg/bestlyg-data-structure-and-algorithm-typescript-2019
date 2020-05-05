import List from "../core/list/IList";
import Queue from "../core/queue/IQueue";
import Deque from "../core/queue/IDeque";
import Stack from "../core/stack/IStack";
import BinaryTree from "../core/tree/IBinaryTree";
import Set from "../core/set/ISet";
import Map from "../core/map/IMap";
import Heap from "../core/heap/IHeap";
import Trie from "../core/trie/ITrie";
import UnionFind from "../core/union/IUnionFind";
import Graph from "../core/graph/IGraph";
import WeightManager from "../core/graph/WeightManager";
import EdgeInfo from "../core/graph/EdgeInfo";
import PathInfo from "../core/graph/PathInfo";
const ELEMENT_NOT_FOUND = -1;
type Comparator<T> = (el1: T, el2: T) => number;
interface Sort {
  readonly name: string;
  readonly swapCount: number;
  readonly compareCount: number;
  readonly time: number;
  readonly array: number[];
  readonly string: string;
  readonly toString: Function;
}
interface Hash {
  hashCode(): number;
  equals(obj: any): boolean;
}
interface Comparable<T> {
  compareTo(obj: T): number;
}
interface BinaryTreesPrinter {
  /**
   * 根节点
   */
  _printerRoot(): any;
  /**
   * 左节点
   * @param {any} node
   * @return {any | null}
   */
  _printerLeft(node: any): any;
  /**
   * 右节点
   * @param {any} node
   * @return {any | null}
   */
  _printerRight(node: any): any;
  /**
   * 输出节点的方式
   * @param {any} node
   * @return {string}
   */
  _printerString(node: any): string;
}
enum Mst {
  prim,
  kruskal
}
enum SingleShortestPath {
  dijkstra,
  bellmanFord
}
export {
  List,
  Queue,
  Deque,
  Stack,
  Set,
  BinaryTree,
  Map,
  Heap,
  Trie,
  Hash,
  UnionFind,
  Graph,
  WeightManager,
  EdgeInfo,
  PathInfo,
  Comparable,
  BinaryTreesPrinter,
  ELEMENT_NOT_FOUND,
  Comparator,
  Sort,
  Mst,
  SingleShortestPath
};
