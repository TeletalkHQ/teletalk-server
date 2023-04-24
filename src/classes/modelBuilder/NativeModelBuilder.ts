import { NativeError, NativeModel } from "@/types";

class NativeModelBuilder {
  model: NativeModel;

  constructor() {
    //@ts-ignore
    this.model = {};
  }

  private updateProperty<T>(
    key: keyof NativeModel,
    value: T,
    error?: NativeError
  ) {
    this.model = {
      ...this.model,
      [key]: {},
    };

    this.model[key].value = value;
    if (error) this.model[key].error = error;
  }

  defaultValue(value: NativeModel["defaultValue"]["value"]) {
    this.updateProperty<NativeModel["defaultValue"]["value"]>(
      "defaultValue",
      value
    );
    return this;
  }
  maxLength(value: NativeModel["maxLength"]["value"], error: NativeError) {
    this.updateProperty<NativeModel["maxLength"]["value"]>(
      "maxLength",
      value,
      error
    );
    return this;
  }
  minLength(value: NativeModel["minLength"]["value"], error?: NativeError) {
    this.updateProperty<NativeModel["minLength"]["value"]>(
      "minLength",
      value,
      error
    );
    return this;
  }
  numeric(value: NativeModel["numeric"]["value"], error: NativeError) {
    this.updateProperty<NativeModel["numeric"]["value"]>(
      "numeric",
      value,
      error
    );
    return this;
  }
  type(value: NativeModel["type"]["value"], error: NativeError) {
    this.updateProperty<NativeModel["type"]["value"]>("type", value, error);
    return this;
  }
  empty(value: NativeModel["empty"]["value"], error?: NativeError) {
    this.updateProperty<NativeModel["empty"]["value"]>("empty", value, error);
    return this;
  }
  required(value: NativeModel["required"]["value"], error: NativeError) {
    this.updateProperty<NativeModel["required"]["value"]>(
      "required",
      value,
      error
    );
    return this;
  }
  trim(value: NativeModel["trim"]["value"]) {
    this.model.trim = { value };
    return this;
  }
  unique(value: NativeModel["unique"]["value"], error: NativeError) {
    this.updateProperty<NativeModel["unique"]["value"]>("unique", value, error);
    return this;
  }
  // lowercase(value: NativeModel["lowercase"]["value"], error) {
  //   this.#updateProperty<NativeModel["maxLength"]["value"]>("lowercase", value, error);//
  //   return this;
  // }
  length(value: NativeModel["length"]["value"], error: NativeError) {
    this.updateProperty<NativeModel["length"]["value"]>("length", value, error);
    return this;
  }

  build() {
    return this.model;
  }
}

const nativeModelBuilder = { create: () => new NativeModelBuilder() };

export { nativeModelBuilder };
