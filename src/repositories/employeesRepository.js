const { Employee } = require("../models/employee");

class EmployeesRepository {
  constructor(db) {
    thisdb = db;
  };

  getEmployees = async () => {
    const sql = "SELECT employee.id, employee.first_name, employee.last_name, employee.title"
  }
}
