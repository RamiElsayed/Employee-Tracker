const { describe, expect, test, it } = require("@jest/globals");
const { Department } = require("../../src/models/department");
const {
  DepartmentRepository,
} = require("../../src/repositories/departmentRepository");

describe("DepartmentRepository", () => {
  it("getDepartments", async () => {
    const expectedDepartments = [
      { id: 1, name: "Finance" },
      { id: 2, name: "HR" },
    ];

    const executeMock = jest.fn();
    const DbMock = jest.fn();

    executeMock.mockImplementation(() =>
      Promise.resolve([expectedDepartments])
    );
    DbMock.mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    const dbMock = new DbMock();

    const departmentRepository = new DepartmentRepository(dbMock);
    const departments = await departmentRepository.getDepartments();

    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(executeMock).toBeCalledWith("SELECT * FROM department");
    expect(departments).toEqual(expectedDepartments);
  });

  it("addDepartment", async () => {
    const department = new Department(null, "Finance");

    const executeMock = jest.fn();
    const DbMock = jest.fn();

    executeMock.mockImplementation();
    DbMock.mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    const dbMock = new DbMock();

    const departmentRepository = new DepartmentRepository(dbMock);
    await departmentRepository.addDepartment(department);

    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(executeMock).toHaveBeenCalledWith(
      "INSERT INTO department (name) VALUES(?)",
      [department.name]
    );
  });
  it("addDepartment with anonymous object should throw", async () => {
    const department = { id: 1, name: "Accountancy" };

    const executeMock = jest.fn();
    const DbMock = jest.fn();

    executeMock.mockImplementation();
    DbMock.mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    const dbMock = new DbMock();

    const departmentRepository = new DepartmentRepository(dbMock);

    await expect(
      departmentRepository.addDepartment(department)
    ).rejects.toThrow("Must be a Department");
  });

  it("addeDepartment with null should throw", async () => {

    const executeMock = jest.fn();
    const DbMock = jest.fn();

    executeMock.mockImplementation();
    DbMock.mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    const dbMock = new DbMock();

    const departmentRepository = new DepartmentRepository(dbMock);

    await expect(
      departmentRepository.addDepartment(null)
    ).rejects.toThrow("Must be a Department");
  });
});
