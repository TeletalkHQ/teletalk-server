const { customTypeof } = require("@/classes/CustomTypeof");

const { getObjectLength } = require("@/functions/utilities/utils");

const {
  appErrors: {
    INPUT_FIELDS_OVERLOAD,
    INPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_OVERLOAD,
  },
} = require("@/variables/errors/appErrors");

//REFACTOR //!checkInputFields
const checkInputFields = (input, fields, fieldsIndex = 0) => {
  const selectedFields = fields[fieldsIndex];
  let result = { done: true, externalError: false, errorObject: {} };

  // if (fields.length === 0) {
  //   return result;
  // }

  const fn = (externalError = false, errorObject = {}) => {
    result.done = false;
    result.externalError = externalError;
    result.errorObject = errorObject;
  };

  if (customTypeof.check(selectedFields).type.undefined) {
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
      if (customTypeof.check(input[key]).type.undefined) {
        fn(false, INPUT_FIELDS_MISSING);
        break;
      }

      if (customTypeof.check(fields[key]).type.object) {
        if (!customTypeof.check(input[key]).type.object) {
          fn(false, INPUT_FIELDS_MISSING);
          break;
        }

        result = checkFields(input[key], fields[key]);
      }

      if (customTypeof.check(fields[key]).type.array) {
        if (!customTypeof.check(input[key]).type.array) {
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

//REFACTOR //!checkOutputFields
const checkOutputFields = (output, fields, fieldsIndex = 0) => {
  try {
    const selectedFields = fields[fieldsIndex];

    // logger.log("selectedFields", selectedFields, "output", output);

    let result = { done: true, internalError: false, errorObject: {} };

    // if (fields.length === 0) {
    //   return result;
    // }

    const fn = (internalError = false, errorObject = {}) => {
      result.done = false;
      result.internalError = internalError;
      result.errorObject = errorObject;

      return result;
    };

    if (customTypeof.check(selectedFields).type.undefined) {
      return fn(true);
    }

    const checkFields = (output, fields) => {
      const outputLength = getObjectLength(output);
      const fieldsLength = getObjectLength(fields);

      // logger.log(Object.keys(output));
      // logger.log(Object.keys(fields));

      if (outputLength !== fieldsLength) {
        if (outputLength < fieldsLength) {
          return fn(true, OUTPUT_FIELDS_MISSING);
        } else {
          // logger.log(
          //   "output:",
          //   output,
          //   "\nfields:",
          //   fields,

          //   "outputLength:",
          //   outputLength,
          //   "fieldsLength:",
          //   fieldsLength
          // );
          return fn(true, OUTPUT_FIELDS_OVERLOAD);
        }
      }

      for (const key in fields) {
        const outputProp = output[key];
        const fieldProp = fields[key];

        //* If true fieldProp is optional field
        if (fieldProp && customTypeof.check(fieldProp).type.boolean) continue;

        if (customTypeof.check(outputProp).type.undefined) {
          fn(true, OUTPUT_FIELDS_MISSING);
          break;
        }

        if (customTypeof.check(fieldProp).type.object) {
          if (!customTypeof.check(outputProp).type.object) {
            fn(true, OUTPUT_FIELDS_MISSING);
            break;
          }

          result = checkFields(outputProp, fieldProp);
        }

        if (customTypeof.check(fieldProp).type.array) {
          if (!customTypeof.check(outputProp).type.array) {
            fn(true, OUTPUT_FIELDS_MISSING);
            break;
          }

          // eslint-disable-next-line no-loop-func
          outputProp.forEach((item) => {
            result = checkFields(item, fieldProp[0]);
          });
        }
      }

      return result;
    };

    checkFields(output, selectedFields);

    return result;
  } catch (error) {
    logger.log("checkOutputFields catch, error:", error);
    throw error;
  }
};

module.exports = { checkInputFields, checkOutputFields };
