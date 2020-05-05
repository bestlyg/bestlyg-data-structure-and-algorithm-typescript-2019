import WeightManager from "./WeightManager";
import EdgeInfo from "./EdgeInfo";
import { Hash, SingleShortestPath } from "../../types";
import Graph from "./IGraph";
import PathInfo from "./PathInfo";
import HashMap from "../hash/HashMap";
export default abstract class AbstractGraph<V extends Hash, E>
  implements Graph<V, E> {
  constructor(protected _weightManager: WeightManager<E>) {}
  abstract edgesSize(): number;
  abstract verticesSize(): number;
  abstract addVertex(v: V): void;
  abstract addEdge(from: V, to: V, weight?: E): void;
  abstract removeVertex(v: V): void;
  abstract removeEdge(from: V, to: V): void;
  abstract bfs(begin: V, visitor: (v: V) => boolean): void;
  abstract dfs(begin: V, visitor: (v: V) => boolean): void;
  abstract topologicalSort(): V[];
  abstract mst(): Set<EdgeInfo<V, E>>;
  abstract shortestPathSingle(
    begin: V,
    type?: SingleShortestPath
  ): HashMap<V, PathInfo<V, E>> | undefined;
  abstract shortestPathMulti():
    | HashMap<V, HashMap<V, PathInfo<V, E>>>
    | undefined;
}
