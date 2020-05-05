import ListGraph from "../../src/core/graph/ListGraph";
import { Person, getPerson, MyString } from "../../src/utils/model";
import { undirectedGraph } from "../../src/utils/Graph";
import { toString } from "../../src/utils";
import { WeightManager, Mst, SingleShortestPath } from "../../src/types";
import EdgeInfo from "../../src/core/graph/EdgeInfo";
const manager: WeightManager<number> = {
  compare(w1: number, w2: number): number {
    return w2 - w1;
  },
  add(w1: number, w2: number): number {
    return w1 + w2;
  },
  zero(): number {
    return 0;
  }
};
function getNewGraph(): ListGraph<Person, number> {
  return new ListGraph<Person, number>(manager);
}
/*
1  →  3  →  5
↓  ↖ ↓     ↓
2  →  4  →  6

*/
function getGraph(): ListGraph<Person, number> {
  const graph = getNewGraph();
  graph.addEdge(getPerson(1), getPerson(2), manager.zero());
  graph.addEdge(getPerson(1), getPerson(3), manager.zero());
  graph.addEdge(getPerson(2), getPerson(4), manager.zero());
  graph.addEdge(getPerson(3), getPerson(5), manager.zero());
  graph.addEdge(getPerson(3), getPerson(4), manager.zero());
  graph.addEdge(getPerson(4), getPerson(1), manager.zero());
  graph.addEdge(getPerson(4), getPerson(6), manager.zero());
  graph.addEdge(getPerson(5), getPerson(6), manager.zero());
  return graph;
}
/*
        3
      ↗   ↘ 
1 → 2 →  5 → 6
      ↘ 
         4
*/
function getGraph2(): ListGraph<Person, number> {
  const graph = getNewGraph();
  graph.addEdge(getPerson(1), getPerson(2), manager.zero());
  graph.addEdge(getPerson(2), getPerson(3), manager.zero());
  graph.addEdge(getPerson(2), getPerson(4), manager.zero());
  graph.addEdge(getPerson(2), getPerson(5), manager.zero());
  graph.addEdge(getPerson(5), getPerson(6), manager.zero());
  graph.addEdge(getPerson(3), getPerson(6), manager.zero());
  return graph;
}
function getGraph3(): ListGraph<MyString, number> {
  return undirectedGraph(
    [
      [new MyString("A"), new MyString("B"), 4],
      [new MyString("A"), new MyString("H"), 8],
      [new MyString("B"), new MyString("H"), 11],
      [new MyString("B"), new MyString("C"), 8],
      [new MyString("H"), new MyString("I"), 7],
      [new MyString("H"), new MyString("G"), 1],
      [new MyString("I"), new MyString("C"), 2],
      [new MyString("I"), new MyString("G"), 6],
      [new MyString("C"), new MyString("F"), 4],
      [new MyString("C"), new MyString("D"), 7],
      [new MyString("G"), new MyString("F"), 2],
      [new MyString("D"), new MyString("F"), 14],
      [new MyString("D"), new MyString("E"), 9],
      [new MyString("F"), new MyString("E"), 10]
    ],
    manager
  );
}
describe("Graph", () => {
  test("common test", () => {
    const graph = getGraph();
    graph.print();
    expect(graph.verticesSize()).toBe(6);
    expect(graph.edgesSize()).toBe(8);
    graph.removeVertex(getPerson(4));
    expect(graph.verticesSize()).toBe(5);
    expect(graph.edgesSize()).toBe(4);
    graph.removeEdge(getPerson(3), getPerson(4));
    expect(graph.verticesSize()).toBe(5);
    expect(graph.edgesSize()).toBe(4);
    graph.removeEdge(getPerson(2), getPerson(1));
    expect(graph.verticesSize()).toBe(5);
    expect(graph.edgesSize()).toBe(4);
    graph.removeEdge(getPerson(1), getPerson(2));
    expect(graph.verticesSize()).toBe(5);
    expect(graph.edgesSize()).toBe(3);
    graph.removeVertex(getPerson(2));
    expect(graph.verticesSize()).toBe(4);
    expect(graph.edgesSize()).toBe(3);
    graph.removeVertex(getPerson(4));
    expect(graph.verticesSize()).toBe(4);
    expect(graph.edgesSize()).toBe(3);
    graph.removeVertex(new Person("1", 1));
    expect(graph.verticesSize()).toBe(3);
    expect(graph.edgesSize()).toBe(2);
    graph.addVertex(getPerson(5));
    expect(graph.verticesSize()).toBe(3);
    expect(graph.edgesSize()).toBe(2);
    graph.addVertex(getPerson(1));
    expect(graph.verticesSize()).toBe(4);
    expect(graph.edgesSize()).toBe(2);
    graph.addEdge(getPerson(1), new Person("3", 3), 0);
    expect(graph.verticesSize()).toBe(4);
    expect(graph.edgesSize()).toBe(3);
    graph.removeEdge(getPerson(10), getPerson(1));
    expect(graph.verticesSize()).toBe(4);
    expect(graph.edgesSize()).toBe(3);
  });
  describe("addEdge", () => {
    test("fromVertex.outEdges.removeBoolean(edge) is false", () => {
      const graph = getNewGraph();
      graph.addEdge(getPerson(1), getPerson(2), 1);
      graph.addEdge(getPerson(1), getPerson(2), 2);
      let string = "";
      graph.bfs(getPerson(1), (p) => {
        string += p + " ";
        return false;
      });
      expect(string).toBe("Person name:1 age:1 Person name:2 age:2 ");
    });
  });
  describe("bfs", () => {
    test("common", () => {
      const graph = getGraph();
      let string = "";
      graph.bfs(getPerson(1), (p: Person) => {
        string += p.age + " ";
        if (p.age === 5) return true;
        return false;
      });
      expect(string).toBe("1 2 3 4 5 ");
    });
    test("has no begin", () => {
      const graph = getGraph();
      let string = "";
      graph.bfs(getPerson(19), (p: Person) => {
        string += p.age + " ";
        return false;
      });
      expect(string).toBe("");
    });
  });
  describe("dfs", () => {
    test("common", () => {
      const graph = getGraph();
      let string = "";
      graph.dfs(getPerson(1), (p: Person) => {
        string += p.age + " ";
        if (p.age === 3) return true;
        return false;
      });
      expect(string).toBe("1 2 4 6 3 ");
    });
    test("has no begin", () => {
      const graph = getGraph();
      let string = "";
      graph.dfs(getPerson(19), (p: Person) => {
        string += p.age + " ";
        return false;
      });
      expect(string).toBe("");
    });
    test("first return ture", () => {
      const graph = getGraph();
      let string = "";
      graph.dfs(getPerson(1), (p: Person) => {
        string += p.age + " ";
        if (p.age === 1) return true;
        return false;
      });
      expect(string).toBe("1 ");
    });
  });
  test("topologicalSort", () => {
    const graph = getGraph2();
    const [p1, p2, p3, p4, p5, p6] = graph.topologicalSort();
    expect(p1).toBe(getPerson(1));
    expect(p2).toBe(getPerson(2));
    expect(p3).toBe(getPerson(4));
    expect(p4).toBe(getPerson(3));
    expect(p5).toBe(getPerson(5));
    expect(p6).toBe(getPerson(6));
  });
  describe("prim", () => {
    test("common", () => {
      const graph = getGraph3();
      const prim: Set<EdgeInfo<MyString, number>> = graph.mst();
      let string = "";
      prim.forEach((edgeInnfo) => {
        string += edgeInnfo + " ";
      });
      expect(string).toBe(
        "EdgeInfo [from=String value:A, to=String value:B, weight=4] " +
          "EdgeInfo [from=String value:B, to=String value:C, weight=8] " +
          "EdgeInfo [from=String value:C, to=String value:I, weight=2] " +
          "EdgeInfo [from=String value:C, to=String value:F, weight=4] " +
          "EdgeInfo [from=String value:F, to=String value:G, weight=2] " +
          "EdgeInfo [from=String value:G, to=String value:H, weight=1] " +
          "EdgeInfo [from=String value:C, to=String value:D, weight=7] " +
          "EdgeInfo [from=String value:D, to=String value:E, weight=9] "
      );
    });
    test("has no vertex", () => {
      const graph = getNewGraph();
      const prim = graph.mst();
      expect(prim.size).toBe(0);
    });
  });
  describe("kruskal", () => {
    test("common", () => {
      const graph = getGraph3();
      const prim: Set<EdgeInfo<MyString, number>> = graph.mst(Mst.kruskal);
      let string = "";
      prim.forEach((edgeInnfo) => {
        string += edgeInnfo + " ";
      });
      expect(string).toBe(
        "EdgeInfo [from=String value:G, to=String value:H, weight=1] " +
          "EdgeInfo [from=String value:G, to=String value:F, weight=2] " +
          "EdgeInfo [from=String value:C, to=String value:I, weight=2] " +
          "EdgeInfo [from=String value:C, to=String value:F, weight=4] " +
          "EdgeInfo [from=String value:B, to=String value:A, weight=4] " +
          "EdgeInfo [from=String value:D, to=String value:C, weight=7] " +
          "EdgeInfo [from=String value:A, to=String value:H, weight=8] " +
          "EdgeInfo [from=String value:E, to=String value:D, weight=9] "
      );
    });
    test("has no vertex", () => {
      const graph = getNewGraph();
      const kruskal = graph.mst(Mst.kruskal);
      expect(kruskal.size).toBe(0);
    });
  });
  describe("shortestPath", () => {
    const manager: WeightManager<number> = {
      compare(w1: number, w2: number): number {
        return w1 - w2;
      },
      add(w1: number, w2: number): number {
        return w1 + w2;
      },
      zero(): number {
        return 0;
      }
    };
    function getNewGraph(): ListGraph<MyString, number> {
      return new ListGraph<MyString, number>(manager);
    }
    describe("dijkstra", () => {
      test("has no begin", () => {
        const graph = getNewGraph();
        expect(graph.shortestPathSingle(new MyString("A"))).toBeUndefined();
      });
      test("selectedPaths include edge.to.value", () => {
        const graph = getNewGraph();
        graph.addEdge(new MyString("A"), new MyString("B"), 1);
        graph.addEdge(new MyString("A"), new MyString("C"), 2);
        graph.addEdge(new MyString("B"), new MyString("D"), 3);
        graph.addEdge(new MyString("D"), new MyString("C"), 4);
        const shortestMap = graph.shortestPathSingle(new MyString("A"));
        let string = "";
        if (shortestMap !== undefined)
          shortestMap.traversal((vertex, pathInfo) => {
            string += toString(vertex) + "," + toString(pathInfo) + "\n";
            return false;
          });
        string = string.substr(0, string.length - 1);
        const res =
          "String value:B,PathInfo [weight=1,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=1]]\n" +
          "String value:C,PathInfo [weight=2,edgeInfos=EdgeInfo [from=String value:A, to=String value:C, weight=2]]\n" +
          "String value:D,PathInfo [weight=4,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=1],EdgeInfo [from=String value:B, to=String value:D, weight=3]]";
        expect(string).toBe(res);
      });
      test("common", () => {
        const graph = getNewGraph();
        graph.addEdge(new MyString("A"), new MyString("D"), 30);
        graph.addEdge(new MyString("A"), new MyString("E"), 100);
        graph.addEdge(new MyString("A"), new MyString("B"), 10);
        graph.addEdge(new MyString("B"), new MyString("C"), 50);
        graph.addEdge(new MyString("C"), new MyString("E"), 10);
        graph.addEdge(new MyString("D"), new MyString("C"), 20);
        graph.addEdge(new MyString("D"), new MyString("E"), 60);
        const shortestMap = graph.shortestPathSingle(new MyString("A"));
        let string = "";
        if (shortestMap !== undefined)
          shortestMap.traversal((vertex, pathInfo) => {
            string += toString(vertex) + "," + toString(pathInfo) + "\n";
            return false;
          });
        string = string.substr(0, string.length - 1);
        const res =
          "String value:B,PathInfo [weight=10,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=10]]\n" +
          "String value:C,PathInfo [weight=50,edgeInfos=EdgeInfo [from=String value:A, to=String value:D, weight=30],EdgeInfo [from=String value:D, to=String value:C, weight=20]]\n" +
          "String value:D,PathInfo [weight=30,edgeInfos=EdgeInfo [from=String value:A, to=String value:D, weight=30]]\n" +
          "String value:E,PathInfo [weight=60,edgeInfos=EdgeInfo [from=String value:A, to=String value:D, weight=30],EdgeInfo [from=String value:D, to=String value:C, weight=20],EdgeInfo [from=String value:C, to=String value:E, weight=10]]";
        expect(string).toBe(res);
      });
    });
    describe("bellmanFord", () => {
      test("has no begin", () => {
        const graph = getNewGraph();
        expect(
          graph.shortestPathSingle(
            new MyString("A"),
            SingleShortestPath.bellmanFord
          )
        ).toBeUndefined();
      });
      test("common", () => {
        const graph = getNewGraph();
        graph.addEdge(new MyString("A"), new MyString("B"), 10);
        graph.addEdge(new MyString("A"), new MyString("E"), 8);
        graph.addEdge(new MyString("B"), new MyString("E"), -5);
        graph.addEdge(new MyString("B"), new MyString("C"), 8);
        graph.addEdge(new MyString("D"), new MyString("C"), 2);
        graph.addEdge(new MyString("D"), new MyString("F"), 6);
        graph.addEdge(new MyString("E"), new MyString("F"), 3);
        graph.addEdge(new MyString("E"), new MyString("D"), 7);
        const shortestMap = graph.shortestPathSingle(
          new MyString("A"),
          SingleShortestPath.bellmanFord
        );
        let string = "";
        if (shortestMap !== undefined)
          shortestMap.traversal((vertex, pathInfo) => {
            string += toString(vertex) + "," + toString(pathInfo) + "\n";
            return false;
          });
        string = string.substr(0, string.length - 1);
        const res =
          "String value:B,PathInfo [weight=10,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=10]]\n" +
          "String value:C,PathInfo [weight=14,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=10],EdgeInfo [from=String value:B, to=String value:E, weight=-5],EdgeInfo [from=String value:E, to=String value:D, weight=7],EdgeInfo [from=String value:D, to=String value:C, weight=2]]\n" +
          "String value:D,PathInfo [weight=12,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=10],EdgeInfo [from=String value:B, to=String value:E, weight=-5],EdgeInfo [from=String value:E, to=String value:D, weight=7]]\n" +
          "String value:E,PathInfo [weight=5,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=10],EdgeInfo [from=String value:B, to=String value:E, weight=-5]]\n" +
          "String value:F,PathInfo [weight=8,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=10],EdgeInfo [from=String value:B, to=String value:E, weight=-5],EdgeInfo [from=String value:E, to=String value:F, weight=3]]";
        expect(string).toBe(res);
      });
      test("has negative weight ring", () => {
        const graph = getNewGraph();
        graph.addEdge(new MyString("A"), new MyString("B"), 4);
        graph.addEdge(new MyString("A"), new MyString("E"), 8);
        graph.addEdge(new MyString("B"), new MyString("E"), 11);
        graph.addEdge(new MyString("B"), new MyString("C"), 8);
        graph.addEdge(new MyString("D"), new MyString("C"), 2);
        graph.addEdge(new MyString("D"), new MyString("F"), 6);
        graph.addEdge(new MyString("E"), new MyString("D"), 7);
        graph.addEdge(new MyString("F"), new MyString("E"), -20);
        try {
          graph.shortestPathSingle(
            new MyString("A"),
            SingleShortestPath.bellmanFord
          );
        } catch (error) {
          expect(error.toString()).toBe("Error: 有负权环");
        }
      });
    });
    describe("floyd", () => {
      test("common", () => {
        const graph = getNewGraph();
        graph.addEdge(new MyString("A"), new MyString("B"), 10);
        graph.addEdge(new MyString("A"), new MyString("E"), 8);
        graph.addEdge(new MyString("B"), new MyString("E"), -5);
        graph.addEdge(new MyString("B"), new MyString("C"), 8);
        graph.addEdge(new MyString("D"), new MyString("C"), 2);
        graph.addEdge(new MyString("D"), new MyString("F"), 6);
        graph.addEdge(new MyString("E"), new MyString("F"), 3);
        graph.addEdge(new MyString("E"), new MyString("D"), 7);
        const shortestMap = graph.shortestPathMulti();
        let string = "";
        if (shortestMap !== undefined)
          shortestMap.traversal((vertex, map) => {
            string += `======【${toString(vertex)}】======\n`;
            map.traversal((key, pathInfo) => {
              string += key + "," + pathInfo + "\n";
              return false;
            });
            return false;
          });
        string = string.substr(0, string.length - 1);
        const res =
          "======【String value:A】======\n" +
          "String value:B,PathInfo [weight=10,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=10]]\n" +
          "String value:C,PathInfo [weight=14,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=10],EdgeInfo [from=String value:B, to=String value:E, weight=-5],EdgeInfo [from=String value:E, to=String value:D, weight=7],EdgeInfo [from=String value:D, to=String value:C, weight=2]]\n" +
          "String value:D,PathInfo [weight=12,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=10],EdgeInfo [from=String value:B, to=String value:E, weight=-5],EdgeInfo [from=String value:E, to=String value:D, weight=7]]\n" +
          "String value:E,PathInfo [weight=5,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=10],EdgeInfo [from=String value:B, to=String value:E, weight=-5]]\n" +
          "String value:F,PathInfo [weight=8,edgeInfos=EdgeInfo [from=String value:A, to=String value:B, weight=10],EdgeInfo [from=String value:B, to=String value:E, weight=-5],EdgeInfo [from=String value:E, to=String value:F, weight=3]]\n" +
          "======【String value:B】======\n" +
          "String value:C,PathInfo [weight=4,edgeInfos=EdgeInfo [from=String value:B, to=String value:E, weight=-5],EdgeInfo [from=String value:E, to=String value:D, weight=7],EdgeInfo [from=String value:D, to=String value:C, weight=2]]\n" +
          "String value:D,PathInfo [weight=2,edgeInfos=EdgeInfo [from=String value:B, to=String value:E, weight=-5],EdgeInfo [from=String value:E, to=String value:D, weight=7]]\n" +
          "String value:E,PathInfo [weight=-5,edgeInfos=EdgeInfo [from=String value:B, to=String value:E, weight=-5]]\n" +
          "String value:F,PathInfo [weight=-2,edgeInfos=EdgeInfo [from=String value:B, to=String value:E, weight=-5],EdgeInfo [from=String value:E, to=String value:F, weight=3]]\n" +
          "======【String value:D】======\n" +
          "String value:C,PathInfo [weight=2,edgeInfos=EdgeInfo [from=String value:D, to=String value:C, weight=2]]\n" +
          "String value:F,PathInfo [weight=6,edgeInfos=EdgeInfo [from=String value:D, to=String value:F, weight=6]]\n" +
          "======【String value:E】======\n" +
          "String value:C,PathInfo [weight=9,edgeInfos=EdgeInfo [from=String value:E, to=String value:D, weight=7],EdgeInfo [from=String value:D, to=String value:C, weight=2]]\n" +
          "String value:D,PathInfo [weight=7,edgeInfos=EdgeInfo [from=String value:E, to=String value:D, weight=7]]\n" +
          "String value:F,PathInfo [weight=3,edgeInfos=EdgeInfo [from=String value:E, to=String value:F, weight=3]]";
        expect(string).toBe(res);
      });
    });
  });
});
