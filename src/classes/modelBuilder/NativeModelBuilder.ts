import { customTypeof } from "custom-typeof";

import { NativeModel, NativeModelError, NativeModelItem } from "@/types";

class NativeModelBuilder {
  model: NativeModel;

  private updateProperty<T>(
    key: keyof NativeModel,
    value: T,
    error?: NativeModelError
  ) {
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
  maxlength(value: NativeModel["maxlength"]["value"], error: NativeModelError) {
    this.updateProperty<NativeModel["maxlength"]["value"]>(
      "maxlength",
      value,
      error
    );
    return this;
  }
  minlength(value: NativeModel["minlength"]["value"], error: NativeModelError) {
    this.updateProperty<NativeModel["minlength"]["value"]>(
      "minlength",
      value,
      error
    );
    return this;
  }
  numeric(value: NativeModel["numeric"]["value"], error: NativeModelError) {
    this.updateProperty<NativeModel["numeric"]["value"]>(
      "numeric",
      value,
      error
    );
    return this;
  }
  type(value: NativeModel["type"]["value"], error: NativeModelError) {
    this.updateProperty<NativeModel["type"]["value"]>("type", value, error);
    return this;
  }
  empty(value: NativeModel["empty"]["value"], error: NativeModelError) {
    this.updateProperty<NativeModel["empty"]["value"]>("empty", value, error);
    return this;
  }
  required(value: NativeModel["required"]["value"], error: NativeModelError) {
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
  unique(value: NativeModel["unique"]["value"], error: NativeModelError) {
    this.updateProperty<NativeModel["unique"]["value"]>("unique", value, error);
    return this;
  }
  // lowercase(value: NativeModel["lowercase"]["value"], error) {
  //   this.#updateProperty<NativeModel["maxlength"]["value"]>("lowercase", value, error);//
  //   return this;
  // }
  length(value: NativeModel["length"]["value"], error: NativeModelError) {
    this.updateProperty<NativeModel["length"]["value"]>("length", value, error);
    return this;
  }

  build() {
    Object.entries(this.model).forEach((item) => {
      const key = item[0] as keyof NativeModel;
      const prop = item[1] as NativeModelItem;

      if (customTypeof.isUndefined(prop.error?.reason, prop.error?.statusCode))
        delete this.model[key].error;
      if (customTypeof.isUndefined(prop.value)) delete this.model[key];
    });

    return this.model as Partial<NativeModel>;
  }
}

const nativeModelBuilder = { create: () => new NativeModelBuilder() };

export { nativeModelBuilder, NativeModelBuilder };
