import { Hash, SingleShortestPath } from "../../types";
import EdgeInfo from "./EdgeInfo";
import PathInfo from "./PathInfo";
import HashMap from "../hash/HashMap";
export default interface Graph<V extends Hash, E> {
  /**
   * 获取边的总数
   */
  edgesSize(): number;
  /**
   * 获取顶点的总数
   */
  verticesSize(): number;
  /**
   * 添加顶点
   * @param v 顶点
   */
  addVertex(v: V): void;
  /**
   * 添加边
   * @param from 边的起始顶点
   * @param to 边的终结顶点
   * @param weight 权重，可为空
   */
  addEdge(from: V, to: V, weight?: E): void;
  /**
   * 删除顶点
   * @param v 顶点
   */
  removeVertex(v: V): void;
  /**
   * 删除边
   * @param from 边的起始顶点
   * @param to 边的终结顶点
   */
  removeEdge(from: V, to: V): void;
  /**
   * 广度优先搜索
   * @param begin 起始点
   * @param visitor 遍历器
   */
  bfs(begin: V, visitor: (v: V) => boolean): void;
  /**
   * 深度优先搜索
   * @param begin 起始点
   * @param visitor 遍历器
   */
  dfs(begin: V, visitor: (v: V) => boolean): void;
  /**
   * 生成当前图的拓扑排序
   */
  topologicalSort(): V[];
  /**
   * 最小生成树
   * Minimum Spanning Tree
   */
  mst(): Set<EdgeInfo<V, E>>;
  /**
   * 单源最短路径
   * @param begin 起始点
   */
  shortestPathSingle(
    begin: V,
    type?: SingleShortestPath
  ): HashMap<V, PathInfo<V, E>> | undefined;
  /**
   * 多源最短路径
   */
  shortestPathMulti(): HashMap<V, HashMap<V, PathInfo<V, E>>> | undefined;
}
