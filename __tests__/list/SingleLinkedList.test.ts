import SingleLinkedList from "../../src/core/list/SingleLinkedList";
import { Person, getPerson } from "../../src/utils/model";
function getNewList(): SingleLinkedList<Person> {
  return new SingleLinkedList<Person>();
}
describe("SingleLinkedList", () => {
  test("toString", () => {
    const list = getNewList();
    list.add(getPerson(1));
    list.add(getPerson(2));
    list.add(getPerson(3));
    expect(list.toString()).toBe(
      "size:3,elements:[Node:Person name:1 age:1->Person name:2 age:2,Node:Person name:2 age:2->Person name:3 age:3,Node:Person name:3 age:3->undefined]"
    );
  });
  test("toString with empty", () => {
    const list = getNewList();
    expect(list.toString()).toBe("size:0,elements:[]");
    list.add(getPerson(1));
    list.remove(0);
    expect(list.toString()).toBe("size:0,elements:[]");
  });
});
