const { emptyValidationMessage } = require('../../src/validation');
const { Employee } = require("../../src/models/employee");

describe("employee", () => {

    it("This should retrun the value passed to it", () => {
        const employee = new Employee(2, "Rami", "Badr", 4, 3);

        expect(employee.id).toBe(2);
        expect(employee.first_name).toBe("Rami");
        expect(employee.last_name).toBe("Badr");
        expect(employee.department_id).toBe(4);
        expect(employee.role_id).toBe(3);
    });
    it.each([
        ["First_name", 2, " ", "Badr", 4, 3],
        ["Last_name", 2, "Rami" , " ", 4, 3],
        ["Department_id", 2, "Rami" , "Badr", " ", 3],
        ["Role_id", 2, "Rami" , "Badr", 4, " "],
      ])(
        "constructor when %s is whitespace",
        (property, id, first_name, last_name, department_id, role_id) => {
          const createEmployee = () => new Employee(id, first_name, last_name, department_id, role_id);
          expect(createEmployee).toThrowError(emptyValidationMessage(property));
        }
      );
    it.each([
        ["First_name", 2, "", "Badr", 4, 3],
        ["Last_name", 2, "Rami" , "", 4, 3],
        ["Department_id", 2, "Rami" , "Badr", "", 3],
        ["Role_id", 2, "Rami" , "Badr", 4, ""],
      ])(
        "constructor when %s is empty",
        (property, id, first_name, last_name, department_id, role_id) => {
          const createEmployee = () => new Employee(id, first_name, last_name, department_id, role_id);
          expect(createEmployee).toThrowError(emptyValidationMessage(property));
        }
      );
});