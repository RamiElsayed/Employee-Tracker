const { emptyValidationMessage } = require('../../src/validation');
const { Employee } = require("../../src/models/employee");
const { Role } = require('../../src/models/roles');
const { Department } = require('../../src/models/department');

describe("employee", () => {
    const role = new Role(1, "Web Developer", 50, new Department(1, "Software"));

    it("constructor", () => {
      const employee = new Employee(2, "Rami", "Badr", role, "Development", 35000, "Ben");

        expect(employee.id).toBe(2);
        expect(employee.firstName).toBe("Rami");
        expect(employee.lastName).toBe("Badr");
        expect(employee.role).toBe(role);
        expect(employee.department).toBe("Development");
        expect(employee.salary).toBe(35000);
        expect(employee.manager).toBe("Ben");
      });

      it.each([
        
        ["First name", null,"Badr", "Development", 35000, "Ben"],
        ["Last name", "Rami" , null, "Development", 35000, "Ben"],
        ["Department", "Rami" , "Badr", null, 35000, "Ben"],
          ["Salary", "Rami", "Badr", "Development", null, "Ben"],
          ["Manager", "Rami" , "Badr", "Development", 35000,null]
        ])(
          "constructor throws when %s is null",
          (property, firstName, lastName, department, salary, manager) => {
            const createEmployee = () => new Employee(2, firstName, lastName, role, department, salary, manager);
            expect(createEmployee).toThrowError(emptyValidationMessage(property));
          }
        );

      it.each([
        ["First name", "","Badr", "Development", 35000, "Ben"],
        ["Last name", "Rami" , "", "Development", 35000, "Ben"],
        ["Department", "Rami" , "Badr", "", 35000, "Ben"],
          ["Salary", "Rami", "Badr", "Development", "", "Ben"],
          ["Manager", "Rami" , "Badr", "Development", 35000, ""]
        ])(
          "constructor throws when %s is empty",
          (property, firstName, lastName, department, salary, manager) => {
            const createEmployee = () => new Employee(2, firstName, lastName, role, department, salary, manager);
            expect(createEmployee).toThrowError(emptyValidationMessage(property));
          }
        );

    it.each([
        ["First name", " ","Badr", "Development", 35000, "Ben"],
        ["Last name", "Rami" , " ", "Development", 35000, "Ben"],
        ["Department", "Rami" , "Badr", " ", 35000, "Ben"],
        ["Salary", "Rami", "Badr", "Development", " ", "Ben"],
        ["Manager", "Rami" , "Badr", "Development", 35000," "],
      ])(
        "constructor throws when %s is whitespace",
        (property, firstName, lastName, department, salary, manager) => {
          const createEmployee = () => new Employee(2, firstName, lastName, role, department, salary, manager);
          expect(createEmployee).toThrowError(emptyValidationMessage(property));
        }
      );
});