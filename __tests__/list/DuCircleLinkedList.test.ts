import { Person, getPerson } from "../../src/utils/model";
import DuCircleLinkedList from "../../src/core/list/DuCircleLinkedList";
function getNewList(): DuCircleLinkedList<Person> {
  return new DuCircleLinkedList<Person>();
}
describe("DuCircleLinkedList", () => {
  test("toString", () => {
    const list = getNewList();
    list.add(getPerson(1));
    list.add(getPerson(2));
    list.add(getPerson(3));
    expect(list.toString()).toBe(
      "size:3,elements:[Node:Person name:3 age:3->Person name:1 age:1->Person name:2 age:2,Node:Person name:1 age:1->Person name:2 age:2->Person name:3 age:3,Node:Person name:2 age:2->Person name:3 age:3->Person name:1 age:1]"
    );
  });
  test("get last", () => {
    const list = getNewList();
    list.add(getPerson(1));
    list.add(getPerson(2));
    list.add(getPerson(3));
    list.add(getPerson(4));
    list.add(getPerson(5));
    expect(list.get(3)).toBe(getPerson(4));
  });
});
