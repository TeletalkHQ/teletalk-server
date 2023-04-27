import { NativeModel } from "@/types";

class NativeModelBuilder {
  model: NativeModel;

  constructor() {
    //@ts-ignore
    this.model = {};
  }

  private updateProperty<T extends keyof NativeModel>(
    prop: T,
    value: NativeModel[T]
  ) {
    this.model[prop] = value;
  }

  defaultValue(value: NativeModel["defaultValue"]) {
    this.updateProperty("defaultValue", value);
    return this;
  }
  maxLength(value: NativeModel["maxLength"]) {
    this.updateProperty("maxLength", value);
    return this;
  }
  minLength(value: NativeModel["minLength"]) {
    this.updateProperty("minLength", value);
    return this;
  }
  numeric(value: NativeModel["numeric"]) {
    this.updateProperty("numeric", value);
    return this;
  }
  type(value: NativeModel["type"]) {
    this.updateProperty("type", value);
    return this;
  }
  empty(value: NativeModel["empty"]) {
    this.updateProperty("empty", value);
    return this;
  }
  required(value: NativeModel["required"]) {
    this.updateProperty("required", value);
    return this;
  }
  trim(value: NativeModel["trim"]) {
    this.model.trim = value;
    return this;
  }
  unique(value: NativeModel["unique"]) {
    this.updateProperty("unique", value);
    return this;
  }
  length(value: NativeModel["length"]) {
    this.updateProperty("length", value);
    return this;
  }

  build() {
    return this.model;
  }
}

const nativeModelBuilder = { create: () => new NativeModelBuilder() };

export { nativeModelBuilder };
