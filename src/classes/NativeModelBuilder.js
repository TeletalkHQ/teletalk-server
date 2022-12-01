const { customTypeof } = require("utility-store/src/classes/CustomTypeof");

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
      version: this.#initialValueAndError("", {}),
    };
  }

  #addProperty(key, value = null, error) {
    this.modelObject[key].value = value;
    if (error) this.modelObject[key].error = error;
  }

  #initialValueAndError() {
    return {
      value: null,
      error: {
        code: 0,
        errorKey: "",
        message: "",
        reason: "",
        version: "",
      },
    };
  }

  build() {
    for (const key in this.modelObject) {
      if (key === "version") continue;

      const { value } = this.modelObject[key];
      const valueType = customTypeof.check(value).type;
      if (valueType.isNull || valueType.isUndefined) {
        delete this.modelObject[key];
      }
    }

    return this.modelObject;
  }
  maxlength(value, error) {
    this.#addProperty("maxlength", value, error);
    return this;
  }
  minlength(value, error) {
    this.#addProperty("minlength", value, error);
    return this;
  }
  numeric(value, error) {
    this.#addProperty("numeric", value, error);
    return this;
  }
  type(value, error) {
    this.#addProperty("type", value, error);
    return this;
  }
  empty(value, error) {
    this.#addProperty("empty", value, error);
    return this;
  }
  version(value) {
    this.modelObject.version = value;
    return this;
  }
  required(value, error = {}) {
    this.#addProperty("required", value, error);
    return this;
  }
  trim(value, error) {
    this.#addProperty("trim", value, error);
    return this;
  }
  unique(value, error) {
    this.#addProperty("unique", value, error);
    return this;
  }
  defaultValue(value, error) {
    this.#addProperty("defaultValue", value, error);
    return this;
  }
  lowercase(value, error) {
    this.#addProperty("lowercase", value, error);
    return this;
  }
  length(value, error) {
    this.#addProperty("length", value, error);
    return this;
  }
}

const nativeModelBuilder = { create: () => new NativeModelBuilder() };

module.exports = { nativeModelBuilder, NativeModelBuilder };
