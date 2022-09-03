const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { checkFields } = require("utility-store/src/classes/CheckFields");

const { errorThrower } = require("@/functions/utilities/utilities");

const { appErrors } = require("@/variables/errors/appErrors");
const { trier } = require("utility-store/src/classes/Trier");

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
    .printAndThrow().result;
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
