const { Role } = require("../models/roles");

class RolesRepository {
  constructor(db) {
    this.db = db;
  }

  getRoles = async () => {
    const sql =
      "SELECT roles.id, roles.title, roles.salary, department.name AS department  FROM roles JOIN department ON roles.department = department.id";
    let [rows] = await this.db.execute(sql);
    return rows.map(x => new Role(x.id, x.title, x.salary, x.department_id));
  };

  addRole = async (role) => {
    if (!(role instanceof Role)) throw Error("Must be a Role");
    const sql = `INSERT INTO roles (title,salary,department) VALUES (?,?,?)`;
    console.log('add role');
    await this.db.execute(sql,[role.title, role.salary, role.department_id]);
    console.log('done adding role');
  };
}

module.exports = { RolesRepository };
