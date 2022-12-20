const {
  authentication,
} = require("$/functions/helpers/integrationHelpers/success/authentication");
const {
  chatId,
} = require("$/functions/helpers/integrationHelpers/success/chatId");
const {
  countryCode,
} = require("$/functions/helpers/integrationHelpers/success/countryCode");
const {
  countryName,
} = require("$/functions/helpers/integrationHelpers/success/countryName");
const {
  firstName,
} = require("$/functions/helpers/integrationHelpers/success/firstName");
const {
  lastName,
} = require("$/functions/helpers/integrationHelpers/success/lastName");
const {
  message,
} = require("$/functions/helpers/integrationHelpers/success/message");
const {
  messageId,
} = require("$/functions/helpers/integrationHelpers/success/messageId");
const {
  participantId,
} = require("$/functions/helpers/integrationHelpers/success/participantId");
const {
  phoneNumber,
} = require("$/functions/helpers/integrationHelpers/success/phoneNumber");
const {
  privateChats,
} = require("$/functions/helpers/integrationHelpers/success/privateChats");
const {
  userId,
} = require("$/functions/helpers/integrationHelpers/success/userId");
const {
  senderId,
} = require("$/functions/helpers/integrationHelpers/success/senderId");
const {
  token,
} = require("$/functions/helpers/integrationHelpers/success/token");
const {
  verificationCode,
} = require("$/functions/helpers/integrationHelpers/success/verificationCode");

const integrationHelpersSuccessCollection = {
  authentication,
  chatId,
  countryCode,
  countryName,
  firstName,
  lastName,
  message,
  messageId,
  participantId,
  phoneNumber,
  privateChats,
  senderId,
  token,
  userId,
  verificationCode,
};

module.exports = { integrationHelpersSuccessCollection };
