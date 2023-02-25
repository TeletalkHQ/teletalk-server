class MongoModelBuilder {
  constructor() {
    this.model = {};

    this.mongoModel = {
      default: [],
      empty: [],
      items: [],
      lowercase: [],
      maxlength: [],
      minlength: [],
      required: [],
      trim: [],
      type: [],
      unique: [],
    };
  }

  #updateProperty(modelKey, mongoModelKey) {
    this.#setValue(modelKey, mongoModelKey);
    this.#setMessage(modelKey, mongoModelKey);
  }
  #updatePropertyWithoutMessage(modelKey, mongoModelKey) {
    this.#setValue(modelKey, mongoModelKey);
  }
  #setValue(modelKey, mongoModelKey) {
    this.mongoModel[mongoModelKey || modelKey].push(this.model[modelKey].value);
  }
  #setMessage(modelKey, mongoModelKey) {
    this.mongoModel[mongoModelKey || modelKey].push(
      this.model[modelKey].error?.reason
    );
  }

  setModel(model) {
    this.model = model;
    return this;
  }

  defaultValue() {
    this.#updatePropertyWithoutMessage("defaultValue", "default");
    return this;
  }
  empty() {
    this.#updatePropertyWithoutMessage("empty");
    return this;
  }
  // lowercase() {
  //   this.#updateProperty("lowercase");
  //   return this;
  // }
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

  build() {
    return Object.entries(this.mongoModel).reduce((prevValue, [key, value]) => {
      if (value.length) prevValue[key] = value.length > 1 ? value : value[0];
      return prevValue;
    }, {});
  }
}

const mongoModelBuilder = { create: () => new MongoModelBuilder() };

module.exports = {
  mongoModelBuilder,
  MongoModelBuilder,
};
