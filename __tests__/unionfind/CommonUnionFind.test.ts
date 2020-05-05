import { getClassName } from "../../src/utils";
import IUnionFind from "../../src/core/union/IUnionFind";
import UnionFind_QF from "../../src/core/union/UnionFind_QF";
import UnionFind_QU from "../../src/core/union/UnionFind_QU";
import UnionFind_QU_S from "../../src/core/union/UnionFind_QU_S";
import UnionFind_QU_R from "../../src/core/union/UnionFind_QU_R";
import UnionFind_QU_R_PC from "../../src/core/union/UnionFind_QU_R_PC";
import UnionFind_QU_R_PH from "../../src/core/union/UnionFind_QU_R_PH";
import UnionFind_QU_R_PS from "../../src/core/union/UnionFind_QU_R_PS";

const run = (UnionFind: new (count: number) => IUnionFind): void => {
  const count = 10000;
  const uf = new UnionFind(count);
  const name = getClassName(uf);
  test(name, () => {
    uf.union(0, 1);
    uf.union(0, 3);
    uf.union(0, 4);
    uf.union(2, 3);
    uf.union(2, 5);
    uf.union(6, 7);
    uf.union(8, 10);
    uf.union(9, 10);
    uf.union(9, 11);
    expect(uf.isSame(2, 7)).toBeFalsy();
    uf.union(4, 6);
    expect(uf.isSame(2, 7)).toBeTruthy();
  });
  test("big data", () => {
    for (let i = 0; i < count; i++)
      uf.union(
        Math.floor(Math.random() * count),
        Math.floor(Math.random() * count)
      );
    for (let i = 0; i < count; i++)
      uf.isSame(
        Math.floor(Math.random() * count),
        Math.floor(Math.random() * count)
      );
  });
  describe("error", () => {
    test("capacity", () => {
      try {
        const uf = new UnionFind(-1);
        uf.union(1, 2);
      } catch (error) {
        expect(error.toString()).toBe("Error: capacity must be >= 1");
      }
    });
    test("rangeCheck", () => {
      try {
        const uf = new UnionFind(count);
        uf.find(count);
      } catch (error) {
        expect(error.toString()).toBe("Error: v is out of bounds");
      }
      try {
        const uf = new UnionFind(count);
        uf.find(-1);
      } catch (error) {
        expect(error.toString()).toBe("Error: v is out of bounds");
      }
    });
  });
};
describe("CommonUnionFind", () => {
  run(UnionFind_QF);
  run(UnionFind_QU);
  run(UnionFind_QU_S);
  run(UnionFind_QU_R);
  run(UnionFind_QU_R_PC);
  run(UnionFind_QU_R_PH);
  run(UnionFind_QU_R_PS);
});
