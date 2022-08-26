class Roles {
  constructor(id, title, salary, department_id) {
    const regex = RegExp(/^[\s+]/gm);

    if (typeof title !== "string" || !title.trim().length|| regex.test(title)) {
      throw new Error("please enter a salary");
    };

    if (salary !== "number" || isNaN(salary) || regex.test(salary) || salary <= 0) {
      throw new Error("please enter a valid salary amount");
    };
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.department_id = department_id;
  }
}

module.exports = { Roles };
