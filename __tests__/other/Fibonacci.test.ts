import Fibonacci from "../../src/core/other/Fibonacci";
describe("Fibonacci", () => {
  describe("fib1", () => {
    const fib1 = Fibonacci.fib1;
    test("fib1 1", () => {
      expect(fib1(0)).toBe(1);
    });
    test("fib1 >1", () => {
      expect(fib1(5)).toBe(8);
    });
  });
  describe("fib2", () => {
    const fib2 = Fibonacci.fib2;
    test("fib2 1", () => {
      expect(fib2(0)).toBe(1);
    });
    test("fib2 >1", () => {
      expect(fib2(5)).toBe(8);
    });
  });
  describe("fib3", () => {
    const fib3 = Fibonacci.fib3;
    test("fib3 1", () => {
      expect(fib3(0)).toBe(1);
    });
    test("fib3 >1", () => {
      expect(fib3(5)).toBe(8);
    });
  });
});
