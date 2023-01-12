class NativeModelBuilder {
  constructor() {
    this.model = {
      defaultValue: this.#initialValueAndError(),
      empty: this.#initialValueAndError(),
      lowercase: this.#initialValueAndError(),
      length: this.#initialValueAndError(),
      maxlength: this.#initialValueAndError(),
      minlength: this.#initialValueAndError(),
      numeric: this.#initialValueAndError(),
      required: this.#initialValueAndError(),
      trim: this.#initialValueAndError(),
      type: this.#initialValueAndError(),
      unique: this.#initialValueAndError(),
      items: this.#initialValueAndError(),
    };
  }

  #updateProperty(key, value, error) {
    this.model[key].value = value;
    if (error) this.model[key].error = error;
  }

  #initialValueAndError() {
    return {
      value: undefined,
      error: {
        description: "",
        errorKey: "",
        message: "",
        reason: "",
        statusCode: "",
      },
    };
  }

  build() {
    return Object.entries(this.model).reduce(
      (prevValue, [key, prop]) => {
        if (prop.value) prevValue[key] = prop;
        return prevValue;
      },
      // eslint-disable-next-line no-empty-pattern
      ({} = this.model)
    );
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
  items(value) {
    this.#updateProperty("length", value);
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
