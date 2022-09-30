const { emptyValidationMessage } = require("../../src/validation");
const { Employee } = require("../../src/models/employee");
const { Role } = require("../../src/models/roles");
const { Department } = require("../../src/models/department");

describe("employee", () => {
  const role = new Role(1, "Web Developer", 50, new Department(1, "Software"));
  const manager = new Employee(3, "Ben", "Farrimond", role);
  it("constructor", () => {
    const employee = new Employee(2, "Rami", "Badr", role, manager);

    expect(employee.id).toBe(2);
    expect(employee.firstName).toBe("Rami");
    expect(employee.lastName).toBe("Badr");
    expect(employee.role).toBe(role);
    expect(employee.manager).toBe(manager);
  });

  it.each([
    ["First name", null, "Badr"],
    ["Last name", "Rami", null],
  ])("constructor throws when %s is null", (property, firstName, lastName) => {
    const createEmployee = () =>
      new Employee(2, firstName, lastName, role, manager);
    expect(createEmployee).toThrowError(emptyValidationMessage(property));
  });

  it.each([
    ["First name", "", "Badr"],
    ["Last name", "Rami", ""],
  ])("constructor throws when %s is empty", (property, firstName, lastName) => {
    const createEmployee = () =>
      new Employee(2, firstName, lastName, role, manager);
    expect(createEmployee).toThrowError(emptyValidationMessage(property));
  });

  it.each([
    ["First name", " ", "Badr"],
    ["Last name", "Rami", " "],
  ])(
    "constructor throws when %s is whitespace",
    (property, firstName, lastName) => {
      const createEmployee = () =>
        new Employee(2, firstName, lastName, role, manager);
      expect(createEmployee).toThrowError(emptyValidationMessage(property));
    }
  );
  it("constructor throws when manager is not an employee", () => {
    const createEmployee = () => new Employee(2, "Rami", "Badr", role, "");
    expect(createEmployee).toThrowError("Manager must be an employee");
  });
});
