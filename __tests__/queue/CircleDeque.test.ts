import { Person, getPerson } from "../../src/utils/model";
import CircleDeque from "../../src/core/queue/CircleDeque";
function getNewQueue(capacity = 10): CircleDeque<Person> {
  return new CircleDeque<Person>(capacity);
}
describe("circledeque", () => {
  test("rear", () => {
    const queue = getNewQueue();
    for (let i = 0; i < 5; i++) {
      queue.enQueueFront(getPerson(i));
    }
    expect(queue.rear()).toBe(getPerson(0));
  });
  test("enQueue", () => {
    const queue = getNewQueue();
    for (let i = 0; i < 5; i++) {
      queue.enQueueFront(getPerson(i));
    }
    expect(queue.toString()).toBe(
      "size:5,head:5,[null,null,null,null,null,Person name:4 age:4,Person name:3 age:3,Person name:2 age:2,Person name:1 age:1,Person name:0 age:0]"
    );
    for (let i = 0; i < 5; i++) {
      queue.enQueueRear(getPerson(i + 5));
    }
    expect(queue.toString()).toBe(
      "size:10,head:5,[Person name:5 age:5,Person name:6 age:6,Person name:7 age:7,Person name:8 age:8,Person name:9 age:9,Person name:4 age:4,Person name:3 age:3,Person name:2 age:2,Person name:1 age:1,Person name:0 age:0]"
    );
  });
  test("deQueue", () => {
    const queue = getNewQueue();
    for (let i = 0; i < 5; i++) {
      queue.enQueueFront(getPerson(i));
    }
    for (let i = 0; i < 5; i++) {
      queue.enQueueRear(getPerson(i + 5));
    }
    for (let i = 0; i < 5; i++) {
      queue.deQueueFront();
    }
    expect(queue.toString()).toBe(
      "size:5,head:0,[Person name:5 age:5,Person name:6 age:6,Person name:7 age:7,Person name:8 age:8,Person name:9 age:9,null,null,null,null,null]"
    );
    for (let i = 0; i < 5; i++) {
      queue.deQueueRear();
    }
    expect(queue.toString()).toBe(
      "size:0,head:0,[null,null,null,null,null,null,null,null,null,null]"
    );
  });
});
