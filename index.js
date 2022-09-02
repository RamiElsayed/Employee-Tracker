const inquirer = require("inquirer");
const { Department } = require("./src/models/department");
const { printTable } = require("console-table-printer");
require("dotenv").config();
const {
  DepartmentRepository,
} = require("./src/repositories/departmentRepository");
const { RolesRepository } = require("./src/repositories/rolesrepository");
const {
  EmployeesRepository,
} = require("./src/repositories/employeesRepository");
const mysql = require("mysql2/promise");
const { Role } = require("./src/models/roles");
const { Employee } = require("./src/models/employee");

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
  const employeesRepository = new EmployeesRepository(db);

  const menu = {
    type: "list",
    name: "choice",
    message: "What do you need to do?",
    choices: [
      "View Departments",
      "Add a Department",
      "View Roles",
      "Add Role",
      "View Employees",
      "Add New Employee",
    ],
  };
  const newDepartment = {
    type: "input",
    name: "name",
    message: "Please enter new department name ?",
  };

  const getNewRoleQuestions = (departments) => [
    {
      type: "input",
      name: "title",
      message: "What's the role title ?",
    },
    {
      type: "input",
      name: "salary",
      message: "What's the salary ?",
    },
    {
      type: "list",
      name: "department",
      choices: departments,
    },
  ];
  const getNewEmployeeQuestions = (roleTitles, employees) => [
    {
      type: "input",
      name: "firstName",
      message: "What's the employee's first name ?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What's the employee's last name ?",
    },
    {
      type: "list",
      name: "role",
      message: "What's the employee's role ?",
      choices: roleTitles,
    },
    {
      type: "list",
      name: "manager",
      message: "Who's the employee's manager ?",
      choices: employees,
    },
  ];
  const promptMenu = async () => {
    return await inquirer.prompt(menu).then(async (data) => {
      if (data.choice === menu.choices[0]) {
        await viewDepartments();
      } else if (data.choice === menu.choices[1]) {
        await addDepartmentPrompt();
      } else if (data.choice === menu.choices[2]) {
        await viewRoles();
      } else if (data.choice === menu.choices[3]) {
        await addRole();
      } else if (data.choice === menu.choices[4]) {
        await viewEmployees();
      } else if (data.choice === menu.choices[5]) {
        await addEmployee();
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
  const addRole = async () => {
    const departments = await departmentRepository.getDepartments();
    const newRoleQuestions = getNewRoleQuestions(departments);
    inquirer.prompt(newRoleQuestions).then(async (data) => {
      try {
        const department = departments.find((x) => x.name == data.department);
        const role = new Role(null, data.title, data.salary, department);
        await rolesRepository.addRole(role);
      } catch (error) {
        console.error(error.message);
        return addRole();
      }
    });
  };
  const addEmployee = async () => {
    const roles = await rolesRepository.getRoles();
    const roleTitles = roles.map((x) => x.title);
    const employees = await employeesRepository.getEmployees();

    const newEmployeeQuestions = getNewEmployeeQuestions(roleTitles, employees);
    inquirer.prompt(newEmployeeQuestions).then(async (data) => {
      try {
        const role = roles.find((x) => x.title == data.role);
        const manager = employees.find(
          (x) => data.manager == `${x.firstName} ${x.lastName}`
        );
        console.log(manager);
        const employee = new Employee(
          null,
          data.firstName,
          data.lastName,
          role,
          manager
        );
        await employeesRepository.addEmployee(employee);
      } catch (error) {
        console.error(error.message);
        return addEmployee();
      }
    });
  };
  const viewDepartments = async () => {
    const departments = await departmentRepository.getDepartments();
    printTable(departments);
  };
  const viewRoles = async () => {
    const roles = await rolesRepository.getRoles();
    roles.forEach((x) => (x.department = x.department.name));
    printTable(roles);
  };
  const viewEmployees = async () => {
    const dashboard = await employeesRepository.getEmployeeDashboard();
    dashboard.display();
  };
  await promptMenu();
};

init();
