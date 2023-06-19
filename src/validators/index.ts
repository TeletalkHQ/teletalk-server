import { Field, Validator } from "~/types";
import { bioValidator } from "~/validators/bio";
import { blacklistValidator } from "~/validators/blacklist";
import { chatIdValidator } from "~/validators/chatId";
import { clientIdValidator } from "~/validators/clientId";
import { clientsValidator } from "~/validators/clients";
import { contactsValidator } from "~/validators/contacts";
import { countryCodeValidator } from "~/validators/countryCode";
import { countryNameValidator } from "~/validators/countryName";
import { createdAtValidator } from "~/validators/createdAt";
import { firstNameValidator } from "~/validators/firstName";
import { idValidator } from "~/validators/id";
import { isActiveValidator } from "~/validators/isActive";
import { lastNameValidator } from "~/validators/lastName";
import { macAddressValidator } from "~/validators/macAddress";
import { messageIdValidator } from "~/validators/messageId";
import { messageTextValidator } from "~/validators/messageText";
import { messagesValidator } from "~/validators/messages";
import { participantIdValidator } from "~/validators/participantId";
import { participantsValidator } from "~/validators/participants";
import { phoneNumberValidator } from "~/validators/phoneNumber";
import { privateChatsValidator } from "~/validators/privateChats";
import { senderIdValidator } from "~/validators/senderId";
import { statusValidator } from "~/validators/status";
import { userIdValidator } from "~/validators/userId";
import { usernameValidator } from "~/validators/username";
import { verificationCodeValidator } from "~/validators/verificationCode";

type Validators = {
  [prop in Field]: Validator;
};

const validators: Validators = {
  bio: bioValidator,
  blacklist: blacklistValidator,
  chatId: chatIdValidator,
  clientId: clientIdValidator,
  clients: clientsValidator,
  contacts: contactsValidator,
  countryCode: countryCodeValidator,
  countryName: countryNameValidator,
  createdAt: createdAtValidator,
  firstName: firstNameValidator,
  id: idValidator,
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
  status: statusValidator,
  userId: userIdValidator,
  username: usernameValidator,
  verificationCode: verificationCodeValidator,
};

export { validators };
