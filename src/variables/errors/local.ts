import { NativeError } from "~/types";

export const localErrors: Partial<NativeError>[] = [
  {
    reason: "EVENT_IS_INVALID",
  },
  {
    message: "You must pass validationModel as a object",
    reason: "VALIDATION_MODEL_IS_NOT_OBJECT",
  },
];
