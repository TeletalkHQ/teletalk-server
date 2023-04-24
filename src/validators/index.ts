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
import { blacklistValidator } from "@/validators/blacklist";
import { clientIdValidator } from "@/validators/clientId";
import { contactsValidator } from "@/validators/contacts";
import { createdAtValidator } from "@/validators/createdAt";
import { isActiveValidator } from "@/validators/isActive";
import { macAddressValidator } from "@/validators/macAddress";
import { messageIdValidator } from "@/validators/messageId";
import { messagesValidator } from "@/validators/messages";
import { participantsValidator } from "@/validators/participants";
import { privateChatsValidator } from "@/validators/privateChats";
import { senderIdValidator } from "@/validators/senderId";
import { sessionsValidator } from "@/validators/sessions";
import { statusValidator } from "@/validators/status";

type Validators = {
  [prop in Field]: Validator;
};

const validators: Validators = {
  bio: bioValidator,
  blacklist: blacklistValidator,
  chatId: chatIdValidator,
  clientId: clientIdValidator,
  contacts: contactsValidator,
  countryCode: countryCodeValidator,
  countryName: countryNameValidator,
  createdAt: createdAtValidator,
  firstName: firstNameValidator,
  isActive: isActiveValidator,
  lastName: lastNameValidator,
  macAddress: macAddressValidator,
  messageId: messageIdValidator,
  messages: messagesValidator,
  messageText: messageTextValidator,
  participantId: participantIdValidator,
  participants: participantsValidator,
  phoneNumber: phoneNumberValidator,
  privateChats: privateChatsValidator,
  senderId: senderIdValidator,
  session: sessionValidator,
  sessions: sessionsValidator,
  status: statusValidator,
  userId: userIdValidator,
  username: usernameValidator,
  verificationCode: verificationCodeValidator,
};

export { validators };
