import { Person, getPerson } from "../../src/utils/model";
import Queue from "../../src/core/queue/Queue";
import IQueue from "../../src/core/queue/IQueue";
import Deque from "../../src/core/queue/Deque";

const run = (name: string, getNewQueue: () => IQueue<Person>): void =>
  describe(name, () => {
    test("size", () => {
      const queue = getNewQueue();
      expect(queue.size()).toBe(0);
      queue.enQueue(getPerson(1));
      expect(queue.size()).toBe(1);
      queue.enQueue(getPerson(1));
      expect(queue.size()).toBe(2);
    });
    test("enQueue and deQueue", () => {
      const queue = getNewQueue();
      const obj1 = getPerson(1);
      const obj2 = getPerson(2);
      const obj3 = getPerson(3);
      queue.enQueue(obj1);
      queue.enQueue(obj2);
      queue.enQueue(obj3);
      expect(queue.deQueue()).toBe(obj1);
      expect(queue.deQueue()).toBe(obj2);
      expect(queue.deQueue()).toBe(obj3);
    });
    test("isEmpty", () => {
      const queue = getNewQueue();
      expect(queue.isEmpty()).toBe(true);
      queue.enQueue(getPerson(1));
      expect(queue.isEmpty()).toBe(false);
      queue.enQueue(getPerson(1));
      queue.clear();
      expect(queue.isEmpty()).toBe(true);
    });
    test("front", () => {
      const queue = getNewQueue();
      const obj1 = getPerson(1);
      const obj2 = getPerson(2);
      const obj3 = getPerson(3);
      queue.enQueue(obj1);
      expect(queue.front()).toBe(obj1);
      queue.enQueue(obj2);
      expect(queue.front()).toBe(obj1);
      queue.enQueue(obj3);
      expect(queue.front()).toBe(obj1);
    });
    test("toString with empty", () => {
      const queue = getNewQueue();
      expect(queue.toString()).toBe("size:0,front->[]<-rear");
    });
    test("throwEmpty", () => {
      const list = getNewQueue();
      try {
        list.front();
      } catch (error) {
        expect(error.toString()).toBe(
          "Error: Queue is Empty can not use the Method: front"
        );
      }
    });
  });
describe("All Queue Test", () => {
  run("Queue", () => {
    return new Queue<Person>();
  });
  run("Deque", () => {
    return new Deque<Person>();
  });
});
