import { chatValidationModels } from "@/models/validation/chat";
import { commonValidationModels } from "@/models/validation/common";
import { userValidationModels } from "@/models/validation/user";

const validationModels = {
  ...chatValidationModels,
  ...commonValidationModels,
  ...userValidationModels,
};

export { validationModels };
