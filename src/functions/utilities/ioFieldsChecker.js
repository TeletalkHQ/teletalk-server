const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { checkFields } = require("utility-store/src/classes/CheckFields");
const { trier } = require("utility-store/src/classes/Trier");

const { errorThrower } = require("@/functions/utilities/utilities");

const { errors } = require("@/variables/errors");

const ioFieldsCheckerDefaultOptions = {
  ioDataFieldTypeWrongError: {},
  missingFieldsError: {},
  overloadFieldsError: {},
  requiredFieldsIndex: 0,
};

const getSelectedRequiredFields = (requiredFields, index) =>
  requiredFields[index];

const throwErrorIfSelectedRequiredFieldsIsNotDefined = (
  selectedRequiredFields
) => {
  errorThrower(
    customTypeof.isUndefined(selectedRequiredFields),
    errors.REQUIRED_FIELDS_NOT_DEFINED
  );
};

const tryCheckFields = ({
  ioData,
  ioDataFieldTypeWrongError,
  missingFieldsError,
  overloadFieldsError,
  requiredFields,
  requiredFieldsIndex,
}) => {
  const selectedRequiredFields = getSelectedRequiredFields(
    requiredFields,
    requiredFieldsIndex
  );

  throwErrorIfSelectedRequiredFieldsIsNotDefined(selectedRequiredFields);

  checkFields({
    ioData,
    ioDataFieldTypeWrongError,
    ioIsNotArrayError: errors.REQUIRED_IO_FIELD_IS_NOT_ARRAY,
    ioIsNotObjectError: errors.REQUIRED_IO_FIELD_IS_NOT_OBJECT,
    missingFieldsError,
    overloadFieldsError,
    requiredFields: selectedRequiredFields,
    requiredFieldTypeWrongError: errors.REQUIRED_FIELD_TYPE_WRONG,
  }).check();

  return { ok: true };
};

const ioFieldsChecker = (
  ioData,
  requiredFields,
  options = ioFieldsCheckerDefaultOptions
) => {
  const {
    ioDataFieldTypeWrongError,
    missingFieldsError,
    overloadFieldsError,
    requiredFieldsIndex = 0,
  } = {
    ...ioFieldsCheckerDefaultOptions,
    ...options,
  };

  return trier(ioFieldsChecker.name)
    .try(tryCheckFields, {
      ioData,
      ioDataFieldTypeWrongError,
      missingFieldsError,
      overloadFieldsError,
      requiredFields,
      requiredFieldsIndex,
    })
    .catch((error) => {
      return {
        ok: false,
        errorObject: error,
      };
    })
    .printError()
    .result();
};

module.exports = { ioFieldsChecker };
