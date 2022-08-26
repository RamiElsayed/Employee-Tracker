class Department {
  constructor(id, name) {
    const regex = RegExp(/^[\s+]/gm);
    const invalidName = regex.test(name);
    if (typeof name !== "string" || !name.trim().length || invalidName) {
      throw new Error("please enter a department name");
    }
    this.id = id;
    this.name = name;
  }

}

module.exports = { Department };
