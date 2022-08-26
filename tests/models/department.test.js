const { describe, expect, test, it } = require("@jest/globals");
const { Department } = require("../../src/models/department");

describe("Department", () => {
  it("This should retrun the value passed to it", () => {
    const department = new Department(null, "HR");

    expect(department.id).toBe(null);
    expect(department.name).toBe("HR");
  });
  it("This should retrun an error when given empty string", async () => {
    const createDepartment = () => new Department(null, "");
    expect(createDepartment).toThrowError("please enter a department name");
  });
  it("This should retrun an error when given white spaces", async () => {
    const createDepartment = () => new Department(null, "  ");
    expect(createDepartment).toThrowError("please enter a department name");
  });
  it("This should retrun an error when given white spaces", async () => {
    const createDepartment = () => new Department(null, 12);
    expect(createDepartment).toThrowError("please enter a department name");
  });
});
