import { random, copy, isAscOrder } from "../../src/utils/Arrays";
import {
  BubbleSort1,
  BubbleSort2,
  BubbleSort3,
  SelectionSort,
  HeapSort,
  InsertionSort1,
  InsertionSort2,
  InsertionSort3,
  MergeSort,
  QuickSort,
  ShellSort,
  CountingSort,
  RadixSort
} from "../../src/core/algorithms";
import { Sort } from "../../src/types";
import { toString } from "../../src/utils";
const array = random(20000, 0, 20000);
const sortInform: Sort[] = [];
function commonTest(name: string, fn: Function): void {
  test(name, () => {
    const result = fn(copy(array));
    sortInform.push(result);
    expect(isAscOrder(result.array)).toBeTruthy();
  });
}
describe("Sort", () => {
  commonTest("BubbleSort1", BubbleSort1);
  commonTest("BubbleSort2", BubbleSort2);
  commonTest("BubbleSort3", BubbleSort3);
  commonTest("SelectionSort", SelectionSort);
  commonTest("HeapSort", HeapSort);
  commonTest("InsertionSort1", InsertionSort1);
  commonTest("InsertionSort2", InsertionSort2);
  commonTest("InsertionSort3", InsertionSort3);
  commonTest("MergeSort", MergeSort);
  commonTest("QuickSort", QuickSort);
  commonTest("ShellSort", ShellSort);
  commonTest("CountingSort", CountingSort);
  commonTest("RadixSort", RadixSort);
  test("sort", () => {
    sortInform.sort((a, b) => a.time - b.time);
    let string = "";
    for (const el of sortInform) string += toString(el) + "\n";
    console.log(string);
  });
});
