const { Department } = require("../models/department");

class DepartmentRepository {
  constructor(db) {
    this.db = db;
  }

  getDepartments = async () => {
    const sql = "SELECT * FROM department";
    let [rows] = await this.db.execute(sql);
    return rows.map((x) => new Department(x.id, x.name));
  };
  

  addDepartment = async (department) => {
    if (!department instanceof Department) throw Error("Must be a Department");
    const sql = `INSERT INTO department (name) VALUES(?)`;
    await this.db.execute(sql, [department.name]);
  };
}

module.exports = { DepartmentRepository };
