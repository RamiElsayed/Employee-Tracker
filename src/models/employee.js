const { emptyValidationMessage } = require('../../src/validation');
class Employee {
  constructor(id, first_name, last_name, department_id, role_id) {
    const regex = RegExp(/^[\s+]/gm);

    if (typeof first_name !== "string" || !(isNaN(first_name)) || !(first_name.trim().length)|| regex.test(first_name)) {
      throw new Error(emptyValidationMessage('First_name'));
    };

    if (typeof last_name !== "string" || !(isNaN(last_name))|| !(last_name.trim().length) || regex.test(last_name) ) {
      throw new Error(emptyValidationMessage('Last_name'));
    };
    if (department_id === "" || isNaN(department_id) || regex.test(department_id)) {
      throw new Error(emptyValidationMessage('Department_id'));
    }
    if (role_id === "" || isNaN(role_id)|| regex.test(role_id)) {
      throw new Error(emptyValidationMessage('Role_id'));
    }
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.department_id = department_id;
    this.role_id = role_id;
  }
}

module.exports = { Employee };