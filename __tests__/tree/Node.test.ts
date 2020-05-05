import Node from "../../src/core/tree/Node";
import { getPerson, Person } from "../../src/utils/model";

describe("Node", () => {
  test("hasTwoChildren", () => {
    const node = new Node<number>(1);
    node.left = new Node<number>(2, node);
    node.right = new Node<number>(3, node);
    expect(node.hasTwoChildren()).toBe(true);
    expect(node.hasOneChildren()).toBe(false);
    expect(node.hasNoChildren()).toBe(false);
  });
  test("hasOneChildren", () => {
    const node = new Node<number>(1);
    node.left = new Node<number>(2, node);
    expect(node.hasTwoChildren()).toBe(false);
    expect(node.hasOneChildren()).toBe(true);
    expect(node.hasNoChildren()).toBe(false);
  });
  test("hasNoChildren", () => {
    const node = new Node<number>(1);
    expect(node.hasTwoChildren()).toBe(false);
    expect(node.hasOneChildren()).toBe(false);
    expect(node.hasNoChildren()).toBe(true);
  });
  test("isLeftChild", () => {
    const node = new Node<number>(1);
    const node2 = new Node<number>(2, node);
    node.left = node2;
    expect(node2.isLeftChild()).toBe(true);
  });
  test("isRightChild", () => {
    const node = new Node<number>(1);
    const node2 = new Node<number>(2, node);
    node.right = node2;
    expect(node2.isRightChild()).toBe(true);
  });
  test("sibling", () => {
    const node = new Node<number>(1);
    const node2 = new Node<number>(2, node);
    const node3 = new Node<number>(3, node);
    node.left = node2;
    node.right = node3;
    expect(node2.sibling()).toBe(node3);
    expect(node3.sibling()).toBe(node2);
    const node4 = new Node<number>(4);
    expect(node4.sibling()).toBeUndefined();
  });
  test("toString", () => {
    const node = new Node<number>(1);
    expect(String(node)).toBe("1");
    const p = getPerson(1);
    const node2 = new Node<Person>(p);
    expect(String(node2)).toBe("Person name:1 age:1");
  });
});
