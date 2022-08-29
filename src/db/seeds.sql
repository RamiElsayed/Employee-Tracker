USE  employee_tracker

INSERT INTO department (name) 
VALUES  ("Management"),
        ("Accountancy"),
        ("Engineering");

INSERT INTO roles (title, salary, departmentId) 
VALUES  ("Sales Manager",100000, 1),
        ("Accountant",80000, 2),
        ("Engineer", 90000, 3);

INSERT INTO employee (firstName, lastName, managerId, roleId)
VALUES ("John", "Smith", NULL, 1);

INSERT INTO employee (firstName, lastName, managerId, roleId)
VALUES ("Tom", "Smith", 1, 3);

INSERT INTO employee (firstName, lastName, managerId, roleId)
VALUES ("Rami", "Badr", 2, 2);