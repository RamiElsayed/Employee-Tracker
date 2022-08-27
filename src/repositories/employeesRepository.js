const { Employee } = require("../models/employee");

class EmployeesRepository {
  constructor(db) {
    this.db = db;
  }

  getEmployees = async () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS title, department.name AS department, roles.salary, employee.manager from employee, roles, department WHERE employee.role = roles.id and roles.department = department.id`;
    let [rows] = await this.db.execute(sql);
    console.log(rows);
    return rows.map(
      (x) =>
        new Employee(
          x.id,
          x.first_name,
          x.last_name,
          x.title,
          x.department,
          x.salary,
          x.manager
        )
    );
  };
}

module.exports = {
  EmployeesRepository,
};
