import { getPatient } from "../../src/utils/model";

describe("Patient", () => {
  test("name", () => {
    const p = getPatient(1);
    expect(p.name).toBe("1");
  });
  test("toString", () => {
    const p = getPatient(1);
    expect(p.toString()).toBe("Patient name:1 boneBreak:1");
  });
});
