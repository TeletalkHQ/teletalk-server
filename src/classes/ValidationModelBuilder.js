const Validator = require("fastest-validator");
const { customTypeof } = require("utility-store/src/classes/CustomTypeof");

const { errorThrower, objectClarify } = require("@/functions/utilities/utils");

const v = new Validator();

class ValidationModelBuilder {
  constructor() {
    this.validationModelObject = {
      empty: undefined,
      max: undefined,
      min: undefined,
      optional: undefined,
      trim: undefined,
      type: undefined,
      unique: undefined,
      numeric: undefined,
      required: undefined,
      messages: {
        required: undefined,
        string: undefined,
        stringEmpty: undefined,
        stringMax: undefined,
        stringMin: undefined,
        stringNumeric: undefined,
      },
    };
    this.modelObject = {};
  }

  #addProperty(validationKey, modelKey, messageKey) {
    this.#setValue(validationKey, modelKey);
    this.#setMessage(modelKey, messageKey);
  }
  #addPropertyWithoutMessage(validationKey, modelKey) {
    this.#setValue(validationKey, modelKey);
  }
  #setValue(validationKey, modelKey) {
    this.validationModelObject[validationKey] =
      this.modelObject[modelKey].value;
  }
  #setMessage(modelKey, messageKey) {
    this.validationModelObject.messages[messageKey] =
      this.modelObject[modelKey].error.message;
  }

  static validatorCompiler({ version, ...validationModel }) {
    try {
      errorThrower(
        !customTypeof.check(validationModel).type.isObject,
        "You must pass validationModel as a object"
      );

      return v.compile(validationModel);
    } catch (error) {
      logger.log("validatorCompiler catch, error:", error);
      errorThrower(error, error);
    }
  }

  build() {
    return objectClarify(this.validationModelObject);
  }
  setModelObject(modelObject) {
    this.modelObject = modelObject;
    return this;
  }
  empty() {
    this.#addProperty("empty", "empty", "stringEmpty");
    return this;
  }
  length() {
    this.#addProperty("length", "length", "length");
    return this;
  }
  max() {
    this.#addProperty("max", "maxlength", "stringMax");
    return this;
  }
  min() {
    this.#addProperty("min", "minlength", "stringMin");
    return this;
  }
  numeric() {
    this.#addProperty("numeric", "numeric", "stringNumeric");
    return this;
  }
  trim() {
    this.#addPropertyWithoutMessage("trim", "trim");
    return this;
  }
  type() {
    this.#addProperty("type", "type", "string");
    return this;
  }
  unique() {
    this.#addProperty("unique", "unique", "unique");
    return this;
  }
  required() {
    this.#addProperty("required", "required", "required");
    return this;
  }
  optional() {
    this.validationModelObject.optional = !this.modelObject.required.value;
    return this;
  }
  lowercase() {
    this.validationModelObject.lowercase = !this.modelObject.lowercase.value;
    return this;
  }
}

const validationModelBuilder = { create: () => new ValidationModelBuilder() };

module.exports = {
  validationModelBuilder,
  ValidationModelBuilder,
};
