const { Roles } = require("../models/roles");

class RolesRepository {
  constructor(db) {
    this.db = db;
  }

  getRoles = async () => {
    const sql =
      "SELECT roles.id, roles.title, roles.salary, department.name AS department  FROM roles JOIN department ON roles.department = department.id;";
    let [rows] = await this.db.execute(sql);
    return rows;
  };

  addRole = async (role) => {
    if (!role instanceof Roles) throw Error("Must be a Role");
    const sql = `INSERT INTO role (name) VALUES(?)`;
    await this.db.execute(sql, [role.title]);
  };
}

module.exports = { RolesRepository };
