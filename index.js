const inquirer = require("inquirer");
const { Department } = require("./src/models/department");
const { printTable } = require('console-table-printer');
require('dotenv').config();
const {
  DepartmentRepository,
} = require("./src/repositories/departmentRepository");
const {
  RolesRepository,
} = require("./src/repositories/rolesrepository");
const mysql = require("mysql2/promise");

const init = async () => {
  const db = await mysql.createConnection(
    {
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the employee_tracker database.`)
  );

  const departmentRepository = new DepartmentRepository(db);
  const rolesRepository = new RolesRepository(db);

  const menu = {
    type: "list",
    name: "choice",
    message: "What do you need to do?",
    choices: ["View departments", "Add a department","View Roles"],
  };
  const newDepartment = {
    type: "input",
    name: "name",
    message: "Please enter new department name ?",
  };

  const promptMenu = async () => {
    return await inquirer.prompt(menu).then(async (data) => {
      if (data.choice === menu.choices[0]) {
        await viewDepartments();
      } else if (data.choice === menu.choices[1]) {
        await addDepartmentPrompt();
      }
      else if (data.choice === menu.choices[2]) {
        await viewRoles();
      }
    });
  };

  const addDepartmentPrompt = async () => {
    inquirer.prompt(newDepartment).then(async (data) => {
      try {
        const department = new Department(null, data.name);
        await departmentRepository.addDepartment(department);
        console.log("Department added");
      } catch (error) {
        console.error(error.message);
        return addDepartmentPrompt();
      }
    });
  };
  
  const viewDepartments = async () => {
    const departments = await departmentRepository.getDepartments();
    printTable(departments);
  };
  const viewRoles = async () => {
    const roles = await rolesRepository.getRoles();
    printTable(roles);
  };
  await promptMenu();
};

init();
