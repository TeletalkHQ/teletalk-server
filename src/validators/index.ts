import { Field, Validator } from "@/types";

import { bioValidator } from "@/validators/bio";
import { chatIdValidator } from "@/validators/chatId";
import { countryCodeValidator } from "@/validators/countryCode";
import { countryNameValidator } from "@/validators/countryName";
import { firstNameValidator } from "@/validators/firstName";
import { lastNameValidator } from "@/validators/lastName";
import { messageTextValidator } from "@/validators/messageText";
import { participantIdValidator } from "@/validators/participantId";
import { phoneNumberValidator } from "@/validators/phoneNumber";
import { sessionValidator } from "@/validators/session";
import { userIdValidator } from "@/validators/userId";
import { usernameValidator } from "@/validators/username";
import { verificationCodeValidator } from "@/validators/verificationCode";

type Validators = {
  [prop in Field]: Validator;
};

const validators: Validators = {
  bio: bioValidator,
  chatId: chatIdValidator,
  countryCode: countryCodeValidator,
  countryName: countryNameValidator,
  firstName: firstNameValidator,
  lastName: lastNameValidator,
  messageText: messageTextValidator,
  participantId: participantIdValidator,
  phoneNumber: phoneNumberValidator,
  session: sessionValidator,
  userId: userIdValidator,
  username: usernameValidator,
  verificationCode: verificationCodeValidator,
};

export { validators };
