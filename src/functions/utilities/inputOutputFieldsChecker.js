const {
  appErrors: {
    INPUT_FIELDS_OVERLOAD,
    INPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_OVERLOAD,
  },
} = require("@/variables/errors/appErrors");
const {
  getObjectLength,
  getErrorObject,
} = require("@/functions/utilities/utils");

const checkInputFields = (input, fields, fieldsIndex = 0) => {
  const selectedFields = fields[fieldsIndex];
  let result = { done: true, internalError: false, errorObject: {} };
  const fn = (internalError = false, errorObject = {}) => {
    result.done = false;
    result.internalError = internalError;
    result.errorObject = errorObject;

    return result;
  };

  if (typeof selectedFields === "undefined") {
    return fn(true);
  }

  const checkFields = (input, fields) => {
    const inputLength = getObjectLength(input);
    const fieldsLength = getObjectLength(fields);

    if (inputLength !== fieldsLength) {
      if (inputLength < fieldsLength) {
        return fn(false, INPUT_FIELDS_MISSING);
      } else {
        return fn(false, INPUT_FIELDS_OVERLOAD);
      }
    }

    for (const key in fields) {
      if (typeof input[key] === "undefined") {
        fn();
        break;
      }

      if (typeof fields[key] === "object") {
        if (typeof input[key] !== "object") {
          fn();
          break;
        }

        result = checkFields(input[key], fields[key]);
      }
    }

    return result;
  };

  checkFields(input, selectedFields);

  return result;
};

const checkOutputFields = (output, fields, fieldsIndex = 0) => {
  const selectedFields = fields[fieldsIndex];
  let result = { done: true, internalError: false, errorObject: {} };
  const fn = (internalError = false, errorObject = {}) => {
    result.done = false;
    result.internalError = internalError;
    result.errorObject = errorObject;

    return result;
  };

  if (typeof selectedFields === "undefined") {
    return fn(true);
  }

  const checkFields = (output, fields) => {
    const outputLength = getObjectLength(output);
    const fieldsLength = getObjectLength(fields);

    if (outputLength !== fieldsLength) {
      if (outputLength < fieldsLength) {
        return fn(false, OUTPUT_FIELDS_MISSING);
      } else {
        return fn(false, OUTPUT_FIELDS_OVERLOAD);
      }
    }

    for (const key in fields) {
      if (typeof output[key] === "undefined") {
        fn();
        break;
      }

      if (typeof fields[key] === "object") {
        if (typeof output[key] !== "object") {
          fn();
          break;
        }

        result = checkFields(output[key], fields[key]);
      }
    }

    return result;
  };

  checkFields(output, selectedFields);

  return result;
};

module.exports = { checkInputFields, checkOutputFields };
