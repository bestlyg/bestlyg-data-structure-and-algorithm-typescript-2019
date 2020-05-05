import AVLNode from "../../src/core/tree/AVLNode";

describe("AVLNode", () => {
  test("balanceFactor", () => {
    const node1 = new AVLNode<number>(1);
    const node2 = new AVLNode<number>(2, node1);
    const node3 = new AVLNode<number>(3, node1);
    const node4 = new AVLNode<number>(3, node2);
    node1.left = node2;
    node1.right = node3;
    node2.left = node4;
    node2.updateHeight();
    node1.updateHeight();
    expect(node1.balanceFactor()).toBe(1);
    expect(node4.balanceFactor()).toBe(0);
  });
  test("leftHeight", () => {
    const node1 = new AVLNode<number>(1);
    const node2 = new AVLNode<number>(2, node1);
    const node3 = new AVLNode<number>(3, node1);
    const node4 = new AVLNode<number>(3, node2);
    node1.left = node2;
    node1.right = node3;
    node2.left = node4;
    node2.updateHeight();
    node1.updateHeight();
    expect(node1.tallerChild()).toBe(node2);
    expect(node2.tallerChild()).toBe(node4);
  });
  describe("tallerChild", () => {
    test("leftHeight > rightHeight", () => {
      const node1 = new AVLNode<number>(1);
      const node2 = new AVLNode<number>(2, node1);
      const node3 = new AVLNode<number>(3, node1);
      const node4 = new AVLNode<number>(3, node2);
      node1.left = node2;
      node1.right = node3;
      node2.left = node4;
      node2.updateHeight();
      node1.updateHeight();
      expect(node1.tallerChild()).toBe(node1.left);
    });
    test("leftHeight < rightHeight", () => {
      const node1 = new AVLNode<number>(1);
      const node2 = new AVLNode<number>(2, node1);
      const node3 = new AVLNode<number>(3, node1);
      const node4 = new AVLNode<number>(3, node3);
      node1.left = node2;
      node1.right = node3;
      node3.left = node4;
      node3.updateHeight();
      node1.updateHeight();
      expect(node1.tallerChild()).toBe(node1.right);
    });
    test("leftHeight = rightHeight", () => {
      const node1 = new AVLNode<number>(1);
      const node2 = new AVLNode<number>(2, node1);
      const node3 = new AVLNode<number>(3, node1);
      const node4 = new AVLNode<number>(3, node3);
      const node5 = new AVLNode<number>(4, node3);
      const node6 = new AVLNode<number>(4, node2);
      const node7 = new AVLNode<number>(4, node2);
      node1.left = node2;
      node1.right = node3;
      node3.left = node4;
      node3.right = node5;
      node2.left = node6;
      node2.right = node7;
      node2.updateHeight();
      node3.updateHeight();
      node1.updateHeight();
      expect(node3.tallerChild()).toBe(node3.right);
      expect(node2.tallerChild()).toBe(node2.left);
    });
  });
});
