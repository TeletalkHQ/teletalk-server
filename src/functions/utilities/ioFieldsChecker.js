const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { checkFields } = require("utility-store/src/classes/CheckFields");

const { errorThrower } = require("@/functions/utilities/utils");

const { appErrors } = require("@/variables/errors/appErrors");

const {
  REQUIRED_FIELDS_NOT_DEFINED,
  REQUIRED_IO_FIELD_IS_NOT_ARRAY,
  REQUIRED_IO_FIELD_IS_NOT_OBJECT,
} = appErrors;

const ioFieldsCheckerDefaultOptions = {
  requiredFieldsIndex: 0,
  missingFieldsError: {},
  overloadFieldsError: {},
};

const ioFieldsChecker = (
  ioData,
  requiredFields,
  options = ioFieldsCheckerDefaultOptions
) => {
  const {
    missingFieldsError,
    overloadFieldsError,
    requiredFieldsIndex = 0,
  } = {
    ...ioFieldsCheckerDefaultOptions,
    ...options,
  };

  try {
    const selectedRequiredFields = getSelectedRequiredFields(
      requiredFields,
      requiredFieldsIndex
    );

    throwErrorIfSelectedRequiredFieldsIsNotDefined(selectedRequiredFields);

    checkFields(
      ioData,
      selectedRequiredFields,
      missingFieldsError,
      overloadFieldsError,
      REQUIRED_IO_FIELD_IS_NOT_ARRAY,
      REQUIRED_IO_FIELD_IS_NOT_OBJECT
    ).check();

    return { done: true };
  } catch (error) {
    return {
      done: false,
      errorObject: error,
    };
  }
};

const getSelectedRequiredFields = (requiredFields, index) =>
  requiredFields[index];

const throwErrorIfSelectedRequiredFieldsIsNotDefined = (
  selectedRequiredFields
) => {
  errorThrower(
    customTypeof.check(selectedRequiredFields).type.isUndefined,
    REQUIRED_FIELDS_NOT_DEFINED
  );
};

module.exports = { ioFieldsChecker };
