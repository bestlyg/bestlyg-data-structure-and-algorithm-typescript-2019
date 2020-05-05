import GenericUnionFind from "../../src/core/union/GenericUnionFind";
import { Person, getPerson } from "../../src/utils/model";
function getUnionFind(): GenericUnionFind<Person> {
  return new GenericUnionFind<Person>();
}
describe("GenericUnionFind", () => {
  test("makeSet", () => {
    const union = getUnionFind();
    union.makeSet(getPerson(1));
    union.makeSet(getPerson(1));
  });
  test("find undefined", () => {
    const union = getUnionFind();
    expect(union.find(getPerson(1))).toBeUndefined();
  });
  test("union", () => {
    const union = getUnionFind();
    union.makeSet(getPerson(1));
    union.makeSet(getPerson(2));
    union.union(getPerson(3), getPerson(4));
    union.union(getPerson(1), new Person("1", 1));
  });
});
