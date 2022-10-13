const {
  cellphoneFailureTests,
} = require("$/helpers/integrationHelpers/cellphone");
const { chatIdSuccessTests } = require("$/helpers/integrationHelpers/chatId");
const {
  messageIdSuccessTests,
} = require("$/helpers/integrationHelpers/messageId");
const {
  privateIdSuccessTests,
} = require("$/helpers/integrationHelpers/privateId");
const {
  selfStuffFailureTests,
} = require("$/helpers/integrationHelpers/selfStuff");
const { tokenSuccessTests } = require("$/helpers/integrationHelpers/token");
const {
  authenticationFailureTests,
} = require("$/helpers/integrationHelpers/authentication");
const {
  blacklistItemExistFailureTests,
  blacklistItemNotExistFailureTests,
  contactItemExistFailureTests,
  contactItemNotExistFailureTests,
  targetUserNotExistFailureTests,
} = require("$/helpers/integrationHelpers/existences");
const {
  countryCodeFailureTests,
  countryCodeSuccessTests,
} = require("$/helpers/integrationHelpers/countryCode");
const {
  countryNameFailureTests,
  countryNameSuccessTests,
} = require("$/helpers/integrationHelpers/countryName");
const {
  firstNameFailureTests,
  firstNameSuccessTests,
} = require("$/helpers/integrationHelpers/firstName");
const {
  lastNameFailureTests,
  lastNameSuccessTests,
} = require("$/helpers/integrationHelpers/lastName");
const {
  messageSuccessTests,
  messageFailureTests,
} = require("$/helpers/integrationHelpers/message");
const {
  participantIdFailureTests,
} = require("$/helpers/integrationHelpers/participantId");
const {
  phoneNumberFailureTests,
  phoneNumberSuccessTests,
} = require("$/helpers/integrationHelpers/phoneNumber");
const {
  verificationCodeFailureTests,
} = require("$/helpers/integrationHelpers/verificationCode");
const {
  verificationCodeSuccessTests,
} = require("$/helpers/integrationHelpers/verificationCode");

const integrationHelpers = {
  authenticationFailureTests,
  blacklistItemExistFailureTests,
  blacklistItemNotExistFailureTests,
  cellphoneFailureTests,
  chatIdSuccessTests,
  contactItemExistFailureTests,
  contactItemNotExistFailureTests,
  countryCodeFailureTests,
  countryCodeSuccessTests,
  countryNameFailureTests,
  countryNameSuccessTests,
  firstNameFailureTests,
  firstNameSuccessTests,
  lastNameFailureTests,
  lastNameSuccessTests,
  messageFailureTests,
  messageIdSuccessTests,
  messageSuccessTests,
  participantIdFailureTests,
  phoneNumberFailureTests,
  phoneNumberSuccessTests,
  privateIdSuccessTests,
  selfStuffFailureTests,
  targetUserNotExistFailureTests,
  tokenSuccessTests,
  verificationCodeFailureTests,
  verificationCodeSuccessTests,
};

module.exports = { integrationHelpers };
