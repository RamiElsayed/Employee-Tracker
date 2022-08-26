const { describe, expect, test, it } = require("@jest/globals");
const { Department } = require("../../src/models/department");

describe("Department", () => {
  it("This should retrun the value passed to it", () => {
    const department = new Department(null, "HR");

    expect(department.id).toBe(null);
    expect(department.name).toBe("HR");
  });
});
