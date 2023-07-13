import { IoErrors } from "check-fields";

import { ErrorReason } from "~/types";

import { customErrors } from "./custom";

const findError = (reason: ErrorReason) =>
  customErrors.find((i) => i.reason === reason)!;

const requiredFieldErrors = {
  schemaInvalid: findError("REQUIRED_FIELD_INVALID"),
  schemaInvalidType: findError("REQUIRED_FIELD_INVALID_TYPE"),
  schemaNotDefined: findError("REQUIRED_FIELDS_NOT_DEFINED"),
};

const input: IoErrors = {
  ...requiredFieldErrors,
  dataFieldInvalidType: findError("INPUT_FIELD_INVALID_TYPE"),
  dataFieldsMissing: findError("INPUT_FIELDS_MISSING"),
  dataFieldsOverload: findError("INPUT_FIELDS_OVERLOAD"),
  dataNotDefined: findError("INPUT_DATA_NOT_DEFINED"),
};

const output: IoErrors = {
  ...requiredFieldErrors,
  dataFieldInvalidType: findError("OUTPUT_FIELD_INVALID_TYPE"),
  dataFieldsMissing: findError("OUTPUT_FIELDS_MISSING"),
  dataFieldsOverload: findError("OUTPUT_FIELDS_OVERLOAD"),
  dataNotDefined: findError("OUTPUT_DATA_NOT_DEFINED"),
};

export const checkFieldErrors = {
  input,
  output,
};
