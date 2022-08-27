const { describe, expect,it } = require("@jest/globals");
const { Role } = require("../../src/models/roles");
const { emptyValidationMessage } = require('../../src/validation');

describe("role", () => {
  it("This should retrun the value passed to it", () => {
    const role = new Role(1, "Accountant", 80000, 2);

    expect(role.id).toBe(1);
    expect(role.title).toBe("Accountant");
    expect(role.salary).toBe(80000);
    expect(role.department).toBe(2);
  });
  it.each([
    ["Title", 2, " ", 80000, 3],
    ["Salary", 2, "Accountant", " ", "ramielsayed"],
    ["Department", 2, "Accountant" , 80000, " "],
  ])(
    "constructor when %s is whitespace",
    (property, id, title, salary, department) => {
      const createRole = () => new Role(id, title, salary, department);
      expect(createRole).toThrowError(emptyValidationMessage(property));
    }
  );
  it.each([
    ["Title", 2, "", 80000, 3],
    ["Salary", 2, "Accountant", "", "ramielsayed"],
    ["Department", 2, "Accountant" , 80000, ""],
  ])(
    "constructor when %s is empty",
    (property, id, title, salary, department) => {
      const createRole = () => new Role(id, title, salary, department);
      expect(createRole).toThrowError(emptyValidationMessage(property));
    }
  );
});
