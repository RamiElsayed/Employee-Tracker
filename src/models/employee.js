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
    if (typeof title !== "string" || !(isNaN(title))|| !(title.trim().length) || regex.test(title) ) {
      throw new Error(emptyValidationMessage('Title'));
    }
    if (typeof department !== "string" || !(isNaN(department))|| !(department.trim().length) || regex.test(department) ) {
      throw new Error(emptyValidationMessage('Department'));
    }
    if (salary === "" || isNaN(salary)|| regex.test(salary)) {
      throw new Error(emptyValidationMessage('Salary'));
    }
    if (typeof manager !== "string" || !(isNaN(manager))|| !(manager.trim().length) || regex.test(manager) ) {
      throw new Error(emptyValidationMessage('Manager'));
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