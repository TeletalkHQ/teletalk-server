class NativeModelBuilder {
  constructor() {
    this.modelObject = {
      defaultValue: this.#initialValueAndError("", {}),
      empty: this.#initialValueAndError(false, {}),
      lowercase: this.#initialValueAndError("", {}),
      length: this.#initialValueAndError("", {}),
      maxlength: this.#initialValueAndError(0, {}),
      minlength: this.#initialValueAndError(0, {}),
      numeric: this.#initialValueAndError(false, {}),
      required: this.#initialValueAndError(false, {}),
      trim: this.#initialValueAndError(false, {}),
      type: this.#initialValueAndError("", {}),
      unique: this.#initialValueAndError("", {}),
    };
  }

  #updateProperty(key, value, error) {
    this.modelObject[key].value = value;
    if (error) this.modelObject[key].error = error;
  }

  #initialValueAndError() {
    return {
      value: undefined,
      error: {
        code: 0,
        errorKey: "",
        message: "",
        reason: "",
      },
    };
  }

  build() {
    return Object.entries(this.modelObject).reduce((prevValue, [key, prop]) => {
      if (prop.value) prevValue[key] = prop;
      return prevValue;
      // eslint-disable-next-line no-empty-pattern
    }, ({} = this.modelObject));
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
  trim(value, error) {
    this.#updateProperty("trim", value, error);
    return this;
  }
  unique(value, error) {
    this.#updateProperty("unique", value, error);
    return this;
  }
  defaultValue(value, error) {
    this.#updateProperty("defaultValue", value, error);
    return this;
  }
  lowercase(value, error) {
    this.#updateProperty("lowercase", value, error);
    return this;
  }
  length(value, error) {
    this.#updateProperty("length", value, error);
    return this;
  }
}

const nativeModelBuilder = { create: () => new NativeModelBuilder() };

module.exports = { nativeModelBuilder, NativeModelBuilder };
