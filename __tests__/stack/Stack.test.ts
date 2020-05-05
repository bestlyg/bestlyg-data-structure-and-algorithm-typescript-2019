import { Person, getPerson } from "../../src/utils/model";
import Stack from "../../src/core/stack/Stack";
function getNewStack(): Stack<Person> {
  return new Stack<Person>();
}
describe("Stack", () => {
  test("push", () => {
    const stack = getNewStack();
    const obj1 = getPerson(1);
    stack.push(obj1);
    expect(stack.top()).toBe(obj1);
    const obj2 = getPerson(2);
    stack.push(obj2);
    expect(stack.top()).toBe(obj2);
  });
  test("isEmpty and clear", () => {
    const stack = getNewStack();
    expect(stack.isEmpty()).toBe(true);
    const obj1 = getPerson(1);
    stack.push(obj1);
    expect(stack.isEmpty()).toBe(false);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
  });
  test("size", () => {
    const stack = getNewStack();
    expect(stack.size()).toBe(0);
    const obj1 = getPerson(1);
    stack.push(obj1);
    expect(stack.size()).toBe(1);
  });
  test("top", () => {
    const stack = getNewStack();
    const obj1 = getPerson(1);
    stack.push(obj1);
    expect(stack.top()).toBe(obj1);
    const obj2 = getPerson(2);
    stack.push(obj2);
    expect(stack.top()).toBe(obj2);
    const obj3 = getPerson(3);
    stack.push(obj3);
    expect(stack.top()).toBe(obj3);
  });
  test("pop", () => {
    const stack = getNewStack();
    const obj2 = getPerson(2);
    const obj3 = getPerson(3);
    stack.push(getPerson(1));
    stack.push(obj2);
    stack.push(obj3);
    expect(stack.pop()).toBe(obj3);
    expect(stack.pop()).toBe(obj2);
  });
  test("throwEmpty", () => {
    const stack = getNewStack();
    try {
      stack.pop();
    } catch (error) {
      expect(error.toString()).toBe(
        "Error: Stack is Empty can not use the Method: pop"
      );
    }
  });
});
