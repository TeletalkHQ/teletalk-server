const { cellphone } = require("$/helpers/integrationHelpers/fail/cellphone");
const { selfStuff } = require("$/helpers/integrationHelpers/fail/selfStuff");
const {
  authentication,
} = require("$/helpers/integrationHelpers/fail/authentication");
const {
  blacklistItemExist,
  blacklistItemNotExist,
  contactItemExist,
  contactItemNotExist,
  targetUserNotExist,
} = require("$/helpers/integrationHelpers/fail/existences");
const { chatId } = require("$/helpers/integrationHelpers/fail/chatId");
const {
  countryCode,
} = require("$/helpers/integrationHelpers/fail/countryCode");
const {
  countryName,
} = require("$/helpers/integrationHelpers/fail/countryName");
const { firstName } = require("$/helpers/integrationHelpers/fail/firstName");
const { lastName } = require("$/helpers/integrationHelpers/fail/lastName");
const { message } = require("$/helpers/integrationHelpers/fail/message");
const {
  participantId,
} = require("$/helpers/integrationHelpers/fail/participantId");
const {
  phoneNumber,
} = require("$/helpers/integrationHelpers/fail/phoneNumber");
const {
  verificationCode,
} = require("$/helpers/integrationHelpers/fail/verificationCode");

const integrationHelpersFailCollection = {
  authentication,
  blacklistItemExist,
  blacklistItemNotExist,
  cellphone,
  chatId,
  contactItemExist,
  contactItemNotExist,
  countryCode,
  countryName,
  firstName,
  lastName,
  message,
  participantId,
  phoneNumber,
  selfStuff,
  targetUserNotExist,
  verificationCode,
};

module.exports = { integrationHelpersFailCollection };
