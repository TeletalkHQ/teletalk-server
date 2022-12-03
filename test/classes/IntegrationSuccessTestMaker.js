const {
  integrationHelpersCollection,
} = require("$/functions/helpers/integrationHelpers/integrationCollection");

const { testVariablesManager } = require("$/classes/TestVariablesManager");

class IntegrationSuccessTestMaker {
  constructor() {
    this.defaultOptions = testVariablesManager.successTestDefaultOptions;
  }

  successTestMaker(methodName) {
    const successTestCallback = (
      { clientValue, responseValue } = {},
      options = this.defaultOptions
    ) => {
      integrationHelpersCollection.success[methodName](
        {
          clientValue,
          responseValue,
        },
        {
          ...this.defaultOptions,
          ...options,
        }
      );
      return this;
    };
    return successTestCallback;
  }

  async token({ responseValue, secret } = {}, options = this.defaultOptions) {
    await integrationHelpersCollection.success.token(
      { responseValue, secret },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  chatId = this.successTestMaker("chatId");
  countryCode = this.successTestMaker("countryCode");
  countryName = this.successTestMaker("countryName");
  firstName = this.successTestMaker("firstName");
  lastName = this.successTestMaker("lastName");
  message = this.successTestMaker("message");
  messageId = this.successTestMaker("messageId");
  participantId = this.successTestMaker("participantId");
  phoneNumber = this.successTestMaker("phoneNumber");
  privateChats = this.successTestMaker("privateChats");
  userId = this.successTestMaker("userId");
  verificationCode = this.successTestMaker("verificationCode");
}

module.exports = { IntegrationSuccessTestMaker };
