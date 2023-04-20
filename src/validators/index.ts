import { bioValidator } from "@/validators/bio";
import { cellphoneValidator } from "@/validators/cellphone";
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

const validators = {
  bio: bioValidator,
  cellphone: cellphoneValidator,
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
