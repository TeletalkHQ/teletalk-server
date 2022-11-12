const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");
const { trier } = require("utility-store/src/classes/Trier");
const Validator = require("fastest-validator");

const { errorThrower } = require("@/functions/utilities/utilities");

const { errors } = require("@/variables/errors");

const fastestValidatorCompiler = new Validator();

const tryCompileValidator = (validationModel) => {
  return fastestValidatorCompiler.compile(validationModel);
};

class ValidationModelBuilder {
  constructor() {
    this.validationModelObject = {
      empty: undefined,
      max: undefined,
      min: undefined,
      numeric: undefined,
      optional: undefined,
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
    errorThrower(
      customTypeof.isNotObject(validationModel),
      errors.VALIDATION_MODEL_IS_NOT_OBJECT
    );

    return trier(this.validatorCompiler)
      .try(tryCompileValidator, validationModel)
      .printAndThrow()
      .result();
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

  build() {
    return objectUtilities.objectClarify(this.validationModelObject);
  }
}

const validationModelBuilder = { create: () => new ValidationModelBuilder() };

module.exports = {
  validationModelBuilder,
  ValidationModelBuilder,
};
