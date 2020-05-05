import PriorityQueue from "../../src/core/queue/PriorityQueue";
import { Patient, getPatient } from "../../src/utils/model/";

function getNewQueue(): PriorityQueue<Patient> {
  return new PriorityQueue<Patient>((p1, p2) => p1.boneBreak - p2.boneBreak);
}
function getQueue(arr: number[]): PriorityQueue<Patient> {
  const queue = getNewQueue();
  for (const num of arr) {
    queue.enQueue(getPatient(num));
  }
  return queue;
}
describe("PriorityQueue", () => {
  test("size", () => {
    const queue = getNewQueue();
    expect(queue.size()).toBe(0);
    queue.enQueue(getPatient(1));
    expect(queue.size()).toBe(1);
  });
  test("isEmpty", () => {
    const queue = getNewQueue();
    expect(queue.isEmpty()).toBeTruthy();
    queue.enQueue(getPatient(1));
    expect(queue.isEmpty()).toBeFalsy();
    queue.deQueue();
    expect(queue.isEmpty()).toBeTruthy();
  });
  test("clear", () => {
    const queue = getNewQueue();
    queue.enQueue(getPatient(1));
    queue.clear();
    expect(queue.isEmpty()).toBeTruthy();
  });
  test("front", () => {
    const queue = getQueue([132, 124, 1, 5, 61, 24, 124, 21, 521, 215]);
    expect(queue.front()).toBe(getPatient(521));
  });
});
