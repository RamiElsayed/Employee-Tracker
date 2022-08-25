class Roles {
  constructor(id, title, salary) {
    const regex = RegExp(/^[\s+]/gm);

    if (salary === "" || regex.test(salary)) {
      throw new Error("please enter a salary");
    }
    if (title === "" || regex.test(title)) {
      throw new Error("please enter a title");
    }
    if (salary === "" || regex.test(title) || salary <= 0 ) {
      throw new Error("please enter a valid salary amount");
    }
    this.id = id;
    this.title = role;
    this.salary = salary;
  }
}

module.exports = { Roles };
