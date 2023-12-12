import { NativeModel } from "~/types/model";

class NativeModelBuilder<T extends NativeModel> {
  model: T;

  constructor() {
    //@ts-ignore
    this.model = {};
  }

  private updateProperty<U extends keyof T>(prop: U, value: T[U]) {
    this.model[prop] = value;
  }

  defaultValue(value: T["defaultValue"]) {
    this.updateProperty("defaultValue", value);
    return this;
  }

  maxLength(value: T["maxLength"]) {
    this.updateProperty("maxLength", value);
    return this;
  }

  minLength(value: T["minLength"]) {
    this.updateProperty("minLength", value);
    return this;
  }

  numeric(value: T["numeric"]) {
    this.updateProperty("numeric", value);
    return this;
  }

  type(value: T["type"]) {
    this.updateProperty("type", value);
    return this;
  }

  empty(value: T["empty"]) {
    this.updateProperty("empty", value);
    return this;
  }

  required(value: T["required"]) {
    this.updateProperty("required", value);
    return this;
  }

  trim(value: T["trim"]) {
    this.model.trim = value;
    return this;
  }

  unique(value: T["unique"]) {
    this.updateProperty("unique", value);
    return this;
  }

  length(value: T["length"]) {
    this.updateProperty("length", value);
    return this;
  }

  build() {
    return this.model;
  }
}

const nativeModelBuilder = {
  create: <T extends NativeModel>() => new NativeModelBuilder<T>(),
};

export { nativeModelBuilder };
