const { default: mongoose } = require("mongoose");
const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");

// const { errors } = require("@/variables/errors");

//CLEANME: Add to statics
// const inputErrors = {
//   ioDataFieldTypeWrongError: errors.INPUT_FIELD_TYPE_WRONG,
//   missingFieldsError: errors.INPUT_FIELDS_MISSING,
//   overloadFieldsError: errors.INPUT_FIELDS_OVERLOAD,
//   requiredFieldsNotDefinedError: errors.REQUIRED_FIELDS_NOT_DEFINED,
//   requiredFieldTypeWrongError: errors.REQUIRED_FIELD_TYPE_WRONG,
// };

// const outputErrors = {
//   ioDataFieldTypeWrongError: errors.OUTPUT_FIELD_TYPE_WRONG,
//   missingFieldsError: errors.OUTPUT_FIELDS_MISSING,
//   overloadFieldsError: errors.OUTPUT_FIELDS_OVERLOAD,
//   requiredFieldsNotDefinedError: errors.REQUIRED_FIELDS_NOT_DEFINED,
//   requiredFieldTypeWrongError: errors.REQUIRED_FIELD_TYPE_WRONG,
// };

class ServiceHandler {
  #defaultExcludeProps = ["_id", "__v"];
  #options = {
    inputFields: undefined,
    outputFields: undefined,
  };

  constructor(serviceBody, options) {
    this.serviceBody = serviceBody;
    this.result = undefined;
    this.#setOptions(options);
  }

  #setOptions(options) {
    this.#options = options;
  }

  async call(data, projection, options = this.options) {
    //TODO: Check input fields here

    const result = await this.serviceBody(data, projection, options);

    const fixedResult = this.#objectifyResult(result);
    //TODO: Check output fields here
    this.#setResult(fixedResult);

    return this;
  }

  #objectifyResult(result) {
    if (result instanceof mongoose.Document) return result.toObject();
    else return result;
  }

  #setResult(result) {
    this.result = result;
  }

  exclude(extraExcludeProps = []) {
    const excludeProps = [...this.#defaultExcludeProps, ...extraExcludeProps];
    const filteredResult = objectUtilities.excludeProps(
      this.result,
      excludeProps
    );
    this.#setResult(filteredResult);
    return this;
  }

  result() {
    return this.result;
  }
}

const serviceHandler = {
  create: (serviceBody, projection, options) =>
    new ServiceHandler(serviceBody, projection, options),
};

module.exports = { serviceHandler, ServiceHandler };
