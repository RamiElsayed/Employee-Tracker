class Department {
  constructor(id, name) {
    const regex = RegExp(/^[\s+]/gm);
    const invalidName = regex.test(name);
    if (name === '' || invalidName) {
      throw new Error("Please enter a dvalid name")
    }
    this.id = id;
    this.name = name;
  }

}

module.exports = { Department };
