import { directedGraph, undirectedGraph } from "../../src/utils/Graph";
import { MyString } from "../../src/utils/model";
import { WeightManager } from "../../src/types";
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
describe("graph's utils", () => {
  test("undirectedGraph", () => {
    const graph = undirectedGraph(
      [
        [new MyString("A")],
        [new MyString("A"), new MyString("H")],
        [new MyString("B"), new MyString("H"), 11]
      ],
      manager
    );
    let string = "";
    graph.bfs(new MyString("A"), (myString) => {
      string += myString + " ";
      return false;
    });
    expect(string).toBe("String value:A String value:H String value:B ");
  });
  test("directedGraph", () => {
    const graph = directedGraph(
      [
        [new MyString("A")],
        [new MyString("A"), new MyString("H")],
        [new MyString("B"), new MyString("H"), 11]
      ],
      manager
    );
    let string = "";
    graph.bfs(new MyString("A"), (myString) => {
      string += myString + " ";
      return false;
    });
    expect(string).toBe("String value:A String value:H ");
  });
});
