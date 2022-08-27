const { customTypeof } = require("@/classes/CustomTypeof");
const { objectUtilities } = require("@/classes/ObjectUtilities");

const { errorThrower } = require("@/functions/utilities/utils");

const { appErrors } = require("@/variables/errors/appErrors");

const { REQUIRED_IO_FIELD_IS_NOT_ARRAY, REQUIRED_IO_FIELD_IS_NOT_OBJECT } =
  appErrors;

class CheckFields {
  constructor(ioData, requiredFields, missingFieldsError, overloadFieldsError) {
    this.ioData = this.filterIoDataOptionalFields(ioData, requiredFields);
    this.requiredFields =
      this.filterRequiredFieldsOptionalFields(requiredFields);
    this.missingFieldsError = missingFieldsError;
    this.overloadFieldsError = overloadFieldsError;
  }

  check() {
    this.throwErrorIfIoDataAndRequiredFieldsLengthNotMatch().checkRequiredFields();

    return { done: true };
  }

  filterIoDataOptionalFields(ioData, requiredFields) {
    const tempIoData = {};

    for (const key in ioData) {
      const ioFieldValue = ioData[key];
      const requiredField = requiredFields[key];
      if (this.isRequiredFieldOptional(requiredField)) continue;
      tempIoData[key] = ioFieldValue;
    }

    return tempIoData;
  }

  filterRequiredFieldsOptionalFields(requiredFields) {
    const tempRequiredFields = {};

    for (const key in requiredFields) {
      const requiredFieldValue = requiredFields[key];
      if (this.isRequiredFieldOptional(requiredFieldValue)) continue;
      tempRequiredFields[key] = requiredFieldValue;
    }

    return tempRequiredFields;
  }

  throwErrorIfIoDataAndRequiredFieldsLengthNotMatch() {
    const ioFieldsLength = objectUtilities.objectKeysLength(this.ioData);
    const requiredFieldsLength = objectUtilities.objectKeysLength(
      this.requiredFields
    );

    if (ioFieldsLength !== requiredFieldsLength) {
      errorThrower(
        ioFieldsLength < requiredFieldsLength,
        this.missingFieldsError
      );

      throw this.overloadFieldsError;
    }

    return this;
  }

  checkRequiredFields() {
    for (const key in this.requiredFields) {
      const ioField = this.ioData[key];
      const requiredField = this.requiredFields[key];

      this.throwErrorIfIoFieldIsUndefined(ioField);

      if (customTypeof.check(requiredField).type.object) {
        this.throwErrorIfIoFieldIsNotObject(ioField);
        this.checkObjectFields(ioField, requiredField);
      } else if (customTypeof.check(requiredField).type.array) {
        this.throwErrorIfIoFieldIsNotArray(ioField);
        this.checkArrayFields(ioField, requiredField[0]);
      }
    }
  }

  checkObjectFields(ioField, requiredField) {
    checkFields(
      ioField,
      requiredField,
      this.missingFieldsError,
      this.overloadFieldsError
    ).check();
  }

  checkArrayFields(ioField, requiredField) {
    ioField.forEach((item) => {
      checkFields(
        item,
        requiredField,
        this.missingFieldsError,
        this.overloadFieldsError
      ).check();
    });
  }

  isRequiredFieldOptional(requiredField) {
    if (customTypeof.isBoolean(requiredField) && requiredField) return true;

    return false;
  }

  throwErrorIfIoFieldIsUndefined(ioField) {
    errorThrower(
      customTypeof.check(ioField).type.undefined,
      this.missingFieldsError
    );
  }

  throwErrorIfIoFieldIsNotObject(ioField) {
    errorThrower(
      !customTypeof.check(ioField).type.object,
      REQUIRED_IO_FIELD_IS_NOT_OBJECT
    );
  }

  throwErrorIfIoFieldIsNotArray(ioField) {
    errorThrower(
      !customTypeof.check(ioField).type.array,
      REQUIRED_IO_FIELD_IS_NOT_ARRAY
    );
  }
}

const checkFields = (...args) => new CheckFields(...args);

module.exports = { CheckFields, checkFields };
