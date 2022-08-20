const inquirer = require("inquirer");
const { Department } = require("./src/models/department");
const { DepartmentRepository } = require("./src/repositories/departmentRepository");
const mysql = require("mysql2/promise");

const init = async () => {
  const db = await mysql.createConnection(
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
    choices: ["View departments", "Add a department"]
  };
  const newDepartment = { 
    type: "input",
    name: "name",
    message: "Please enter new department name ?"
  };

  const promptMenu = async () => {
    return await inquirer.prompt(menu).then(async (data) => {
      if (data.choice === menu.choices[0]) {
        await viewDepartments();
      }
      else if (data.choice === menu.choices[1]) {
        return inquirer.prompt(newDepartment).then(async (data) => { 
          const department = new Department(null, data.name);
          await departmentRepository.addDepartment(department); 
          console.log("Department added")
        });
      }
    });
  }

  const viewDepartments = async () => {
    console.log("id  name");
    console.log("--  ------");
    const departments = await departmentRepository.getDepartments();
    for (let department of departments) {
      console.log(`${department.id}  ${department.name}`);
    }
  }

  await promptMenu();
};

init();