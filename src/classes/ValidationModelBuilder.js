const Validator = require("fastest-validator");
const { customTypeof } = require("custom-typeof");
const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");

const { errorThrower } = require("utility-store/src/utilities/utilities");

const { errors } = require("@/variables/errors");

const fastestValidatorCompiler = new Validator();

class ValidationModelBuilder {
  constructor() {
    this.validationModel = {
      empty: undefined,
      max: undefined,
      min: undefined,
      numeric: undefined,
      required: undefined,
      trim: undefined,
      type: undefined,
      unique: undefined,
      messages: {
        required: undefined,
        string: undefined,
        stringEmpty: undefined,
        stringMax: undefined,
        stringMin: undefined,
        stringNumeric: undefined,
      },
    };
    this.model = {};
  }

  #updateProperty(validationKey, modelKey, messageKey) {
    this.#setValue(validationKey, modelKey);
    this.#setMessage(modelKey, messageKey);
  }
  #addPropertyWithoutMessage(validationKey, modelKey) {
    this.#setValue(validationKey, modelKey);
  }
  #setValue(validationKey, modelKey) {
    this.validationModel[validationKey] = this.model[modelKey].value;
  }
  #setMessage(modelKey, messageKey) {
    this.validationModel.messages[messageKey] =
      this.model[modelKey].error.message;
  }

  static validatorCompiler(validationModel) {
    errorThrower(
      customTypeof.isNotObject(validationModel),
      errors.VALIDATION_MODEL_IS_NOT_OBJECT
    );

    return fastestValidatorCompiler.compile(validationModel);
  }

  setModel(model) {
    this.model = model;
    return this;
  }
  empty() {
    this.#updateProperty("empty", "empty", "stringEmpty");
    return this;
  }
  length() {
    this.#updateProperty("length", "length", "length");
    return this;
  }
  max() {
    this.#updateProperty("max", "maxlength", "stringMax");
    return this;
  }
  min() {
    this.#updateProperty("min", "minlength", "stringMin");
    return this;
  }
  numeric() {
    this.#updateProperty("numeric", "numeric", "stringNumeric");
    return this;
  }
  trim() {
    this.#addPropertyWithoutMessage("trim", "trim");
    return this;
  }
  type() {
    this.#updateProperty("type", "type", "string");
    return this;
  }
  unique() {
    this.#updateProperty("unique", "unique", "unique");
    return this;
  }
  required() {
    this.#updateProperty("required", "required", "required");
    return this;
  }

  build() {
    return objectUtilities.clarify(this.validationModel);
  }
}

const validationModelBuilder = { create: () => new ValidationModelBuilder() };

module.exports = {
  validationModelBuilder,
  ValidationModelBuilder,
};
