const { Department } = require("../models/department");

class DepartmentRepository {
  constructor(db) {
    this.db = db;
  }
  getDepartments = () => {
    const sql = "SELECT department.id, department.name FROM department";
    this.db.query(sql, (err, result) => {
      if (err) {
        return;
      }
      // return result.map((x) => new Department(x.id, x.name));
      for (let index = 0; index < result.length; index++) {
        console.log(`${result[index].id}  ${result[index].name}`)
      }
    });
  };
  addDepartment = () => {};
}
module.exports = { DepartmentRepository }

