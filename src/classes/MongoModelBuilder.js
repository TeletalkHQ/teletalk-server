class MongoModelBuilder {
  constructor() {
    this.modelObject = {};

    this.mongoModel = {
      defaultValue: [],
      lowercase: [],
      maxlength: [],
      minlength: [],
      required: [false],
      trim: [],
      type: [],
      unique: [],
    };
  }

  #updateProperty(name) {
    this.#setProperty(name);
    this.#setMessage(name);
  }
  #updatePropertyWithoutMessage(name) {
    this.#setProperty(name);
  }
  #setProperty(key) {
    this.mongoModel[key].push(this.modelObject[key].value);
  }
  #setMessage(key) {
    this.mongoModel[key].push(this.modelObject[key].error?.reason);
  }

  build() {
    const finalMongoModel = {};
    for (const key in this.mongoModel) {
      const prop = this.mongoModel[key];
      finalMongoModel[key] = prop.length > 1 ? prop : prop[0];
    }

    return finalMongoModel;
  }
  setModelObject(modelObject) {
    this.modelObject = modelObject;
    return this;
  }

  defaultValue() {
    this.#updateProperty("defaultValue");
    return this;
  }
  lowercase() {
    this.#updateProperty("lowercase");
    return this;
  }
  maxlength() {
    this.#updateProperty("maxlength");
    return this;
  }
  minlength() {
    this.#updateProperty("minlength");
    return this;
  }
  required() {
    this.#updateProperty("required");
    return this;
  }
  trim() {
    this.#updatePropertyWithoutMessage("trim");
    return this;
  }
  type() {
    this.#updatePropertyWithoutMessage("type");
    return this;
  }
  unique() {
    this.#updateProperty("unique");
    return this;
  }
  items(items) {
    this.#updateProperty("items", items);
    return this;
  }
}

const mongoModelBuilder = { create: () => new MongoModelBuilder() };

module.exports = {
  mongoModelBuilder,
  MongoModelBuilder,
};
