const {
  integrationHelpersCollection,
} = require("$/helpers/integrationHelpers/integrationCollection");

const { testVariables } = require("$/variables/testVariables");

class IntegrationSuccessTestMaker {
  constructor() {
    this.defaultOptions = testVariables.successTestDefaultOptions;
  }

  phoneNumber(
    { phoneNumberMain, phoneNumberTest } = {},
    options = this.defaultOptions
  ) {
    integrationHelpersCollection.success.phoneNumber(
      { phoneNumberMain, phoneNumberTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  verificationCode(
    { verificationCodeTest } = {},
    options = this.defaultOptions
  ) {
    integrationHelpersCollection.success.verificationCode(
      { verificationCodeTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  async token({ tokenTest, secret } = {}, options = this.defaultOptions) {
    await integrationHelpersCollection.success.token(
      { tokenTest, secret },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  countryCode(
    { countryCodeMain, countryCodeTest } = {},
    options = this.defaultOptions
  ) {
    integrationHelpersCollection.success.countryCode(
      { countryCodeMain, countryCodeTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  countryName(
    { countryNameMain, countryNameTest } = {},
    options = this.defaultOptions
  ) {
    integrationHelpersCollection.success.countryName(
      { countryNameMain, countryNameTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  firstName(
    { firstNameMain, firstNameTest } = {},
    options = this.defaultOptions
  ) {
    integrationHelpersCollection.success.firstName(
      { firstNameMain, firstNameTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  lastName({ lastNameMain, lastNameTest } = {}, options = this.defaultOptions) {
    integrationHelpersCollection.success.lastName(
      { lastNameMain, lastNameTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  privateId(
    { privateIdMain, privateIdTest } = {},
    options = this.defaultOptions
  ) {
    integrationHelpersCollection.success.privateId(
      { privateIdMain, privateIdTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  chatId({ chatIdMain, chatIdTest } = {}, options = this.defaultOptions) {
    integrationHelpersCollection.success.chatId(
      { chatIdMain, chatIdTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  messageId(
    { messageIdMain, messageIdTest } = {},
    options = this.defaultOptions
  ) {
    integrationHelpersCollection.success.messageId(
      { messageIdMain, messageIdTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  participantId(
    { participantIdMain, participantIdTest } = {},
    options = this.defaultOptions
  ) {
    integrationHelpersCollection.success.participantId(
      { participantIdMain, participantIdTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }

  message({ messageMain, messageTest } = {}, options = this.defaultOptions) {
    integrationHelpersCollection.success.message(
      { messageMain, messageTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  chats({ chatsMain, chatsTest } = {}, options = this.defaultOptions) {
    integrationHelpersCollection.success.chats(
      { chatsMain, chatsTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
}

module.exports = { IntegrationSuccessTestMaker };
