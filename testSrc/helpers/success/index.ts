import { bioSuccessTest } from "$/helpers/success/bio";
import { blacklistSuccessTest } from "$/helpers/success/blacklist";
import { cellphoneSuccessTest } from "$/helpers/success/cellphone";
import { chatIdSuccessTest } from "$/helpers/success/chatId";
import { contactsSuccessTest } from "$/helpers/success/contacts";
import { countryCodeSuccessTest } from "$/helpers/success/countryCode";
import { countryNameSuccessTest } from "$/helpers/success/countryName";
import { firstNameSuccessTest } from "$/helpers/success/firstName";
import { fullNameSuccessTest } from "$/helpers/success/fullName";
import { lastNameSuccessTest } from "$/helpers/success/lastName";
import { messageIdSuccessTest } from "$/helpers/success/messageId";
import { messageTextSuccessTest } from "$/helpers/success/messageText";
import { oneContactSuccessTest } from "$/helpers/success/oneContact";
import { phoneNumberSuccessTest } from "$/helpers/success/phoneNumber";
import { privateChatsSuccessTest } from "$/helpers/success/privateChats";
import { userDataSuccessTest } from "$/helpers/success/userData";
import { userIdSuccessTest } from "$/helpers/success/userId";
import { usernameSuccessTest } from "$/helpers/success/username";
import { verificationCodeSuccessTest } from "$/helpers/success/verificationCode";

const successCollection = {
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
  messageText: messageTextSuccessTest,
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
