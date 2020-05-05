import { Person, getPerson } from "../../src/utils/model";
import DuLinkList from "../../src/core/list/DuLinkedList";
function getNewList(): DuLinkList<Person> {
  return new DuLinkList<Person>();
}
describe("DuLinkedList", () => {
  test("toString", () => {
    const list = getNewList();
    list.add(getPerson(1));
    list.add(getPerson(2));
    list.add(getPerson(3));
    expect(list.toString()).toBe(
      "size:3,elements:[Node:null->Person name:1 age:1->Person name:2 age:2,Node:Person name:1 age:1->Person name:2 age:2->Person name:3 age:3,Node:Person name:2 age:2->Person name:3 age:3->null]"
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
