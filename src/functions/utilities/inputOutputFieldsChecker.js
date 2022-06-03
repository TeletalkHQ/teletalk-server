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
  customTypeof,
} = require("@/functions/utilities/utils");

//CLEANME //!checkInputFields
const checkInputFields = (input, fields, fieldsIndex = 0) => {
  const selectedFields = fields[fieldsIndex];
  let result = { done: true, internalError: false, errorObject: {} };
  const fn = (internalError = false, errorObject = {}) => {
    result.done = false;
    result.internalError = internalError;
    result.errorObject = errorObject;
  };

  if (customTypeof(selectedFields).type.undefined) {
    fn(true);
    return result;
  }

  const checkFields = (input, fields) => {
    const inputLength = getObjectLength(input);
    const fieldsLength = getObjectLength(fields);

    if (inputLength !== fieldsLength) {
      if (inputLength < fieldsLength) {
        fn(false, INPUT_FIELDS_MISSING);
        return result;
      } else {
        fn(false, INPUT_FIELDS_OVERLOAD);
        return result;
      }
    }

    for (const key in fields) {
      if (customTypeof(input[key]).type.undefined) {
        fn(false, INPUT_FIELDS_MISSING);
        break;
      }

      if (customTypeof(fields[key]).type.object) {
        if (!customTypeof(input[key]).type.object) {
          fn(false, INPUT_FIELDS_MISSING);
          break;
        }

        result = checkFields(input[key], fields[key]);
      }

      if (customTypeof(fields[key]).type.array) {
        if (!customTypeof(input[key]).type.array) {
          fn(false, INPUT_FIELDS_MISSING);
          break;
        }

        // eslint-disable-next-line no-loop-func
        input[key].forEach((item) => {
          result = checkFields(item, fields[key][0]);
        });
      }
    }

    return result;
  };

  checkFields(input, selectedFields);

  return result;
};

//CLEANME //!checkOutputFields
const checkOutputFields = (output, fields, fieldsIndex = 0) => {
  const selectedFields = fields[fieldsIndex];
  let result = { done: true, internalError: false, errorObject: {} };
  const fn = (internalError = false, errorObject = {}) => {
    result.done = false;
    result.internalError = internalError;
    result.errorObject = errorObject;

    return result;
  };

  if (customTypeof(selectedFields).type.undefined) {
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
      if (customTypeof(output[key]).type.undefined) {
        fn(OUTPUT_FIELDS_MISSING);
        break;
      }

      if (customTypeof(fields[key]).type.object) {
        if (!customTypeof(output[key]).type.object) {
          fn(OUTPUT_FIELDS_MISSING);
          break;
        }

        result = checkFields(output[key], fields[key]);
      }

      if (customTypeof(fields[key]).type.array) {
        if (!customTypeof(output[key]).type.array) {
          fn(false, OUTPUT_FIELDS_MISSING);
          break;
        }

        // eslint-disable-next-line no-loop-func
        output[key].forEach((item) => {
          result = checkFields(item, fields[key][0]);
        });
      }
    }

    return result;
  };

  checkFields(output, selectedFields);

  return result;
};

module.exports = { checkInputFields, checkOutputFields };
