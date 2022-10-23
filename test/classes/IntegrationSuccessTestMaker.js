const {
  integrationHelpersCollection,
} = require("$/functions/helpers/integrationHelpers/integrationCollection");

const { testVariables } = require("$/variables/testVariables");

class IntegrationSuccessTestMaker {
  constructor() {
    this.defaultOptions = testVariables.successTestDefaultOptions;
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
  countryCode = this.successTestMaker("countryCode");
  chatId = this.successTestMaker("chatId");
  chats = this.successTestMaker("chats");
  countryName = this.successTestMaker("countryName");
  firstName = this.successTestMaker("firstName");
  lastName = this.successTestMaker("lastName");
  message = this.successTestMaker("message");
  messageId = this.successTestMaker("messageId");
  participantId = this.successTestMaker("participantId");
  phoneNumber = this.successTestMaker("phoneNumber");
  userId = this.successTestMaker("userId");
  verificationCode = this.successTestMaker("verificationCode");
}

module.exports = { IntegrationSuccessTestMaker };
