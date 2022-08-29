const { Department } = require("../models/department");
const { Role } = require("../models/roles");

class RolesRepository {
  constructor(db) {
    this.db = db;
  }

  getRoles = async () => {
    const sql = `
    SELECT
      roles.id roleId,
      roles.title roleTitle,
      roles.salary roleSalary,
      department.id departmentId,
      department.name departmentName
    FROM roles
    JOIN department ON roles.departmentId = department.id`;
    let [rows] = await this.db.execute(sql);
    
    return rows.map((x) => {
      const department = new Department(x.departmentId, x.departmentName);
      return new Role(x.roleId, x.roleTitle, x.roleSalary, department);
    });
  };
  
  addRole = async (role) => {
    if (!(role instanceof Role)) throw Error("Must be a Role");
    const sql = `INSERT INTO roles (title,salary,departmentId) VALUES (?,?,?)`;
    console.log("add role");
    await this.db.execute(sql, [role.title, role.salary, role.department.id]);
    console.log("done adding role");
  };
}

module.exports = { RolesRepository };
