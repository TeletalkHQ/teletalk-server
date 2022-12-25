const { testVariablesManager } = require("$/classes/TestVariablesManager");

const {
  testHelperCollection,
} = require("$/tests/integration/helpers/testHelperCollection");

class SuccessTestHelper {
  constructor() {
    this.defaultOptions = testVariablesManager.successTestDefaultOptions;
  }

  #successTestMaker(methodName) {
    return (
      { requestValue, responseValue } = {},
      options = this.defaultOptions
    ) => {
      testHelperCollection.success[methodName](
        {
          requestValue,
          responseValue,
        },
        {
          ...this.defaultOptions,
          ...options,
        }
      );
      return this;
    };
  }

  async authentication(
    { requestValue, responseValue, secret } = {},
    options = this.defaultOptions
  ) {
    await testHelperCollection.success.authentication(
      { requestValue, responseValue, secret },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }

  bio = this.#successTestMaker("bio");
  blacklist = this.#successTestMaker("blacklist");
  cellphone = this.#successTestMaker("cellphone");
  chatId = this.#successTestMaker("chatId");
  contacts = this.#successTestMaker("contacts");
  countryCode = this.#successTestMaker("countryCode");
  countryName = this.#successTestMaker("countryName");
  firstName = this.#successTestMaker("firstName");
  fullName = this.#successTestMaker("fullName");
  lastName = this.#successTestMaker("lastName");
  message = this.#successTestMaker("message");
  messageId = this.#successTestMaker("messageId");
  oneContact = this.#successTestMaker("oneContact");
  participantId = this.#successTestMaker("participantId");
  phoneNumber = this.#successTestMaker("phoneNumber");
  privateChats = this.#successTestMaker("privateChats");
  userData = this.#successTestMaker("userData");
  userId = this.#successTestMaker("userId");
  username = this.#successTestMaker("username");
  verificationCode = this.#successTestMaker("verificationCode");
}

const successTestHelper = () => new SuccessTestHelper();

module.exports = {
  successTestHelper,
  SuccessTestHelper,
};
