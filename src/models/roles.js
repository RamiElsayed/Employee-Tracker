const { emptyValidationMessage } = require('../../src/validation');
class Role {
  constructor(id, title, salary, department_id) {
    const regex = RegExp(/^[\s+]/gm);

    if (typeof title !== "string" || !title.trim().length|| regex.test(title)) {
      throw new Error(emptyValidationMessage('Title'));
    };

    if (salary === "" || isNaN(salary) || regex.test(salary) || salary < 0) {
      throw new Error(emptyValidationMessage('Salary'));
    };
    if (department_id === "" || regex.test(department_id)) {
      throw new Error(emptyValidationMessage('Department_Id'));
    }
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
  }
}

module.exports = { Role };
