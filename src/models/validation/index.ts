import { chatValidationModels } from "@/models/validation/chat";
import { commonValidationModels } from "@/models/validation/common";
import { userValidationModels } from "@/models/validation/user";

const validationModels = {
  chat: chatValidationModels,
  common: commonValidationModels,
  user: userValidationModels,
};

export { validationModels };
