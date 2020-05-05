import ListGraph from "../core/graph/ListGraph";
import WeightManager from "../core/graph/WeightManager";
import { Hash } from "../types";
export function directedGraph<T extends Hash>(
  data: Array<[T, T?, number?]>,
  weightManager: WeightManager<number>
): ListGraph<T, number> {
  const graph = new ListGraph<T, number>(weightManager);
  for (const edge of data) {
    if (edge.length === 1) {
      graph.addVertex(edge[0]);
    } else if (edge.length === 2) {
      graph.addEdge(edge[0], edge[1]!, weightManager.zero());
    } else {
      const weight = Number(edge[2]);
      graph.addEdge(edge[0], edge[1]!, weight);
    }
  }
  return graph;
}
export function undirectedGraph<T extends Hash>(
  data: Array<[T, T?, number?]>,
  weightManager: WeightManager<number>
): ListGraph<T, number> {
  const graph = new ListGraph<T, number>(weightManager);
  for (const edge of data) {
    if (edge.length === 1) {
      graph.addVertex(edge[0]);
    } else if (edge.length === 2) {
      graph.addEdge(edge[0], edge[1]!, weightManager.zero());
      graph.addEdge(edge[1]!, edge[0], weightManager.zero());
    } else {
      const weight = Number(edge[2]);
      graph.addEdge(edge[0], edge[1]!, weight);
      graph.addEdge(edge[1]!, edge[0], weight);
    }
  }
  return graph;
}
