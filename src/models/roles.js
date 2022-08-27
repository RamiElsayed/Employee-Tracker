const { emptyValidationMessage } = require('../../src/validation');
class Role {
  constructor(id, title, salary, department) {
    const regex = RegExp(/^[\s+]/gm);

    if (typeof title !== "string" || !title.trim().length|| regex.test(title)) {
      throw new Error(emptyValidationMessage('Title'));
    };

    if (salary === "" || isNaN(salary) || regex.test(salary) || salary < 0) {
      throw new Error(emptyValidationMessage('Salary'));
    };
    if (department === "" || regex.test(department)) {
      throw new Error(emptyValidationMessage('Department'));
    }
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department = department;
  }
}

module.exports = { Role };
