const { describe, expect, it } = require("@jest/globals");
const { Employee } = require("../../src/models/employee");
const { EmployeesRepository } = require("../../src/repositories/employeesRepository");

describe("EmployeesRepository", () => {
    it("getEmployees", async () => {
        const expectedEmployees = [
            {id: 2, first_name: "Rami", last_name: "Badr", title: "Web Developer", department: "Development", salary: 35000, manager: "Ben"},
            {id: 3, first_name: "John", last_name: "Smith", title: "Web Developer", department: "Development", salary: 35000, manager: "Ben"},
        ];

        const executeMock= jest.fn();
        const DbMock = jest.fn();

        executeMock.mockImplementation(() => Promise.resolve([expectedEmployees]));
        DbMock.mockImplementation(() => {
            return {
                execute: executeMock,
            };
        });

        const dbMock = new DbMock();

        const employeesRepository = new EmployeesRepository(dbMock);
        const employees = await employeesRepository.getEmployees();

        expect(executeMock).toHaveBeenCalledTimes(1);
        expect(executeMock).toBeCalledWith(`SELECT employee.id, employee.first_name, employee.last_name, roles.title AS title, department.name AS department, roles.salary, employee.manager from employee, roles, department WHERE employee.role = roles.id and roles.department = department.id`);
        expect(employees).toEqual(expectedEmployees);
    })
})