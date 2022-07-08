const { customTypeof } = require("@/classes/CustomTypeof");

const { getObjectLength } = require("@/functions/utilities/utils");

const ioFieldsChecker = (
  input,
  fields,
  options = {
    fieldsIndex: 0,
    missingFieldsError: {},
    overloadFieldsError: {},
  }
) => {
  const {
    fieldsIndex = 0,
    missingFieldsError,
    overloadFieldsError,
  } = {
    fieldsIndex: 0,
    ...options,
  };

  try {
    const selectedFields = fields[fieldsIndex];

    if (customTypeof.check(selectedFields).type.undefined) {
      const internalError = {
        internalError: true,
        errorObject: {},
      };
      throw internalError;
    }

    checkFields(input, selectedFields, missingFieldsError, overloadFieldsError);

    return { done: true };
  } catch (error) {
    logger.log("ioFieldsChecker catch, error:", error);
    return {
      done: false,
      errorObject: error,
    };
  }
};

const checkFields = (
  ioData,
  fields,
  missingFieldsError,
  overloadFieldsError
) => {
  const ioFieldsLength = getObjectLength(ioData);
  const fieldsLength = getObjectLength(fields);

  if (ioFieldsLength !== fieldsLength) {
    if (ioFieldsLength < fieldsLength) {
      throw missingFieldsError;
    } else {
      // logger.log(
      //   "ioData:",
      //   ioData,
      //   "\nfields:",
      //   fields,

      //   "ioFieldsLength:",
      //   ioFieldsLength,
      //   "fieldsLength:",
      //   fieldsLength
      // );
      throw overloadFieldsError;
    }
  }

  for (const key in fields) {
    const ioProp = ioData[key];
    const fieldProp = fields[key];

    //* If true fieldProp is optional field
    if (fieldProp && customTypeof.check(fieldProp).type.boolean) continue;

    if (customTypeof.check(ioProp).type.undefined) throw missingFieldsError;

    if (customTypeof.check(fieldProp).type.object) {
      if (!customTypeof.check(ioProp).type.object) {
        throw missingFieldsError;
      }

      checkFields(ioProp, fieldProp, missingFieldsError, overloadFieldsError);
    }

    if (customTypeof.check(fieldProp).type.array) {
      if (!customTypeof.check(ioProp).type.array) {
        throw missingFieldsError;
      }

      ioProp.forEach((item) => {
        checkFields(
          item,
          fieldProp[0],
          missingFieldsError,
          overloadFieldsError
        );
      });
    }
  }

  return { done: true };
};

module.exports = {
  ioFieldsChecker,
  checkFields,
};
