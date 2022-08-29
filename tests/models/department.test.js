const { describe, expect, test, it } = require("@jest/globals");
const { Department } = require("../../src/models/department");

describe("Department", () => {
  it("constructor", () => {
    const department = new Department(null, "HR");

    expect(department.id).toBe(null);
    expect(department.name).toBe("HR");
  });

  it("constructor throws when name is empty", async () => {
    const createDepartment = () => new Department(null, "");
    expect(createDepartment).toThrowError("please enter a department name");
  });

  it("constructor throws when name is whitespace", async () => {
    const createDepartment = () => new Department(null, "  ");
    expect(createDepartment).toThrowError("please enter a department name");
  });
  
  it("constructor throws when name is not a string", async () => {
    const createDepartment = () => new Department(null, 12);
    expect(createDepartment).toThrowError("please enter a department name");
  });
});
