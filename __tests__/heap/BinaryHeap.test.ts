import BinaryTreesPrinter from "./../../src/utils/BinaryTreesPrinter";
import BinaryHeap from "../../src/core/heap/BinaryHeap";
import { Person, getPerson } from "../../src/utils/model";

function getNewHeap(arr: Array<number> = []): BinaryHeap<Person> {
  const newArr: Array<Person> = [];
  for (const num of arr) {
    newArr.push(getPerson(num));
  }
  return new BinaryHeap<Person>((p1, p2) => p1.age - p2.age, newArr);
}
describe("Heap", () => {
  test("size", () => {
    const heap = new BinaryHeap<Person>((p1, p2) => p1.age - p2.age);
    expect(heap.size()).toBe(0);
    heap.add(getPerson(1));
    expect(heap.size()).toBe(1);
  });
  test("isEmpty", () => {
    const heap = getNewHeap();
    expect(heap.isEmpty()).toBeTruthy();
    heap.add(getPerson(1));
    expect(heap.isEmpty()).toBeFalsy();
    heap.remove();
    expect(heap.isEmpty()).toBeTruthy();
  });
  test("get", () => {
    const heap = getNewHeap();
    heap.add(getPerson(1));
    expect(heap.get()).toBe(getPerson(1));
    heap.add(getPerson(19));
    expect(heap.get()).toBe(getPerson(19));
  });
  test("clear", () => {
    const heap = getNewHeap();
    heap.add(getPerson(1));
    heap.clear();
    expect(heap.isEmpty()).toBeTruthy();
  });
  test("heapify", () => {
    const heap = getNewHeap([35, 41, 2, 69, 59, 91, 76, 6, 97, 80, 96, 7, 100]);
    expect(heap.get()).toBe(getPerson(100));
  });
  test("replace", () => {
    const heap = getNewHeap();
    expect(heap.replace(getPerson(1))).toBeUndefined();
    expect(heap.get()).toBe(getPerson(1));
    expect(heap.replace(getPerson(2))).toBe(getPerson(1));
    expect(heap.get()).toBe(getPerson(2));
  });
  test("emptyCheck", () => {
    try {
      const heap = getNewHeap();
      heap.get();
    } catch (e) {
      expect(e.toString()).toBe(
        "Error: BinaryHeap is Empty can not use the Method: get"
      );
    }
  });
  test("add", () => {
    const heap = getNewHeap([35, 41, 2, 69, 59, 91, 76, 6, 97, 80, 96, 7, 100]);
    heap.add(getPerson(10));
    expect(heap.get()).toBe(getPerson(100));
  });
  test("print", () => {
    const heap = getNewHeap([35, 41, 2, 69, 59, 91, 76, 6, 97, 80, 96, 7, 100]);
    let err = "";
    try {
      BinaryTreesPrinter.print(heap);
    } catch (e) {
      err = e;
    }
    expect(err).toBe("");
  });
});
