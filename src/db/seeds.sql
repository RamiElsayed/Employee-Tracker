USE  employee_tracker

INSERT INTO department (name) 
VALUES  ("Management"),
        ("Accountancy"),
        ("Engineering");

INSERT INTO roles (title, salary, department) 
VALUES  ("Sales Manager",100000, 1),
        ("Accountant",80000, 2),
        ("Engineer", 90000, 3);
        