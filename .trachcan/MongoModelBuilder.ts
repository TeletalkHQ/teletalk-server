class MongoModelBuilder {
  model: NativeModel;
  mongoModel: Schema;

  private updateProperty(modelKey, mongoModelKey) {
    this.setValue(modelKey, mongoModelKey);
    this.setMessage(modelKey, mongoModelKey);
  }
  private updatePropertyWithoutMessage(modelKey, mongoModelKey) {
    this.setValue(modelKey, mongoModelKey);
  }
  private setValue(modelKey, mongoModelKey) {
    this.mongoModel[mongoModelKey || modelKey].push(this.model[modelKey].value);
  }
  private setMessage(modelKey, mongoModelKey) {
    this.mongoModel[mongoModelKey || modelKey].push(
      this.model[modelKey].error?.reason
    );
  }

  defaultValue() {
    this.updatePropertyWithoutMessage("defaultValue", "default");
    return this;
  }
  empty() {
    this.updatePropertyWithoutMessage("empty");
    return this;
  }
  // lowercase() {
  //   this.#updateProperty("lowercase");
  //   return this;
  // }
  maxlength() {
    this.updateProperty("maxlength");
    return this;
  }
  minlength() {
    this.updateProperty("minlength");
    return this;
  }
  required() {
    this.updateProperty("required");
    return this;
  }
  trim() {
    this.updatePropertyWithoutMessage("trim");
    return this;
  }
  type() {
    this.updatePropertyWithoutMessage("type");
    return this;
  }
  unique() {
    this.updateProperty("unique");
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

type MongoModelKey =
  | "default"
  | "empty"
  | "maxlength"
  | "minlength"
  | "required"
  | "trim"
  | "type"
  | "unique";

class MongoModelBuilder<T extends NativeModelKey> {
  private model: NativeModel;
  private mongoModel: {
    [prop: string]: [NativeModel[T]["value"], string];
    // | NativeModel[T]["value"];
  };

  constructor(model: NativeModel) {
    this.model = model;
    this.mongoModel = {};
  }

  private updateProperty(
    modelKey: NativeModelKey,
    mongoModelKey: MongoModelKey
  ) {
    this.setValue(modelKey, mongoModelKey);
    this.setMessage(modelKey, mongoModelKey);
  }

  private setValue(modelKey: NativeModelKey, mongoModelKey: MongoModelKey) {
    this.mongoModel[mongoModelKey].push(this.model[modelKey].value);
  }
  private setMessage(modelKey: NativeModelKey, mongoModelKey: MongoModelKey) {
    this.mongoModel[mongoModelKey].push(this.model[modelKey].error?.reason);
  }

  defaultValue() {
    this.setValue("defaultValue", "default");
    return this;
  }
  empty() {
    this.setValue("empty", "empty");
    return this;
  }
  // lowercase() {
  //   this.#updateProperty("lowercase");
  //   return this;
  // }
  maxlength() {
    this.updateProperty("maxlength", "maxlength");
    return this;
  }
  minlength() {
    this.updateProperty("minlength", "minlength");
    return this;
  }
  required() {
    this.updateProperty("required", "required");
    return this;
  }
  trim() {
    this.setValue("trim", "trim");
    return this;
  }
  type() {
    this.setValue("type", "type");
    return this;
  }
  unique() {
    this.updateProperty("unique", "unique");
    return this;
  }

  build() {
    return this.mongoModel;
  }
}

const mongoModelBuilder = { create: () => new MongoModelBuilder() };

export { mongoModelBuilder, MongoModelBuilder };
