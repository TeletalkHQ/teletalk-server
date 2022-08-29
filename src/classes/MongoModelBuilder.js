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

  #addProperty(name) {
    this.#setProperty(name);
    this.#setMessage(name);
  }
  #addPropertyWithoutMessage(name) {
    this.#setProperty(name);
  }
  #setProperty(key) {
    this.mongoModel[key].push(this.modelObject[key].value);
  }
  #setMessage(key) {
    this.mongoModel[key].push(this.modelObject[key].error?.message);
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
    this.#addProperty("defaultValue");
    return this;
  }
  lowercase() {
    this.#addProperty("lowercase");
    return this;
  }
  maxlength() {
    this.#addProperty("maxlength");
    return this;
  }
  minlength() {
    this.#addProperty("minlength");
    return this;
  }
  required() {
    this.#addProperty("required");
    return this;
  }
  trim() {
    this.#addPropertyWithoutMessage("trim");
    return this;
  }
  type() {
    this.#addPropertyWithoutMessage("type");
    return this;
  }
  unique() {
    this.#addProperty("unique");
    return this;
  }
}

const mongoModelBuilder = { create: () => new MongoModelBuilder() };

module.exports = {
  mongoModelBuilder,
  MongoModelBuilder,
};
