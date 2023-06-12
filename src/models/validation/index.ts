import { chatValidationModels } from "~/models/validation/chat";
import { commonValidationModels } from "~/models/validation/common";
import { userValidationModels } from "~/models/validation/user";

import { ValidationCollection } from "~/types";

const validationModels: ValidationCollection = {
  ...chatValidationModels,
  ...commonValidationModels,
  ...userValidationModels,
};

export { validationModels };
