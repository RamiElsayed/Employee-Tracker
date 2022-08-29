DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  salary DECIMAL,
  departmentId INT,
  FOREIGN KEY (departmentId)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  managerId INT,
  FOREIGN KEY (managerId)
  REFERENCES employee(id)
  ON DELETE SET NULL,
  roleId INT,
  FOREIGN KEY (roleId)
  REFERENCES roles(id)
  ON DELETE SET NULL
);
