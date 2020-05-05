import { Person, getPerson } from "../../src/utils/model";
import CircleQueue from "../../src/core/queue/CircleQueue";
function getNewQueue(capacity = 10): CircleQueue<Person> {
  return new CircleQueue<Person>(capacity);
}
describe("circlequeue", () => {
  test("size", () => {
    const queue = getNewQueue();
    expect(queue.size()).toBe(0);
    queue.enQueue(getPerson(1));
    expect(queue.size()).toBe(1);
    queue.clear();
    expect(queue.size()).toBe(0);
  });
  test("isEmpty", () => {
    const queue = getNewQueue();
    expect(queue.isEmpty()).toBe(true);
    queue.enQueue(getPerson(1));
    expect(queue.isEmpty()).toBe(false);
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
    queue.deQueue();
    expect(queue.front()).toBe(obj2);
    queue.deQueue();
    expect(queue.front()).toBe(obj3);
  });
  test("ensureCapacity", () => {
    const queue = getNewQueue();
    for (let i = 0; i < 15; i++) {
      queue.enQueue(getPerson(i));
    }
    expect(queue.toString()).toBe(
      "size:15,head:0,[Person name:0 age:0,Person name:1 age:1,Person name:2 age:2,Person name:3 age:3,Person name:4 age:4,Person name:5 age:5,Person name:6 age:6,Person name:7 age:7,Person name:8 age:8,Person name:9 age:9,Person name:10 age:10,Person name:11 age:11,Person name:12 age:12,Person name:13 age:13,Person name:14 age:14]"
    );
    queue.enQueue(getPerson(11));
    expect(queue.toString()).toBe(
      "size:16,head:0,[Person name:0 age:0,Person name:1 age:1,Person name:2 age:2,Person name:3 age:3,Person name:4 age:4,Person name:5 age:5,Person name:6 age:6,Person name:7 age:7,Person name:8 age:8,Person name:9 age:9,Person name:10 age:10,Person name:11 age:11,Person name:12 age:12,Person name:13 age:13,Person name:14 age:14,Person name:11 age:11,null,null,null,null,null,null]"
    );
    for (let i = 0; i < 5; i++) {
      queue.deQueue();
    }
    expect(queue.toString()).toBe(
      "size:11,head:5,[null,null,null,null,null,Person name:5 age:5,Person name:6 age:6,Person name:7 age:7,Person name:8 age:8,Person name:9 age:9,Person name:10 age:10,Person name:11 age:11,Person name:12 age:12,Person name:13 age:13,Person name:14 age:14,Person name:11 age:11,null,null,null,null,null,null]"
    );
  });
  test("small capacity", () => {
    const queue = getNewQueue(11);
    expect(queue.toString()).toBe(
      "size:0,head:0,[null,null,null,null,null,null,null,null,null,null,null]"
    );
  });
  test("index", () => {
    const queue = getNewQueue();
    for (let i = 0; i < 10; i++) {
      queue.enQueue(getPerson(i));
    }
    for (let i = 0; i < 9; i++) {
      queue.deQueue();
    }
    for (let i = 0; i < 3; i++) {
      queue.enQueue(getPerson(i));
    }
    expect(queue.toString()).toBe(
      "size:4,head:9,[Person name:0 age:0,Person name:1 age:1,Person name:2 age:2,null,null,null,null,null,null,Person name:9 age:9]"
    );
  });
  test("toString", () => {
    const queue = getNewQueue();
    queue.enQueue(getPerson(1));
    queue.enQueue(getPerson(2));
    queue.enQueue(getPerson(3));
    expect(queue.toString()).toBe(
      "size:3,head:0,[Person name:1 age:1,Person name:2 age:2,Person name:3 age:3,null,null,null,null,null,null,null]"
    );
    queue.deQueue();
    expect(queue.toString()).toBe(
      "size:2,head:1,[null,Person name:2 age:2,Person name:3 age:3,null,null,null,null,null,null,null]"
    );
  });
  test("toString with empty", () => {
    const queue = getNewQueue();
    expect(queue.toString()).toBe(
      "size:0,head:0,[null,null,null,null,null,null,null,null,null,null]"
    );
    queue.enQueue(getPerson(1));
    queue.deQueue();
    expect(queue.toString()).toBe(
      "size:0,head:1,[null,null,null,null,null,null,null,null,null,null]"
    );
  });
});
