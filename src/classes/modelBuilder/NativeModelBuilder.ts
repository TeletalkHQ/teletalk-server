import { NativeModel, NativeModelError } from "@/types";

type ModelError = NativeModelError;

class NativeModelBuilder {
  model: NativeModel;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    this.model = {};
  }

  private updateProperty<T>(
    key: keyof NativeModel,
    value: T,
    error?: ModelError
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
  maxlength(value: NativeModel["maxlength"]["value"], error: ModelError) {
    this.updateProperty<NativeModel["maxlength"]["value"]>(
      "maxlength",
      value,
      error
    );
    return this;
  }
  minlength(value: NativeModel["minlength"]["value"], error?: ModelError) {
    this.updateProperty<NativeModel["minlength"]["value"]>(
      "minlength",
      value,
      error
    );
    return this;
  }
  numeric(value: NativeModel["numeric"]["value"], error: ModelError) {
    this.updateProperty<NativeModel["numeric"]["value"]>(
      "numeric",
      value,
      error
    );
    return this;
  }
  type(value: NativeModel["type"]["value"], error: ModelError) {
    this.updateProperty<NativeModel["type"]["value"]>("type", value, error);
    return this;
  }
  empty(value: NativeModel["empty"]["value"], error?: ModelError) {
    this.updateProperty<NativeModel["empty"]["value"]>("empty", value, error);
    return this;
  }
  required(value: NativeModel["required"]["value"], error: ModelError) {
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
  unique(value: NativeModel["unique"]["value"], error: ModelError) {
    this.updateProperty<NativeModel["unique"]["value"]>("unique", value, error);
    return this;
  }
  // lowercase(value: NativeModel["lowercase"]["value"], error) {
  //   this.#updateProperty<NativeModel["maxlength"]["value"]>("lowercase", value, error);//
  //   return this;
  // }
  length(value: NativeModel["length"]["value"], error: ModelError) {
    this.updateProperty<NativeModel["length"]["value"]>("length", value, error);
    return this;
  }

  build() {
    return this.model;
  }
}

const nativeModelBuilder = { create: () => new NativeModelBuilder() };

export { nativeModelBuilder, NativeModelBuilder };
