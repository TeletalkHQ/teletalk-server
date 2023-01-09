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

const userDataSuccessTest = ({ equalValue, testValue }) => {
  bioSuccessTest({
    equalValue: equalValue.bio,
    testValue: testValue.bio,
  });

  blacklistSuccessTest({
    equalValue: equalValue.blacklist,
    testValue: testValue.blacklist,
  });

  cellphoneSuccessTest({ equalValue, testValue });

  contactsSuccessTest({
    equalValue: equalValue.contacts,
    testValue: testValue.contacts,
  });

  fullNameSuccessTest({ equalValue, testValue });

  userIdSuccessTest({
    equalValue: equalValue.userId,
    testValue: testValue.userId,
  });

  usernameSuccessTest({
    equalValue: equalValue.username,
    testValue: testValue.username,
  });
};

module.exports = { userDataSuccessTest };
