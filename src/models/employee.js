const { emptyValidationMessage } = require("../../src/validation");
const { Role } = require("./roles");
class Employee {
  constructor(id, firstName, lastName, role, manager) {
    const regex = RegExp(/^[\s+]/gm);

    if (
      typeof firstName !== "string" ||
      !isNaN(firstName) ||
      !firstName.trim().length ||
      regex.test(firstName)
    ) {
      throw Error(emptyValidationMessage("First name"));
    }
    if (
      typeof lastName !== "string" ||
      !isNaN(lastName) ||
      !lastName.trim().length ||
      regex.test(lastName)
    ) {
      throw Error(emptyValidationMessage("Last name"));
    }
    if (!role) throw Error(emptyValidationMessage("Role"));
    if (!(role instanceof Role)) throw Error("Role must be a Role");

    if (manager !== undefined) {
      if (!(manager instanceof Employee))
        throw Error("Manager must be an employee");
    }
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = firstName + " " + lastName;
    this.role = role;
    this.manager = manager;
  }
}

module.exports = { Employee };
