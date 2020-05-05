import Deque from "./../../src/core/queue/Deque";
import { Person, getPerson } from "../../src/utils/model";
function getNewQueue(): Deque<Person> {
  return new Deque<Person>();
}
describe("deque", () => {
  test("enQueueRear", () => {
    const queue = getNewQueue();
    const obj1 = getPerson(1);
    queue.enQueueRear(obj1);
    expect(queue.rear()).toBe(obj1);
    const obj2 = getPerson(2);
    queue.enQueueRear(obj2);
    expect(queue.rear()).toBe(obj2);
    const obj3 = getPerson(3);
    queue.enQueueRear(obj3);
    expect(queue.rear()).toBe(obj3);
  });
  test("enQueueFront", () => {
    const queue = getNewQueue();
    const obj1 = getPerson(1);
    queue.enQueueFront(obj1);
    expect(queue.front()).toBe(obj1);
    const obj2 = getPerson(2);
    queue.enQueueFront(obj2);
    expect(queue.front()).toBe(obj2);
    const obj3 = getPerson(3);
    queue.enQueueFront(obj3);
    expect(queue.front()).toBe(obj3);
  });
  test("deQueueRear and deQueueFront", () => {
    const queue = getNewQueue();
    const obj1 = getPerson(1);
    queue.enQueueFront(obj1);
    queue.enQueueFront(getPerson(2));
    expect(queue.deQueueRear()).toBe(obj1);
    queue.clear();
    const obj2 = getPerson(2);
    queue.enQueueRear(obj2);
    queue.enQueueRear(getPerson(1));
    expect(queue.deQueueFront()).toBe(obj2);
  });
});
