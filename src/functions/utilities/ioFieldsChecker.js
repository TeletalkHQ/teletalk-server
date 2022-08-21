const { customTypeof } = require("@/classes/CustomTypeof");
const { objectUtilities } = require("@/classes/ObjectUtilities");

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
    requiredFieldsIndex = 0,
    missingFieldsError,
    overloadFieldsError,
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
      overloadFieldsError
    );

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
    customTypeof.check(selectedRequiredFields).type.undefined,
    REQUIRED_FIELDS_NOT_DEFINED
  );
};

const checkFields = (
  ioData,
  requiredFields,
  missingFieldsError,
  overloadFieldsError
) => {
  const filteredOptionalFieldsFromRequiredFields =
    filterOptionalFields(requiredFields);

  logger.log(
    "rm",
    "filteredOptionalFieldsFromRequiredFields",
    filteredOptionalFieldsFromRequiredFields
  );

  throwErrorByIoDataAndRequiredFieldsLengthComparison(
    ioData,
    filteredOptionalFieldsFromRequiredFields,
    missingFieldsError,
    overloadFieldsError
  );

  for (const key in requiredFields) {
    const ioField = ioData[key];
    const requiredField = requiredFields[key];

    if (checkIfIsRequiredFieldOptional(requiredField)) continue;

    throwErrorIfIoFieldIsUndefined(ioField, missingFieldsError);

    if (customTypeof.check(requiredField).type.object) {
      throwErrorIfIoFieldIsNotObject(ioField);

      checkObjectFields(
        ioField,
        requiredField,
        missingFieldsError,
        overloadFieldsError
      );
    } else if (customTypeof.check(requiredField).type.array) {
      throwErrorIfIoFieldIsNotArray(ioField);

      checkArrayFields(
        ioField,
        requiredField,
        missingFieldsError,
        overloadFieldsError
      );
    }
  }

  return { done: true };
};

const checkObjectFields = (
  ioField,
  requiredField,
  missingFieldsError,
  overloadFieldsError
) => {
  checkFields(ioField, requiredField, missingFieldsError, overloadFieldsError);
};

const checkArrayFields = (
  ioField,
  requiredField,
  missingFieldsError,
  overloadFieldsError
) => {
  ioField.forEach((item) => {
    checkFields(
      item,
      requiredField[0],
      missingFieldsError,
      overloadFieldsError
    );
  });
};

const filterOptionalFields = (object) => {
  const tempObject = { ...object };

  for (const key in tempObject) {
    const value = tempObject[key];
    if (customTypeof.check(value).type.boolean && value) {
      delete tempObject[key];
    }
  }

  return tempObject;
};

const throwErrorByIoDataAndRequiredFieldsLengthComparison = (
  ioData,
  requiredFields,
  missingFieldsError,
  overloadFieldsError
) => {
  const ioFieldsLength = objectUtilities.objectKeysLength(ioData);
  const fieldsLength = objectUtilities.objectKeysLength(requiredFields);

  logger.log(
    "rm",
    "ioFieldsLength !== fieldsLength",
    ioFieldsLength !== fieldsLength,
    ioFieldsLength,
    fieldsLength,
    ioData,
    requiredFields
  );
  if (ioFieldsLength !== fieldsLength) {
    errorThrower(ioFieldsLength < fieldsLength, missingFieldsError);

    throw overloadFieldsError;
  }
};

const checkIfIsRequiredFieldOptional = (requiredField) => {
  return customTypeof.check(requiredField).type.boolean && !!requiredField;
};

const throwErrorIfIoFieldIsUndefined = (ioField, missingFieldsError) => {
  errorThrower(customTypeof.check(ioField).type.undefined, missingFieldsError);
};

const throwErrorIfIoFieldIsNotObject = (ioField) => {
  errorThrower(
    !customTypeof.check(ioField).type.object,
    REQUIRED_IO_FIELD_IS_NOT_OBJECT
  );
};
const throwErrorIfIoFieldIsNotArray = (ioField) => {
  errorThrower(
    !customTypeof.check(ioField).type.array,
    REQUIRED_IO_FIELD_IS_NOT_ARRAY
  );
};

module.exports = { ioFieldsChecker };
