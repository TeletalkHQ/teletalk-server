import { localErrors } from "@/variables/errors/local";
import { serverErrors } from "@/variables/errors/server";
import { userErrors } from "@/variables/errors/user";

const schemaErrors = {
  schemaInvalid: serverErrors.REQUIRED_FIELD_INVALID,
  schemaInvalidType: serverErrors.REQUIRED_FIELD_INVALID_TYPE,
  schemaNotDefined: serverErrors.REQUIRED_FIELDS_NOT_DEFINED,
};

const ioErrors = {
  input: {
    ...schemaErrors,
    dataFieldInvalidType: userErrors.INPUT_FIELD_INVALID_TYPE,
    dataFieldsMissing: userErrors.INPUT_FIELDS_MISSING,
    dataFieldsOverload: userErrors.INPUT_FIELDS_OVERLOAD,
    dataNotDefined: userErrors.INPUT_DATA_NOT_DEFINED,
  },
  output: {
    ...schemaErrors,
    dataFieldInvalidType: serverErrors.OUTPUT_FIELD_INVALID_TYPE,
    dataFieldsMissing: serverErrors.OUTPUT_FIELDS_MISSING,
    dataFieldsOverload: serverErrors.OUTPUT_FIELDS_OVERLOAD,
    dataNotDefined: userErrors.OUTPUT_DATA_NOT_DEFINED,
  },
};

const errors = {
  io: ioErrors,
  ...localErrors,
  ...serverErrors,
  ...userErrors,
};

export { errors };
