const {
  cellphone,
} = require("$/functions/helpers/integrationHelpers/fail/cellphone");
const {
  selfStuff,
} = require("$/functions/helpers/integrationHelpers/fail/selfStuff");
const {
  authentication,
} = require("$/functions/helpers/integrationHelpers/fail/authentication");
const {
  blacklistItemExist,
  blacklistItemNotExist,
  contactItemExist,
  contactItemNotExist,
  targetUserNotExist,
} = require("$/functions/helpers/integrationHelpers/fail/existences");
const {
  chatId,
} = require("$/functions/helpers/integrationHelpers/fail/chatId");
const {
  countryCode,
} = require("$/functions/helpers/integrationHelpers/fail/countryCode");
const {
  countryName,
} = require("$/functions/helpers/integrationHelpers/fail/countryName");
const {
  firstName,
} = require("$/functions/helpers/integrationHelpers/fail/firstName");
const {
  lastName,
} = require("$/functions/helpers/integrationHelpers/fail/lastName");
const {
  message,
} = require("$/functions/helpers/integrationHelpers/fail/message");
const {
  participantId,
} = require("$/functions/helpers/integrationHelpers/fail/participantId");
const {
  phoneNumber,
} = require("$/functions/helpers/integrationHelpers/fail/phoneNumber");
const {
  verificationCode,
} = require("$/functions/helpers/integrationHelpers/fail/verificationCode");

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
