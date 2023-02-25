import { authenticationSuccessTest } from "$/tests/integration/helpers/success/authentication";
import { bioSuccessTest } from "$/tests/integration/helpers/success/bio";
import { blacklistSuccessTest } from "$/tests/integration/helpers/success/blacklist";
import { cellphoneSuccessTest } from "$/tests/integration/helpers/success/cellphone";
import { chatIdSuccessTest } from "$/tests/integration/helpers/success/chatId";
import { contactsSuccessTest } from "$/tests/integration/helpers/success/contacts";
import { countryCodeSuccessTest } from "$/tests/integration/helpers/success/countryCode";
import { countryNameSuccessTest } from "$/tests/integration/helpers/success/countryName";
import { firstNameSuccessTest } from "$/tests/integration/helpers/success/firstName";
import { fullNameSuccessTest } from "$/tests/integration/helpers/success/fullName";
import { lastNameSuccessTest } from "$/tests/integration/helpers/success/lastName";
import { messageIdSuccessTest } from "$/tests/integration/helpers/success/messageId";
import { messageSuccessTest } from "$/tests/integration/helpers/success/message";
import { oneContactSuccessTest } from "$/tests/integration/helpers/success/oneContact";
import { phoneNumberSuccessTest } from "$/tests/integration/helpers/success/phoneNumber";
import { privateChatsSuccessTest } from "$/tests/integration/helpers/success/privateChats";
import { userDataSuccessTest } from "$/tests/integration/helpers/success/userData";
import { userIdSuccessTest } from "$/tests/integration/helpers/success/userId";
import { usernameSuccessTest } from "$/tests/integration/helpers/success/username";
import { verificationCodeSuccessTest } from "$/tests/integration/helpers/success/verificationCode";

const successCollection = {
  authentication: authenticationSuccessTest,
  bio: bioSuccessTest,
  blacklist: blacklistSuccessTest,
  cellphone: cellphoneSuccessTest,
  chatId: chatIdSuccessTest,
  contacts: contactsSuccessTest,
  countryCode: countryCodeSuccessTest,
  countryName: countryNameSuccessTest,
  firstName: firstNameSuccessTest,
  fullName: fullNameSuccessTest,
  lastName: lastNameSuccessTest,
  message: messageSuccessTest,
  messageId: messageIdSuccessTest,
  oneContact: oneContactSuccessTest,
  phoneNumber: phoneNumberSuccessTest,
  privateChats: privateChatsSuccessTest,
  userData: userDataSuccessTest,
  userId: userIdSuccessTest,
  username: usernameSuccessTest,
  verificationCode: verificationCodeSuccessTest,
};

export { successCollection };
