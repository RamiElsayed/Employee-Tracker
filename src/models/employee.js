const { emptyValidationMessage } = require('../../src/validation');
class Employee {
  constructor(id, first_name, last_name, title, department, salary, manager) {
    const regex = RegExp(/^[\s+]/gm);

    if (typeof first_name !== "string" || !(isNaN(first_name)) || !(first_name.trim().length)|| regex.test(first_name)) {
      throw new Error(emptyValidationMessage('First_name'));
    };

    if (typeof last_name !== "string" || !(isNaN(last_name))|| !(last_name.trim().length) || regex.test(last_name) ) {
      throw new Error(emptyValidationMessage('Last_name'));
    }
    if (salary === "" || isNaN(salary)|| regex.test(salary)) {
      throw new Error(emptyValidationMessage('Role'));
    }
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.title = title,
    this.department = department,
    this.salary = salary;
    this.manager = manager;
  }
}

module.exports = { Employee };