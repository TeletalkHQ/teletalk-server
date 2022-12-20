const {
  integrationHelpersCollection,
} = require("$/functions/helpers/integrationHelpers/integrationCollection");

const { testVariablesManager } = require("$/classes/TestVariablesManager");

class IntegrationSuccessTestBuilder {
  constructor() {
    this.defaultOptions = testVariablesManager.successTestDefaultOptions;
  }

  successTestMaker(methodName) {
    return (
      { requestValue, responseValue } = {},
      options = this.defaultOptions
    ) => {
      integrationHelpersCollection.success[methodName](
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

const integrationSuccessTestBuilder = () => new IntegrationSuccessTestBuilder();

module.exports = {
  integrationSuccessTestBuilder,
  IntegrationSuccessTestBuilder,
};
