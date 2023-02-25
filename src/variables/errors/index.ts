const { localErrors } = require("@/variables/errors/local");
const { serverErrors } = require("@/variables/errors/server");
const { userErrors } = require("@/variables/errors/user");

const ioErrors = {
  input: {
    ioDataFieldInvalidType: userErrors.INPUT_FIELD_INVALID_TYPE,
    missingFieldsError: userErrors.INPUT_FIELDS_MISSING,
    overloadFieldsError: userErrors.INPUT_FIELDS_OVERLOAD,
    requiredFieldsNotDefinedError: serverErrors.REQUIRED_FIELDS_NOT_DEFINED,
    requiredFieldInvalidType: serverErrors.REQUIRED_FIELD_INVALID_TYPE,
  },
  output: {
    ioDataFieldTypeWrongError: serverErrors.OUTPUT_FIELD_TYPE_WRONG,
    missingFieldsError: serverErrors.OUTPUT_FIELDS_MISSING,
    overloadFieldsError: serverErrors.OUTPUT_FIELDS_OVERLOAD,
    requiredFieldsNotDefinedError: serverErrors.REQUIRED_FIELDS_NOT_DEFINED,
    requiredFieldInvalidType: serverErrors.REQUIRED_FIELD_INVALID_TYPE,
  },
};

const errors = {
  io: ioErrors,
  ...localErrors,
  ...serverErrors,
  ...userErrors,
};

module.exports = { errors };
