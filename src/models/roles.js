const { emptyValidationMessage } = require('../../src/validation');
const { Department } = require('./department');
class Role {
  constructor(id, title, salary, department) {
    const regex = RegExp(/^[\s+]/gm);

    if (typeof title !== "string" || !title.trim().length|| regex.test(title)) {
      throw new Error(emptyValidationMessage('Title'));
    };

    if (!salary || isNaN(salary) || salary < 0) {
      throw new Error(emptyValidationMessage('Salary'));
    };
    if (!department)
      throw Error(emptyValidationMessage('Department'));
    if (!(department instanceof Department))
      throw Error("Department must be a Department");

    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department = department;
  }
}

module.exports = { Role };
