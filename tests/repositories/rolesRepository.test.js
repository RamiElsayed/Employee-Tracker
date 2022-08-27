const { describe, expect, it } = require("@jest/globals");
const { Role } = require("../../src/models/roles");
const { RolesRepository } = require("../../src/repositories/rolesRepository");

describe("RolesRepository", () => {
  it("getRoles", async () => {
    const expectedRoles = [
      { id: 1, title: "Accountant", salary: 80000, department_id: 2 },
      { id: 1, title: "Engineer", salary: 90000, department_id: 3 },
    ];

    const executeMock = jest.fn();
    const DbMock = jest.fn();

    executeMock.mockImplementation(() => Promise.resolve([expectedRoles]));
    DbMock.mockImplementation(() => {
      return {
        execute: executeMock,
      };
    });

    const dbMock = new DbMock();

    const rolesRepository = new RolesRepository(dbMock);
    const roles = await rolesRepository.getRoles();

    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(executeMock).toBeCalledWith(
      "SELECT roles.id, roles.title, roles.salary, department.name AS department FROM roles JOIN department ON roles.department = department.id"
    );
    expect(roles).toEqual(expectedRoles);
  });

  it("addRoles", async () => {
    const role = new Role(null, "Accountant", 90000, 4);

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
      [role.title, role.salary, role.department_id]
    );
  });

  it("addRole with anonymous object should throw", async () => {
    const role = {
      id: 2,
      title: "Accountant",
      salary: 80000,
      department_id: 2,
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

  it("addRole with anonymous object should throw", async () => {

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
