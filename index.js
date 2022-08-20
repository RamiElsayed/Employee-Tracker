const inquirer = require("inquirer");
const { Department } = require("./src/models/department");
const 
  { DepartmentRepository }
 = require("./src/repositories/departmentRepository");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Romeoromeo.5264",
    database: "employee_tracker",
  },
  console.log(`Connected to the employee_tracker database.`)
);

const departmentRepository = new DepartmentRepository(db);

const menu = { 
  type: "list",
  name: "choice",
  message: "What do you need to do?",
  choices: ["View departments", "Add a department"],
};

const promptMenu = () => {
  return inquirer.prompt(menu).then((data) => {
    if (data.choice == menu.choices[0]) {
      const departments = departmentRepository.getDepartments();
      
      console.log("id  name");
      console.log("--  ------");
    }
  });
};

promptMenu();
