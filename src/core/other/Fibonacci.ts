export default class Fibonacci {
  public static fib1(n: number): number {
    if (n <= 1) {
      return 1;
    }
    return Fibonacci.fib1(n - 1) + Fibonacci.fib1(n - 2);
  }
  public static fib2(n: number): number {
    interface NumberObj {
      [num: number]: number;
    }
    const obj: NumberObj = {
      0: 1,
      1: 1
    };
    for (let i = 2; i <= n; i++) {
      obj[i] = obj[i - 1] + obj[i - 2];
    }
    return obj[n];
  }
  public static fib3(n: number): number {
    if (n <= 1) {
      return 1;
    }
    let first = 1,
      second = 1;
    for (let i = 2; i <= n; i++) {
      second = first + second;
      first = second - first;
    }
    return second;
  }
}
