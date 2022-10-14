const {
  authentication,
} = require("$/helpers/integrationHelpers/success/authentication");
const { cellphone } = require("$/helpers/integrationHelpers/success/cellphone");
const { chatId } = require("$/helpers/integrationHelpers/success/chatId");
const { chats } = require("$/helpers/integrationHelpers/success/chats");
const {
  countryCode,
} = require("$/helpers/integrationHelpers/success/countryCode");
const {
  countryName,
} = require("$/helpers/integrationHelpers/success/countryName");
const { firstName } = require("$/helpers/integrationHelpers/success/firstName");
const { lastName } = require("$/helpers/integrationHelpers/success/lastName");
const { message } = require("$/helpers/integrationHelpers/success/message");
const { messageId } = require("$/helpers/integrationHelpers/success/messageId");
const {
  participantId,
} = require("$/helpers/integrationHelpers/success/participantId");
const {
  phoneNumber,
} = require("$/helpers/integrationHelpers/success/phoneNumber");
const { privateId } = require("$/helpers/integrationHelpers/success/privateId");
const { senderId } = require("$/helpers/integrationHelpers/success/senderId");
const { token } = require("$/helpers/integrationHelpers/success/token");
const {
  verificationCode,
} = require("$/helpers/integrationHelpers/success/verificationCode");

const integrationHelpersSuccessCollection = {
  authentication,
  cellphone,
  chatId,
  chats,
  countryCode,
  countryName,
  firstName,
  lastName,
  message,
  messageId,
  participantId,
  phoneNumber,
  privateId,
  senderId,
  token,
  verificationCode,
};

module.exports = { integrationHelpersSuccessCollection };
