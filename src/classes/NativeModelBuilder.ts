const { customTypeof } = require("custom-typeof");

class NativeModelBuilder {
  constructor() {
    this.model = {
      defaultValue: this.#initialValue(),
      empty: this.#initialValue(),
      items: this.#initialValue(),
      length: this.#initialValue(),
      // lowercase: this.#initialValueAndError(),
      maxlength: this.#initialValue(),
      minlength: this.#initialValue(),
      numeric: this.#initialValue(),
      required: this.#initialValue(),
      trim: { value: undefined },
      type: this.#initialValue(),
      unique: this.#initialValue(),
    };
  }

  #updateProperty(key, value, error) {
    this.model[key].value = value;
    if (error) this.model[key].error = error;
  }

  #initialValue() {
    return {
      value: undefined,
      error: {
        description: "",
        errorKey: "",
        message: "",
        reason: undefined,
        statusCode: undefined,
      },
    };
  }

  defaultValue(value) {
    this.#updateProperty("defaultValue", value);
    return this;
  }
  maxlength(value, error) {
    this.#updateProperty("maxlength", value, error);
    return this;
  }
  minlength(value, error) {
    this.#updateProperty("minlength", value, error);
    return this;
  }
  numeric(value, error) {
    this.#updateProperty("numeric", value, error);
    return this;
  }
  type(value, error) {
    this.#updateProperty("type", value, error);
    return this;
  }
  empty(value, error) {
    this.#updateProperty("empty", value, error);
    return this;
  }
  required(value, error = {}) {
    this.#updateProperty("required", value, error);
    return this;
  }
  trim(value) {
    this.model.trim = { value };
    return this;
  }
  unique(value, error) {
    this.#updateProperty("unique", value, error);
    return this;
  }
  // lowercase(value, error) {
  //   this.#updateProperty("lowercase", value, error);
  //   return this;
  // }
  length(value, error) {
    this.#updateProperty("length", value, error);
    return this;
  }

  build() {
    Object.entries(this.model).forEach(([key, prop]) => {
      if (customTypeof.isUndefined(prop.error?.reason, prop.error?.statusCode))
        delete this.model[key].error;
      if (customTypeof.isUndefined(prop.value)) delete this.model[key];
    });

    return this.model;
  }
}

const nativeModelBuilder = { create: () => new NativeModelBuilder() };

module.exports = { nativeModelBuilder, NativeModelBuilder };
