const { printTable } = require("console-table-printer");

class EmployeeDashboard {
    constructor(items) {
        this.items = items;
    }

    display = () => {
        printTable(this.items);
    }
}

class EmployeeDashboardItem {
    constructor(id, firstName, lastName, title, department, salary, manager) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.department = department;
        this.salary = salary;
        this.manager = manager;
    }
}

module.exports = { EmployeeDashboard, EmployeeDashboardItem };