const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { checkFields } = require("utility-store/src/classes/CheckFields");
const { trier } = require("utility-store/src/classes/Trier");

const { errorThrower } = require("@/functions/utilities/utilities");

const { errors } = require("@/variables/errors/errors");

const {
  REQUIRED_FIELDS_NOT_DEFINED,
  REQUIRED_IO_FIELD_IS_NOT_ARRAY,
  REQUIRED_IO_FIELD_IS_NOT_OBJECT,
} = errors;

const ioFieldsCheckerDefaultOptions = {
  requiredFieldsIndex: 0,
  missingFieldsError: {},
  overloadFieldsError: {},
};

const getSelectedRequiredFields = (requiredFields, index) =>
  requiredFields[index];

const throwErrorIfSelectedRequiredFieldsIsNotDefined = (
  selectedRequiredFields
) => {
  errorThrower(
    customTypeof.isUndefined(selectedRequiredFields),
    REQUIRED_FIELDS_NOT_DEFINED
  );
};

const tryCheckFields = (
  ioData,
  requiredFields,
  requiredFieldsIndex,
  missingFieldsError,
  overloadFieldsError
) => {
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

  return { ok: true };
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

  return trier(ioFieldsChecker.name)
    .try(
      tryCheckFields,
      ioData,
      requiredFields,
      requiredFieldsIndex,
      missingFieldsError,
      overloadFieldsError
    )
    .catch((error) => ({
      ok: false,
      errorObject: error,
    }))
    .printAndThrow()
    .result();
};

module.exports = { ioFieldsChecker };
