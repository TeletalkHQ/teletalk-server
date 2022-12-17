const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
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
    this.queryResult = undefined;
    this.#setOptions(options);
  }

  #setOptions(options) {
    this.#options = options;
  }

  async call(data, projection, options = this.options) {
    //TODO: Check input fields here

    const queryResult = await this.serviceBody(data, projection, options);

    const fixedQueryResult = this.#fixResult(queryResult);
    //TODO: Check output fields here
    this.#setQueryResult(fixedQueryResult);

    return this;
  }

  #fixResult(queryResult) {
    // if (customTypeof.isArray(queryResult)) return queryResult;

    // if (queryResult instanceof mongoose.Document) {
    //   return queryResult.toObject();
    // } else return queryResult;
    if (customTypeof.isObjectNative(queryResult))
      return JSON.parse(JSON.stringify(queryResult));

    return queryResult;
  }

  #setQueryResult(queryResult) {
    this.queryResult = queryResult;
  }

  exclude(extraExcludeProps = []) {
    const excludeProps = [...this.#defaultExcludeProps, ...extraExcludeProps];

    const excluder = this.#getExcluder();
    const filteredResult = excluder.call(this, excludeProps);

    this.#setQueryResult(filteredResult);
    return this;
  }
  #getExcluder() {
    const isQueryResultArray = customTypeof.isArray(this.queryResult);
    return isQueryResultArray
      ? this.#excludeArrayResult
      : this.#excludeObjectResult;
  }

  #excludeObjectResult(excludeProps) {
    return objectUtilities.excludeProps(this.queryResult, excludeProps);
  }
  #excludeArrayResult(excludeProps) {
    return this.queryResult.map((qr) =>
      objectUtilities.excludeProps(qr, excludeProps)
    );
  }

  result() {
    return this.queryResult;
  }
}

const serviceHandler = {
  create: (serviceBody, projection, options) =>
    new ServiceHandler(serviceBody, projection, options),
};

module.exports = { serviceHandler, ServiceHandler };
