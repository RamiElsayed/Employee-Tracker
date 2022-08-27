const { emptyValidationMessage } = require('../../src/validation');
const { Employee } = require("../../src/models/employee");

describe("employee", () => {

    it("This should retrun the value passed to it", () => {
        const employee = new Employee(2, "Rami", "Badr", "Web Developer", "Development", 35000, "Ben");

        expect(employee.id).toBe(2);
        expect(employee.first_name).toBe("Rami");
        expect(employee.last_name).toBe("Badr");
        expect(employee.title).toBe("Web Developer");
        expect(employee.department).toBe("Development");
        expect(employee.salary).toBe(35000);
        expect(employee.manager).toBe("Ben");
    });
    it.each([
        ["First_name", 2, " ","Badr", "Web Developer", "Development", 35000, "Ben"],
        ["Last_name", 2, "Rami" , " ","Web Developer", "Development", 35000, "Ben"],
        ["Title", 2, "Rami" , "Badr", " ","Development", 35000, "Ben"],
        ["Department", 2, "Rami" , "Badr", "Web Developer", " ", 35000, "Ben"],
        ["Salary", 2, "Rami", "Badr", "Web Developer","Development", " ", "Ben"],
        ["Manager", 2, "Rami" , "Badr", "Web Developer", "Development", 35000," "],
      ])(
        "constructor when %s is whitespace",
        (property, id, first_name, last_name, title, department, salary, manager) => {
          const createEmployee = () => new Employee(id, first_name, last_name, title, department, salary, manager);
          expect(createEmployee).toThrowError(emptyValidationMessage(property));
        }
      );
    it.each([
      ["First_name", 2, "","Badr", "Web Developer", "Development", 35000, "Ben"],
      ["Last_name", 2, "Rami" , "","Web Developer", "Development", 35000, "Ben"],
      ["Title", 2, "Rami" , "Badr", "","Development", 35000, "Ben"],
      ["Department", 2, "Rami" , "Badr", "Web Developer", "", 35000, "Ben"],
        ["Salary", 2, "Rami", "Badr", "Web Developer","Development", "", "Ben"],
        ["Manager", 2, "Rami" , "Badr", "Web Developer", "Development", 35000,""],
      ])(
        "constructor when %s is empty",
        (property, id, first_name, last_name, title, department, salary, manager) => {
          const createEmployee = () => new Employee(id, first_name, last_name, title, department, salary, manager);
          expect(createEmployee).toThrowError(emptyValidationMessage(property));
        }
      );
});