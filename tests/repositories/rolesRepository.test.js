const { describe, expect, it } = require("@jest/globals");
const { Department } = require("../../src/models/department");
const { Role } = require("../../src/models/roles");
const { RolesRepository } = require("../../src/repositories/rolesRepository");

describe("RolesRepository", () => {
  const department = new Department(1, "Finance");

  it("getRoles", async () => {
    const roleData = [
      { roleId: 1, roleTitle: "Accountant", roleSalary: 80000, departmentId: 2, departmentName: "Finance" },
      { roleId: 2, roleTitle: "Engineer", roleSalary: 90000, departmentId: 3, departmentName: "Manufacturing" },
    ];
    
    const expectedRoles = [
      new Role(1, "Accountant", 80000, new Department(2, "Finance")),
      new Role(2, "Engineer", 90000, new Department(3, "Manufacturing"))
    ]

    const executeMock = jest.fn();
    const DbMock = jest.fn();

    executeMock.mockImplementation(() => Promise.resolve([roleData]));
    DbMock.mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    const dbMock = new DbMock();

    const rolesRepository = new RolesRepository(dbMock);
    const roles = await rolesRepository.getRoles();

    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(executeMock).toBeCalledWith(`
    SELECT
      roles.id roleId,
      roles.title roleTitle,
      roles.salary roleSalary,
      department.id departmentId,
      department.name departmentName
    FROM roles
    JOIN department ON roles.department = department.id`
    );
    expect(roles).toEqual(expectedRoles);
  });

  it("addRoles", async () => {
    const role = new Role(null, "Accountant", 90000, department);

    const executeMock = jest.fn();
    const DbMock = jest.fn();

    executeMock.mockImplementation();
    DbMock.mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    const dbMock = new DbMock();

    const rolesRepository = new RolesRepository(dbMock);
    await rolesRepository.addRole(role);

    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(executeMock).toHaveBeenCalledWith(
      "INSERT INTO roles (title,salary,department) VALUES (?,?,?)",
      [role.title, role.salary, role.department.id]
    );
  });

  it("addRole with anonymous object should throw", async () => {
    const role = {
      id: 2,
      title: "Accountant",
      salary: 80000,
      department,
    };

    const executeMock = jest.fn();
    const DbMock = jest.fn();

    executeMock.mockImplementation();
    DbMock.mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    const dbMock = new DbMock();

    const rolesRepository = new RolesRepository(dbMock);

    await expect(rolesRepository.addRole(role)).rejects.toThrow(
      "Must be a Role"
    );
  });

  it("addRole with null should throw", async () => {

    const executeMock = jest.fn();
    const DbMock = jest.fn();

    executeMock.mockImplementation();
    DbMock.mockImplementation(() => {
      return {
        execute: executeMock,
      }
    });

    const dbMock = new DbMock();

    const rolesRepository = new RolesRepository(dbMock);

    await expect(rolesRepository.addRole(null)).rejects.toThrow("Must be a Role");
  })
});
