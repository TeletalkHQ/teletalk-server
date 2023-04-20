import { chatValidators } from "@/validators/chat";
import { userValidators } from "@/validators/user";

const validators = { ...chatValidators, ...userValidators };

export { validators };
