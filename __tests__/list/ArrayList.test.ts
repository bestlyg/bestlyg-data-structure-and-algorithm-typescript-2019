import ArrayList from "../../src/core/list/ArrayList";
import { Person, getPerson } from "../../src/utils/model";
function getNewList(): ArrayList<Person> {
  return new ArrayList<Person>();
}

describe("ArrayList", () => {
  test("toString", () => {
    const string = "size:2,elements:[Person name:1 age:1,Person name:2 age:2]";
    const list = getNewList();
    list.add(getPerson(1));
    list.add(getPerson(2));
    expect(list.toString()).toBe(string);
  });
});
