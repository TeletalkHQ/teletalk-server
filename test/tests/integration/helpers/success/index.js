const {
  authenticationSuccessTest,
} = require("$/tests/integration/helpers/success/authentication");
const { bioSuccessTest } = require("$/tests/integration/helpers/success/bio");
const {
  blacklistSuccessTest,
} = require("$/tests/integration/helpers/success/blacklist");
const {
  cellphoneSuccessTest,
} = require("$/tests/integration/helpers/success/cellphone");
const {
  chatIdSuccessTest,
} = require("$/tests/integration/helpers/success/chatId");
const {
  contactsSuccessTest,
} = require("$/tests/integration/helpers/success/contacts");
const {
  countryCodeSuccessTest,
} = require("$/tests/integration/helpers/success/countryCode");
const {
  countryNameSuccessTest,
} = require("$/tests/integration/helpers/success/countryName");
const {
  firstNameSuccessTest,
} = require("$/tests/integration/helpers/success/firstName");
const {
  fullNameSuccessTest,
} = require("$/tests/integration/helpers/success/fullName");
const {
  lastNameSuccessTest,
} = require("$/tests/integration/helpers/success/lastName");
const {
  messageIdSuccessTest,
} = require("$/tests/integration/helpers/success/messageId");
const {
  messageSuccessTest,
} = require("$/tests/integration/helpers/success/message");
const {
  oneContactSuccessTest,
} = require("$/tests/integration/helpers/success/oneContact");
const {
  participantIdSuccessTest,
} = require("$/tests/integration/helpers/success/participantId");
const {
  phoneNumberSuccessTest,
} = require("$/tests/integration/helpers/success/phoneNumber");
const {
  privateChatsSuccessTest,
} = require("$/tests/integration/helpers/success/privateChats");
const {
  senderIdSuccessTest,
} = require("$/tests/integration/helpers/success/senderId");
const {
  userDataSuccessTest,
} = require("$/tests/integration/helpers/success/userData");
const {
  userIdSuccessTest,
} = require("$/tests/integration/helpers/success/userId");
const {
  usernameSuccessTest,
} = require("$/tests/integration/helpers/success/username");
const {
  verificationCodeSuccessTest,
} = require("$/tests/integration/helpers/success/verificationCode");

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
  participantId: participantIdSuccessTest,
  phoneNumber: phoneNumberSuccessTest,
  privateChats: privateChatsSuccessTest,
  senderId: senderIdSuccessTest,
  userData: userDataSuccessTest,
  userId: userIdSuccessTest,
  username: usernameSuccessTest,
  verificationCode: verificationCodeSuccessTest,
};

module.exports = { successCollection };
