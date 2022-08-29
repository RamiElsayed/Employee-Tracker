const { emptyValidationMessage } = require('../../src/validation');
const { Role } = require('./roles');
class Employee {
  constructor(id, firstName, lastName, role, manager) {
    const regex = RegExp(/^[\s+]/gm);

    if (typeof firstName !== "string" || !(isNaN(firstName)) || !(firstName.trim().length)|| regex.test(firstName)) {
      throw new Error(emptyValidationMessage('First name'));
    };

    if (typeof lastName !== "string" || !(isNaN(lastName))|| !(lastName.trim().length) || regex.test(lastName) ) {
      throw new Error(emptyValidationMessage('Last name'));
    }
    
    if (!role)
      throw Error(emptyValidationMessage('Role'));
    if (!(role instanceof Role))
      throw Error("Role must be a Role");
    if (typeof department !== "string" || !(isNaN(department))|| !(department.trim().length) || regex.test(department) ) {
      throw new Error(emptyValidationMessage('Department'));
    }
    if (salary === "" || isNaN(salary)|| regex.test(salary)) {
      throw new Error(emptyValidationMessage('Salary'));
    }
    if (!(manager instanceof Employee))
      throw Error("Manager must be an Employee");
    /*if (typeof manager !== "string" || !(isNaN(manager))|| !(manager.trim().length) || regex.test(manager) ) {
      throw new Error(emptyValidationMessage('Manager'));
    }*/
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.department = department;
    this.salary = salary;
    this.manager = manager;
  }
}

module.exports = { Employee };