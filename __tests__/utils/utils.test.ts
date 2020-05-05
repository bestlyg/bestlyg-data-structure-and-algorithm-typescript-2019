import {
  isNumber,
  extend,
  repeat,
  blank,
  isBoolean,
  isString,
  isIHash,
  warn,
  isIComparable,
  toUint32,
  hashCode,
  getClassName,
  equals,
  isObject,
  random,
  timePrint,
  timeString,
  numberString,
  padCompletion
} from "../../src/utils";
import { getPerson, getKey } from "../../src/utils/model";
describe("Utils Test", () => {
  test("time", () => {
    let err = "";
    try {
      timePrint(() => {
        const string = "test time";
      });
      timePrint(() => {
        const string = "test time";
      }, "test");
    } catch (error) {
      err = error;
    }
    expect(err).toBe("");
  });
  test("timeString", () => {
    let time = timeString(() => {
      for (let i = 0; i < 10; i++) {
        let time = "timeString" + i;
        time += "";
      }
    });
    time = timeString(() => {
      for (let i = 0; i < 10; i++) {
        let time = "timeString" + i;
        time += "";
      }
    });
    expect(time).toBeLessThan(1000);
  });
  test("warn", () => {
    let err = "";
    try {
      warn("test warn");
    } catch (error) {
      err = error;
    }
    expect(err).toBe("");
  });
  test("isNumber", () => {
    expect(isNumber(1)).toBeTruthy();
    expect(isNumber(null)).toBeFalsy();
    expect(isNumber("1")).toBeFalsy();
  });
  test("isBoolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(1)).toBe(false);
  });
  test("isString", () => {
    expect(isString("false")).toBe(true);
    expect(isString(1)).toBe(false);
  });
  test("isObject", () => {
    expect(isObject(null)).toBeFalsy();
  });
  test("isIHash", () => {
    let boolean = false;
    if (isIHash(getKey(1))) boolean = true;
    expect(boolean).toBe(true);
    if (!isIHash({})) boolean = false;
    expect(boolean).toBe(false);
  });
  test("padCompletion", () => {
    const demo = padCompletion("11", 3, "-");
    expect(demo).toBe("-11");
    const demo2 = padCompletion("11", 3, "-", "End");
    expect(demo2).toBe("11-");
  });
  test("isIComparable", () => {
    let boolean = false;
    if (isIComparable(getPerson(1))) boolean = true;
    expect(boolean).toBe(true);
    if (!isIComparable(null)) boolean = false;
    expect(boolean).toBe(false);
    boolean = true;
    if (!isIComparable(null)) boolean = false;
    expect(boolean).toBe(false);
  });
  test("extend", () => {
    function a(): number {
      return 1;
    }
    const b = { test: "this is a test string" };
    const extendObj = extend(a, b);
    expect(extendObj()).toBe(1);
    expect(extendObj.test).toBe(b.test);
  });
  test("repeat", () => {
    const string = repeat("-", 3);
    expect(string).toBe("---");
    const string2 = repeat("-", -1);
    expect(string2).toBe("");
  });
  test("blank", () => {
    const string = blank(3);
    expect(string).toBe("   ");
  });
  test("toUint32", () => {
    expect(toUint32(Number.MAX_SAFE_INTEGER)).toBe(4294967295);
    expect(toUint32(1)).toBe(1);
  });
  test("hashCode", () => {
    expect(hashCode("1")).toBe(49);
    expect(hashCode("")).toBe(0);
    expect(hashCode(true)).toBe(1231);
    expect(hashCode(false)).toBe(1237);
    expect(hashCode(null)).toBe(0);
    expect(hashCode(getKey(1))).toBe(0);
  });
  test("getClassName", () => {
    expect(getClassName(getKey(1))).toBe("Key");
    expect(getClassName(getPerson(1))).toBe("Person");
    expect(getClassName(2)).toBe("");
  });
  test("equals", () => {
    expect(equals(getKey(1), getKey(2))).toBe(false);
    expect(equals(getKey(1), getKey(1))).toBe(true);
    expect(equals(getPerson(1), getPerson(1))).toBe(true);
    expect(equals(1, 1)).toBe(true);
    expect(equals("1", 1)).toBe(false);
  });
  test("random", () => {
    const num = random(2, 10);
    expect(num).toBeLessThanOrEqual(10);
    expect(num).toBeGreaterThanOrEqual(2);
  });
  test("numberString", () => {
    expect(numberString(1)).toBe("1.00次");
    expect(numberString(10000)).toBe("1.00万");
    expect(numberString(11200.123)).toBe("1.12万");
    expect(numberString(11300.125)).toBe("1.13万");
    expect(numberString(100000000)).toBe("1.00亿");
    expect(numberString(112000000.123)).toBe("1.12亿");
    expect(numberString(113000000.125)).toBe("1.13亿");
  });
});
