const { describe, expect, it } = require("@jest/globals");
const { formatSql } = require("../../src/formatting");
const { Department } = require("../../src/models/department");
const { Employee } = require("../../src/models/employee");
const { Role } = require("../../src/models/roles");
const {
  EmployeesRepository,
} = require("../../src/repositories/employeesRepository");

describe("EmployeesRepository", () => {
  it("getEmployees", async () => {
    const employeeData = [
      {
        id: 2,
        firstName: "Rami",
        lastName: "Badr",
        roleId: 2,
        roleTitle: "Web Developer",
        roleSalary: 35000,
        departmentId: 2,
        departmentName: "Development",
      },
      {
        id: 3,
        firstName: "John",
        lastName: "Smith",
        roleId: 3,
        roleTitle: "Web Developer",
        roleSalary: 35000,
        departmentId: 1,
        departmentName: "Sales",
      },
    ];

    const expectedEmployees = employeeData.map((x) => {
      const department = new Department(x.departmentId, x.departmentName);
      const role = new Role(x.roleId, x.roleTitle, x.roleSalary, department);
      return new Employee(x.id, x.firstName, x.lastName, role);
    });

    const executeMock = jest.fn();
    const DbMock = jest.fn();

    executeMock.mockImplementation(() => Promise.resolve([employeeData]));
    DbMock.mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    const dbMock = new DbMock();

    const employeesRepository = new EmployeesRepository(dbMock);
    const employees = await employeesRepository.getEmployees();

    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(executeMock).toBeCalledWith(
      formatSql(`SELECT
        e.id id,
        e.firstName firstName,
        e.lastName lastName,
        r.id roleId,
        r.title roleTitle,
        r.salary roleSalary,
        d.id departmentId,
        d.name departmentName
      FROM employee e
      JOIN roles r ON e.roleId = r.id
      JOIN department d ON r.departmentId = d.id`)
    );
    expect(employees).toEqual(expectedEmployees);
  });
});
