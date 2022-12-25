const { bioSuccessTest } = require("$/tests/integration/helpers/success/bio");
const {
  blacklistSuccessTest,
} = require("$/tests/integration/helpers/success/blacklist");
const {
  cellphoneSuccessTest,
} = require("$/tests/integration/helpers/success/cellphone");
const {
  contactsSuccessTest,
} = require("$/tests/integration/helpers/success/contacts");
const {
  fullNameSuccessTest,
} = require("$/tests/integration/helpers/success/fullName");
const {
  userIdSuccessTest,
} = require("$/tests/integration/helpers/success/userId");
const {
  usernameSuccessTest,
} = require("$/tests/integration/helpers/success/username");

const userDataSuccessTest = ({ requestValue, responseValue }) => {
  bioSuccessTest({
    requestValue: requestValue.bio,
    responseValue: responseValue.bio,
  });

  blacklistSuccessTest({
    requestValue: requestValue.blacklist,
    responseValue: responseValue.blacklist,
  });

  cellphoneSuccessTest({ requestValue, responseValue });

  contactsSuccessTest({
    requestValue: requestValue.contacts,
    responseValue: responseValue.contacts,
  });

  fullNameSuccessTest({ requestValue, responseValue });

  userIdSuccessTest({
    requestValue: requestValue.userId,
    responseValue: responseValue.userId,
  });

  usernameSuccessTest({
    requestValue: requestValue.username,
    responseValue: responseValue.username,
  });
};

module.exports = { userDataSuccessTest };
