const {
  cellphoneFailTest,
} = require("$/tests/integration/helpers/fail/cellphone");
const {
  selfStuffFailTest,
} = require("$/tests/integration/helpers/fail/selfStuff");
const {
  authenticationFailTest,
} = require("$/tests/integration/helpers/fail/authentication");
const {
  blacklistItemExistFailTest,
  blacklistItemNotExistFailTest,
  contactItemExistFailTest,
  contactItemNotExistFailTest,
  targetUserNotExistFailTest,
} = require("$/tests/integration/helpers/fail/existences");
const { chatIdFailTest } = require("$/tests/integration/helpers/fail/chatId");
const {
  checkCurrentUserStatusFailTest,
} = require("$/tests/integration/helpers/fail/checkCurrentUserStatus");
const {
  countryCodeFailTest,
} = require("$/tests/integration/helpers/fail/countryCode");
const {
  countryNameFailTest,
} = require("$/tests/integration/helpers/fail/countryName");
const {
  firstNameFailTest,
} = require("$/tests/integration/helpers/fail/firstName");
const {
  inputMissingFailTest,
} = require("$/tests/integration/helpers/fail/inputMissing");
const {
  inputOverloadFailTest,
} = require("$/tests/integration/helpers/fail/inputOverload");
const { inputFailTest } = require("$/tests/integration/helpers/fail/input");
const {
  lastNameFailTest,
} = require("$/tests/integration/helpers/fail/lastName");
const { messageFailTest } = require("$/tests/integration/helpers/fail/message");
const {
  participantIdFailTest,
} = require("$/tests/integration/helpers/fail/participantId");
const {
  phoneNumberFailTest,
} = require("$/tests/integration/helpers/fail/phoneNumber");
const { userIdFailTest } = require("$/tests/integration/helpers/fail/userId");
const {
  verificationCodeFailTest,
} = require("$/tests/integration/helpers/fail/verificationCode");
const { bioFailTest } = require("$/tests/integration/helpers/fail/bio");
const {
  usernameFailTest,
} = require("$/tests/integration/helpers/fail/username");

const failCollection = {
  authentication: authenticationFailTest,
  bio: bioFailTest,
  blacklistItemExist: blacklistItemExistFailTest,
  blacklistItemNotExist: blacklistItemNotExistFailTest,
  cellphone: cellphoneFailTest,
  chatId: chatIdFailTest,
  checkCurrentUserStatus: checkCurrentUserStatusFailTest,
  contactItemExist: contactItemExistFailTest,
  contactItemNotExist: contactItemNotExistFailTest,
  countryCode: countryCodeFailTest,
  countryName: countryNameFailTest,
  firstName: firstNameFailTest,
  input: inputFailTest,
  inputMissing: inputMissingFailTest,
  inputOverload: inputOverloadFailTest,
  lastName: lastNameFailTest,
  message: messageFailTest,
  participantId: participantIdFailTest,
  phoneNumber: phoneNumberFailTest,
  selfStuff: selfStuffFailTest,
  targetUserNotExist: targetUserNotExistFailTest,
  userId: userIdFailTest,
  username: usernameFailTest,
  verificationCode: verificationCodeFailTest,
};

module.exports = { failCollection };
