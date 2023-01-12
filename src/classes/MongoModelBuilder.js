class MongoModelBuilder {
  constructor() {
    this.model = {};

    this.mongoModel = {
      defaultValue: [],
      items: [],
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
    this.#setValue(name);
    this.#setMessage(name);
  }
  #updatePropertyWithoutMessage(name) {
    this.#setValue(name);
  }
  #setValue(key) {
    this.mongoModel[key].push(this.model[key].value);
  }
  #setMessage(key) {
    this.mongoModel[key].push(this.model[key].error?.reason);
  }

  build() {
    return Object.entries(this.mongoModel).reduce((prevValue, [key, value]) => {
      prevValue[key] = value.length > 1 ? value : value[0];
      return prevValue;
    }, {});
  }
  setModel(model) {
    this.model = model;
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
    this.mongoModel.items.push(items);
    return this;
  }
}

const mongoModelBuilder = { create: () => new MongoModelBuilder() };

module.exports = {
  mongoModelBuilder,
  MongoModelBuilder,
};
