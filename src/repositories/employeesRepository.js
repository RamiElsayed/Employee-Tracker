const { Department } = require("../models/department");
const { Employee } = require("../models/employee");
const {
  EmployeeDashboardItem,
  EmployeeDashboard,
} = require("../models/employeeDashboard");
const { Role } = require("../models/roles");

class EmployeesRepository {
  constructor(db) {
    this.db = db;
  }

  getEmployeeDashboard = async () => {
    const sql = `
    SELECT
      e.id,
      e.firstName,
      e.lastName,
      r.title,
      d.name department,
      r.salary,
      d.id departmentId,
      CONCAT(m.firstName, ' ', m.lastName) AS manager
    FROM employee e
    JOIN roles r ON e.roleId = r.id
    JOIN department d ON r.departmentId = d.id
    LEFT JOIN employee m ON e.managerId = m.id`;

    let [rows] = await this.db.execute(sql);
    const items = rows.map(
      (x) =>
        new EmployeeDashboardItem(
          x.id,
          x.firstName,
          x.lastName,
          x.title,
          x.department,
          x.salary,
          x.manager
        )
    );
    return new EmployeeDashboard(items);
  };

  getEmployees = async () => {
    const sql = `
    SELECT
      e.id id,
      e.firstName firstName,
      e.lastName lastName,
      r.id roleId,
      r.title roleTitle,
      r.salary roleSalary,
      d.id departmentId,
      d.name departmentName
    FROM employee e
    JOIN roles r ON e.roleId = r.id
    JOIN department d ON r.departmentId = d.id`;
    let [rows] = await this.db.execute(sql);
    return rows.map((x) => {
      const department = new Department(x.departmentId, x.departmentName);

      const role = new Role(x.roleId, x.roleTitle, x.roleSalary, department);
      return new Employee(x.id, x.firstName, x.lastName, role);
    });
  };

  addEmployee = async (employee) => {
    if (!(employee instanceof Employee)) throw Error("Must be a employee");
    const sql =
      "INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES (?,?,?,?)";
    console.log("add employee");
    await this.db.execute(sql, [
      employee.firstName,
      employee.lastName,
      employee.role.id,
      employee.manager.id,
    ]);
    console.log("done adding employee");
  };
  updateEmployeeRole = async (employee, role) => {
    if (!(employee instanceof Employee)) throw Error("Must be a employee");
    if (!(role instanceof Role)) throw Error("Must be a role");
    const sql = "UPDATE employee SET roleId = (?) WHERE id = (?)";
    console.log("update role");
    await this.db.execute(sql, [role.id, employee.id]);
    console.log("done updating employee role");
  };
}

module.exports = {
  EmployeesRepository,
};
