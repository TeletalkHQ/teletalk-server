import { checkFieldErrors } from "./checkField";
import { customErrors } from "./custom";
import { localErrors } from "./local";

export const errors = {
  local: localErrors,
  custom: customErrors,
  checkField: checkFieldErrors,
};
