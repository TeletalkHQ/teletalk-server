const {
  authentication,
} = require("$/tests/integration/helpers/success/authentication");
const { chatId } = require("$/tests/integration/helpers/success/chatId");
const {
  countryCode,
} = require("$/tests/integration/helpers/success/countryCode");
const {
  countryName,
} = require("$/tests/integration/helpers/success/countryName");
const { firstName } = require("$/tests/integration/helpers/success/firstName");
const { lastName } = require("$/tests/integration/helpers/success/lastName");
const { message } = require("$/tests/integration/helpers/success/message");
const { messageId } = require("$/tests/integration/helpers/success/messageId");
const {
  participantId,
} = require("$/tests/integration/helpers/success/participantId");
const {
  phoneNumber,
} = require("$/tests/integration/helpers/success/phoneNumber");
const {
  privateChats,
} = require("$/tests/integration/helpers/success/privateChats");
const { userId } = require("$/tests/integration/helpers/success/userId");
const { senderId } = require("$/tests/integration/helpers/success/senderId");
const { token } = require("$/tests/integration/helpers/success/token");
const {
  verificationCode,
} = require("$/tests/integration/helpers/success/verificationCode");

const successCollection = {
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

module.exports = { successCollection };
