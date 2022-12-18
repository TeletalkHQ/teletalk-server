const { userErrors } = require("@/variables/errors/user");
const { serverErrors } = require("@/variables/errors/server");

const ioErrors = {
  input: {
    ioDataFieldTypeWrongError: userErrors.INPUT_FIELD_TYPE_WRONG,
    missingFieldsError: userErrors.INPUT_FIELDS_MISSING,
    overloadFieldsError: userErrors.INPUT_FIELDS_OVERLOAD,
    requiredFieldsNotDefinedError: serverErrors.REQUIRED_FIELDS_NOT_DEFINED,
    requiredFieldTypeWrongError: serverErrors.REQUIRED_FIELD_TYPE_WRONG,
  },
  output: {
    ioDataFieldTypeWrongError: serverErrors.OUTPUT_FIELD_TYPE_WRONG,
    missingFieldsError: serverErrors.OUTPUT_FIELDS_MISSING,
    overloadFieldsError: serverErrors.OUTPUT_FIELDS_OVERLOAD,

    requiredFieldsNotDefinedError: serverErrors.REQUIRED_FIELDS_NOT_DEFINED,
    requiredFieldTypeWrongError: serverErrors.REQUIRED_FIELD_TYPE_WRONG,
  },
};

module.exports = { ioErrors };
