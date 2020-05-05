import SingleLinkedList2 from "../../src/core/list/SingleLinkedList2";
import { Person, getPerson } from "../../src/utils/model";
function getNewList(): SingleLinkedList2<Person> {
  return new SingleLinkedList2<Person>();
}
describe("SingleLinkedList2", () => {
  test("toString", () => {
    const list = getNewList();
    list.add(getPerson(1));
    list.add(getPerson(2));
    list.add(getPerson(3));
    expect(list.toString()).toBe(
      "size:3,elements:[Node:Person name:1 age:1->Person name:2 age:2,Node:Person name:2 age:2->Person name:3 age:3,Node:Person name:3 age:3->undefined]"
    );
  });
});
