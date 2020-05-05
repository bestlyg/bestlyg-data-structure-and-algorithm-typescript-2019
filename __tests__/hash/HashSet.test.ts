import { Person, getPerson } from "../../src/utils/model";
import { toString } from "../../src/utils";
import HashSet from "../../src/core/hash/HashSet";
function getNewSet(): HashSet<Person> {
  return new HashSet<Person>();
}
describe("HashSet", () => {
  test("toString", () => {
    const set = getNewSet();
    set.add(getPerson(1));
    expect(toString(set)).toBe("Person name:1 age:1");
  });
});
