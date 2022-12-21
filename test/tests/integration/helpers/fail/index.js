const { cellphone } = require("$/tests/integration/helpers/fail/cellphone");
const { selfStuff } = require("$/tests/integration/helpers/fail/selfStuff");
const {
  authentication,
} = require("$/tests/integration/helpers/fail/authentication");
const {
  blacklistItemExist,
  blacklistItemNotExist,
  contactItemExist,
  contactItemNotExist,
  targetUserNotExist,
} = require("$/tests/integration/helpers/fail/existences");
const { chatId } = require("$/tests/integration/helpers/fail/chatId");
const { countryCode } = require("$/tests/integration/helpers/fail/countryCode");
const { countryName } = require("$/tests/integration/helpers/fail/countryName");
const { firstName } = require("$/tests/integration/helpers/fail/firstName");
const {
  inputMissing,
} = require("$/tests/integration/helpers/fail/inputMissing");
const { lastName } = require("$/tests/integration/helpers/fail/lastName");
const { message } = require("$/tests/integration/helpers/fail/message");
const {
  participantId,
} = require("$/tests/integration/helpers/fail/participantId");
const { phoneNumber } = require("$/tests/integration/helpers/fail/phoneNumber");
const {
  verificationCode,
} = require("$/tests/integration/helpers/fail/verificationCode");

const failCollection = {
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
  inputMissing,
  lastName,
  message,
  participantId,
  phoneNumber,
  selfStuff,
  targetUserNotExist,
  verificationCode,
};

module.exports = { failCollection };
