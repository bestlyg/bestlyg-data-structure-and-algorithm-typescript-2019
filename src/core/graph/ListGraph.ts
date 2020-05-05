import AbstractGraph from "./Graph";
import EdgeInfo from "./EdgeInfo";
import HashSet from "../hash/HashSet";
import { Hash, Comparator, Mst, SingleShortestPath } from "../../types";
import { equals, toString, error } from "../../utils";
import HashMap from "../hash/HashMap";
import Queue from "../queue/Queue";
import Stack from "../stack/Stack";
import BinaryHeap from "../heap/BinaryHeap";
import GenericUnionFind from "../union/GenericUnionFind";
import PathInfo from "./PathInfo";
class Vertex<V extends Hash, E> implements Hash {
  inEdges: HashSet<Edge<V, E>> = new HashSet<Edge<V, E>>();
  outEdges: HashSet<Edge<V, E>> = new HashSet<Edge<V, E>>();
  constructor(public value: V) {}
  hashCode(): number {
    return this.value.hashCode();
  }
  equals(obj: any): boolean {
    return equals(this.value, (obj as Vertex<V, E>).value);
  }
  toString(): string {
    return this.value.toString();
  }
}
class Edge<V extends Hash, E> implements Hash {
  constructor(
    public from: Vertex<V, E>,
    public to: Vertex<V, E>,
    public weight: E
  ) {}
  info(): EdgeInfo<V, E> {
    return new EdgeInfo(this.from.value, this.to.value, this.weight);
  }
  hashCode(): number {
    return this.from.hashCode() * 31 + this.to.hashCode();
  }
  equals(obj: any): boolean {
    const edge: Edge<V, E> = obj as Edge<V, E>;
    return equals(this.from, edge.from) && equals(this.to, edge.to);
  }
  toString(): string {
    return `Edge [from=${this.from}, to=${this.to}, weight=${this.weight}]`;
  }
}
export default class ListGraph<V extends Hash, E> extends AbstractGraph<V, E> {
  private _vertices: HashMap<V, Vertex<V, E>> = new HashMap<V, Vertex<V, E>>();
  private _edges: HashSet<Edge<V, E>> = new HashSet<Edge<V, E>>();
  private _edgeComparator: Comparator<Edge<V, E>> = (
    e1: Edge<V, E>,
    e2: Edge<V, E>
  ) => this._weightManager.compare(e1.weight, e2.weight);
  print(): void {
    console.log("【顶点】");
    this._vertices.traversal((key: V, value: Vertex<V, E>) => {
      console.log("------Vertices  start------");
      console.log(toString(key));
      console.log("--【out】");
      console.log(toString(value.outEdges));
      console.log("--【in】");
      console.log(toString(value.inEdges));
      return false;
    });
    console.log("【边】");
    this._edges.traversal((el) => {
      console.log(toString(el));
      return false;
    });
  }
  edgesSize(): number {
    return this._edges.size();
  }
  verticesSize(): number {
    return this._vertices.size();
  }
  addVertex(v: V): void {
    if (this._vertices.containsKey(v)) return;
    this._vertices.put(v, new Vertex<V, E>(v));
  }
  addEdge(from: V, to: V, weight: E): void {
    let fromVertex: Vertex<V, E> | undefined = this._vertices.get(from);
    if (fromVertex === undefined) {
      fromVertex = new Vertex<V, E>(from);
      this._vertices.put(from, fromVertex);
    }
    let toVertex: Vertex<V, E> | undefined = this._vertices.get(to);
    if (toVertex === undefined) {
      toVertex = new Vertex<V, E>(to);
      this._vertices.put(to, toVertex);
    }
    const edge = new Edge<V, E>(fromVertex, toVertex, weight);
    if (fromVertex.outEdges.removeBoolean(edge)) {
      toVertex.inEdges.remove(edge);
      this._edges.remove(edge);
    }
    fromVertex.outEdges.add(edge);
    toVertex.inEdges.add(edge);
    this._edges.add(edge);
  }
  removeVertex(v: V): void {
    const vertex = this._vertices.remove(v);
    if (vertex === undefined) return;
    const temp: Edge<V, E>[] = [];
    vertex.outEdges.traversal((edge) => {
      edge.to.inEdges.remove(edge);
      temp.push(edge);
      this._edges.remove(edge);
      return false;
    });
    temp.forEach((edge) => vertex.outEdges.remove(edge));
    vertex.inEdges.traversal((edge) => {
      edge.from.outEdges.remove(edge);
      temp.push(edge);
      this._edges.remove(edge);
      return false;
    });
    temp.forEach((edge) => vertex.inEdges.remove(edge));
  }
  removeEdge(from: V, to: V): void {
    const fromVertex = this._vertices.get(from);
    if (fromVertex === undefined) return;
    const toVertex = this._vertices.get(to);
    if (toVertex === undefined) return;
    const edge = new Edge<V, E>(
      fromVertex,
      toVertex,
      this._weightManager.zero()
    );
    if (fromVertex.outEdges.removeBoolean(edge)) {
      toVertex.inEdges.remove(edge);
      this._edges.remove(edge);
    }
  }
  bfs(begin: V, visitor: (v: V) => boolean): void {
    const beginVertex = this._vertices.get(begin);
    if (beginVertex === undefined) return;
    const visitedVertices = new HashSet<Vertex<V, E>>();
    const queue = new Queue<Vertex<V, E>>();
    queue.enQueue(beginVertex);
    visitedVertices.add(beginVertex);
    while (!queue.isEmpty()) {
      const vertex = queue.deQueue();
      if (visitor(vertex.value)) return;
      vertex.outEdges.traversal((edge) => {
        if (!visitedVertices.contains(edge.to)) {
          queue.enQueue(edge.to);
          visitedVertices.add(edge.to);
        }
        return false;
      });
    }
  }
  dfs(begin: V, visitor: (v: V) => boolean): void {
    const beginVertex = this._vertices.get(begin);
    if (beginVertex === undefined) return;
    const visitedVertices = new HashSet<Vertex<V, E>>();
    const stack = new Stack<Vertex<V, E>>();
    stack.push(beginVertex);
    visitedVertices.add(beginVertex);
    if (visitor(beginVertex.value)) return;
    while (!stack.isEmpty()) {
      const vertex = stack.pop();
      let f = false;
      vertex.outEdges.traversal((edge) => {
        if (visitedVertices.contains(edge.to)) return false;
        stack.push(edge.from);
        stack.push(edge.to);
        visitedVertices.add(edge.to);
        if (visitor(edge.to.value)) f = true;
        return true;
      });
      if (f) return;
    }
  }
  topologicalSort(): V[] {
    const list: V[] = [];
    const queue: Queue<Vertex<V, E>> = new Queue<Vertex<V, E>>();
    const ins: Map<Vertex<V, E>, number> = new Map<Vertex<V, E>, number>();
    this._vertices.traversal((v: V, vertex: Vertex<V, E>) => {
      const outIn = vertex.inEdges.size();
      if (outIn === 0) queue.enQueue(vertex);
      else ins.set(vertex, outIn);
      return false;
    });
    while (!queue.isEmpty()) {
      const vertex = queue.deQueue();
      list.push(vertex.value);
      vertex.outEdges.traversal((edge) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const toIn = ins.get(edge.to)! - 1;
        if (toIn === 0) queue.enQueue(edge.to);
        else ins.set(edge.to, toIn);
        return false;
      });
    }
    return list;
  }
  mst(type: Mst = Mst.prim): Set<EdgeInfo<V, E>> {
    return type === Mst.prim ? this.prim() : this.kruskal();
  }
  private prim(): Set<EdgeInfo<V, E>> {
    const it: Vertex<V, E>[] = [];
    this._vertices.traversal((_, value: Vertex<V, E>) => {
      it.push(value);
      return false;
    });
    const edgeInfos = new Set<EdgeInfo<V, E>>();
    if (it.length === 0) return edgeInfos;
    const vertex = it[0];
    const heap = new BinaryHeap<Edge<V, E>>(this._edgeComparator);
    vertex.outEdges.traversal((edge) => {
      heap.add(edge);
      return false;
    });
    const addedVertices = new Set<Vertex<V, E>>();
    addedVertices.add(vertex);
    const verticesSize = this._vertices.size();
    while (!heap.isEmpty() && addedVertices.size < verticesSize) {
      const edge = heap.remove();
      if (addedVertices.has(edge.to)) continue;
      edgeInfos.add(edge.info());
      addedVertices.add(edge.to);
      edge.to.outEdges.traversal((edge) => {
        heap.add(edge);
        return false;
      });
    }
    return edgeInfos;
  }
  private kruskal(): Set<EdgeInfo<V, E>> {
    const edgeInfos = new Set<EdgeInfo<V, E>>();
    const edgeSize = this._vertices.size() - 1;
    if (edgeSize === -1) return edgeInfos;
    const heap = new BinaryHeap<Edge<V, E>>(this._edgeComparator);
    this._edges.traversal((edge) => {
      heap.add(edge);
      return false;
    });
    const uf = new GenericUnionFind();
    this._vertices.traversal((_, vertex: Vertex<V, E>) => {
      uf.makeSet(vertex);
      return false;
    });
    while (!heap.isEmpty() && edgeInfos.size < edgeSize) {
      const edge = heap.remove();
      if (uf.isSame(edge.from, edge.to)) continue;
      edgeInfos.add(edge.info());
      uf.union(edge.from, edge.to);
    }
    return edgeInfos;
  }
  shortestPathSingle(
    begin: V,
    type: SingleShortestPath = SingleShortestPath.dijkstra
  ): HashMap<V, PathInfo<V, E>> | undefined {
    return type === SingleShortestPath.dijkstra
      ? this.dijkstra(begin)
      : this.bellmanFord(begin);
  }
  private dijkstra(begin: V): HashMap<V, PathInfo<V, E>> | undefined {
    const beginVertex = this._vertices.get(begin);
    if (beginVertex === undefined) return undefined;
    const selectedPaths = new HashMap<V, PathInfo<V, E>>();
    const paths = new HashMap<Vertex<V, E>, PathInfo<V, E>>();
    paths.put(beginVertex, new PathInfo<V, E>(this._weightManager.zero()));
    while (paths.size() !== 0) {
      const [minVertex, minPath] = this.getMinPath(paths);
      selectedPaths.put(minVertex.value, minPath);
      paths.remove(minVertex);
      minVertex.outEdges.traversal((edge) => {
        if (!selectedPaths.containsKey(edge.to.value))
          this.relaxForDijkstra(edge, minPath, paths);
        return false;
      });
    }
    selectedPaths.remove(begin);
    return selectedPaths;
  }
  private getMinPath(
    paths: HashMap<Vertex<V, E>, PathInfo<V, E>>
  ): [Vertex<V, E>, PathInfo<V, E>] {
    let minEntry: [Vertex<V, E>, PathInfo<V, E>] | undefined;
    paths.traversal((vertex, pathInfo) => {
      if (minEntry === undefined) {
        minEntry = [vertex, pathInfo];
        return false;
      }
      if (this._weightManager.compare(pathInfo.weight, minEntry[1].weight) < 0)
        minEntry = [vertex, pathInfo];
      return false;
    });
    return minEntry!;
  }
  private relaxForDijkstra(
    edge: Edge<V, E>,
    fromPath: PathInfo<V, E>,
    paths: HashMap<Vertex<V, E>, PathInfo<V, E>>
  ): void {
    const newWeight = this._weightManager.add(fromPath.weight, edge.weight);
    let oldPath = paths.get(edge.to);
    // if (
    //   oldPath !== undefined &&
    //   this._weightManager.compare(newWeight, oldPath.weight) >= 0
    // )
    //   return;
    if (oldPath === undefined) {
      oldPath = new PathInfo<V, E>(this._weightManager.zero());
      paths.put(edge.to, oldPath);
    } else {
      oldPath.edgeInfos.length = 0;
    }
    oldPath.weight = newWeight;
    oldPath.edgeInfos = oldPath.edgeInfos.concat(fromPath.edgeInfos);
    oldPath.edgeInfos.push(edge.info());
  }
  private bellmanFord(begin: V): HashMap<V, PathInfo<V, E>> | undefined {
    const beginVertex = this._vertices.get(begin);
    if (beginVertex === undefined) return undefined;
    const selectedPaths = new HashMap<V, PathInfo<V, E>>();
    selectedPaths.put(begin, new PathInfo<V, E>(this._weightManager.zero()));
    const count = this._vertices.size() - 1;
    for (let i = 0; i < count; i++) {
      this._edges.traversal((edge) => {
        const fromPath = selectedPaths.get(edge.from.value);
        if (fromPath !== undefined)
          this.relaxForBellmanFord(edge, fromPath, selectedPaths);
        return false;
      });
    }
    this._edges.traversal((edge) => {
      const fromPath = selectedPaths.get(edge.from.value);
      if (
        fromPath !== undefined &&
        this.relaxForBellmanFord(edge, fromPath, selectedPaths)
      ) {
        error("有负权环");
      }
      return false;
    });
    selectedPaths.remove(begin);
    return selectedPaths;
  }
  private relaxForBellmanFord(
    edge: Edge<V, E>,
    fromPath: PathInfo<V, E>,
    paths: HashMap<V, PathInfo<V, E>>
  ): boolean {
    const newWeight = this._weightManager.add(fromPath.weight, edge.weight);
    let oldPath = paths.get(edge.to.value);
    if (
      oldPath !== undefined &&
      this._weightManager.compare(newWeight, oldPath.weight) >= 0
    )
      return false;
    if (oldPath === undefined) {
      oldPath = new PathInfo<V, E>(this._weightManager.zero());
      paths.put(edge.to.value, oldPath);
    } else {
      oldPath.edgeInfos.length = 0;
    }
    oldPath.weight = newWeight;
    oldPath.edgeInfos = oldPath.edgeInfos.concat(fromPath.edgeInfos);
    oldPath.edgeInfos.push(edge.info());
    return true;
  }
  shortestPathMulti(): HashMap<V, HashMap<V, PathInfo<V, E>>> {
    const paths = new HashMap<V, HashMap<V, PathInfo<V, E>>>();
    this._edges.traversal((edge) => {
      let map = paths.get(edge.from.value);
      if (map === undefined) {
        map = new HashMap<V, PathInfo<V, E>>();
        paths.put(edge.from.value, map);
      }
      const pathInfo = new PathInfo<V, E>(edge.weight);
      pathInfo.edgeInfos.push(edge.info());
      map.put(edge.to.value, pathInfo);
      return false;
    });
    this._vertices.traversal((v2) => {
      this._vertices.traversal((v1) => {
        this._vertices.traversal((v3) => {
          if (v1.equals(v2) || v2.equals(v3) || v1.equals(v3)) return false;
          const path12 = this.getPathInfo(v1, v2, paths);
          if (path12 === undefined) return false;
          const path23 = this.getPathInfo(v2, v3, paths);
          if (path23 === undefined) return false;
          let path13 = this.getPathInfo(v1, v3, paths);
          const newWeight = this._weightManager.add(
            path12.weight,
            path23.weight
          );
          if (
            path13 !== undefined &&
            this._weightManager.compare(newWeight, path13.weight) >= 0
          )
            return false;
          if (path13 === undefined) {
            path13 = new PathInfo<V, E>(this._weightManager.zero());
            paths.get(v1)!.put(v3, path13);
          } else {
            path13.edgeInfos.length = 0;
          }
          path13.weight = newWeight;
          path13.edgeInfos = path13.edgeInfos.concat(
            path12.edgeInfos,
            path23.edgeInfos
          );
          return false;
        });
        return false;
      });
      return false;
    });
    return paths;
  }
  private getPathInfo(
    from: V,
    to: V,
    paths: HashMap<V, HashMap<V, PathInfo<V, E>>>
  ): PathInfo<V, E> | undefined {
    const map = paths.get(from);
    return map === undefined ? undefined : map.get(to);
  }
}
