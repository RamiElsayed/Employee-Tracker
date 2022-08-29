const { describe, expect,it } = require("@jest/globals");
const { Department } = require("../../src/models/department");
const { Role } = require("../../src/models/roles");
const { emptyValidationMessage } = require('../../src/validation');

describe("role", () => {
  const department = new Department(1, 'Finance');

  it("constructor", () => {
    const role = new Role(1, "Accountant", 80000, department);

    expect(role.id).toBe(1);
    expect(role.title).toBe("Accountant");
    expect(role.salary).toBe(80000);
    expect(role.department).toBe(department);
  });

  it.each([
    ["Title", 2, null, 80000, department],
    ["Salary", 2, "Accountant", null, department],
    ["Department", 2, "Accountant" , 80000, null],
  ])(
    "constructor throws when %s is null",
    (property, id, title, salary, department) => {
      const createRole = () => new Role(id, title, salary, department);
      expect(createRole).toThrowError(emptyValidationMessage(property));
    }
  );

  it("constructor throws when title is empty", () => {
    const createRole = () => new Role(1, "", 80000, department);
    expect(createRole).toThrowError(emptyValidationMessage("Title"));
  });

  it("constructor throws when title is whitespace", () => {
    const createRole = () => new Role(1, " ", 80000, department);
    expect(createRole).toThrowError(emptyValidationMessage("Title"));
  });

  it("constructor throws when salary is not a number", () => {
    const createRole = () => new Role(1, "Accountant", "abc", department);
    expect(createRole).toThrowError(emptyValidationMessage("Salary"));
  });

  it("constructor throws when department is not a Department", () => {
    const createRole = () => new Role(1, "Accountant", 80000, 5);
    expect(createRole).toThrowError("Department must be a Department");
  });
});
