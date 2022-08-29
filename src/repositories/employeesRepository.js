const { Employee } = require("../models/employee");

class EmployeesRepository {
  constructor(db) {
    this.db = db;
  }

  getEmployees = async () => {
    const sql = `
    SELECT
      employee.id employeeId,
      employee.firstName employeeFirstName,
      employee.lastName employeeLastName,
      roles.id roleId
      roles.title roleTitle,
      roles.salary roleSalary,
      department.id departmentId,
      department.name departmentName
      employee.manager
    FROM employee, roles, department
    WHERE employee.roleId = roles.id and roles.departmentId = department.id`;
    let [rows] = await this.db.execute(sql);
    
    return rows.map(
      (x) =>
        new Employee(
          x.id,
          x.firstName,
          x.lastName,
          x.title,
          x.department,
          x.salary,
          x.manager
        )
    );
  };
  getManagerName = async () => {
    const sql = `SELECT CONCAT(employee.firstName, ' ', employee.lastName) AS name FROM employee`;
    let [rows] = await this.db.execute(sql);
    return rows.map(x => x.name);
  };
  addEmployee = async (employee) => {
    if (!(employee instanceof Employee)) throw Error("Must be a employee");
    const titleSql = `SELECT id FROM roles where title= (?)`;
    const [rows] = await db.execute(titleSql, [employee.title]);
    console.log(rows)
    const sql = "INSERT INTO employee (firstName, lastName,manager,role) VALUES (?,?,?,?,?,?)";
    console.log('add employee');
    await this.db.execute(sql,[employee.firstName, employee.lastName, employee.manager, employee.title]);
    console.log('done adding employee');
  }
}

module.exports = {
  EmployeesRepository,
};
