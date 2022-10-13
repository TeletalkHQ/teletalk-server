const {
  integrationHelpers,
} = require("$/helpers/integrationHelpers/integration");

const { testVariables } = require("$/variables/testVariables");

class GeneralFailTestMaker {
  constructor(requester) {
    this.requester = requester;
  }

  #defaultArgs() {
    return [this.requester];
  }

  setRequirements(requester) {
    this.requester = requester;
    return this;
  }

  cellphone(...args) {
    integrationHelpers.cellphoneFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  countryCode(...args) {
    integrationHelpers.countryCodeFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  countryName(...args) {
    integrationHelpers.countryNameFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  phoneNumber(...args) {
    integrationHelpers.phoneNumberFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  verificationCode(...args) {
    integrationHelpers.verificationCodeFailureTests(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  authentication(...args) {
    integrationHelpers.authenticationFailureTests(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  firstName(...args) {
    integrationHelpers.firstNameFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  lastName(...args) {
    integrationHelpers.lastNameFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  participantId(...args) {
    integrationHelpers.participantIdFailureTests(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  message(...args) {
    integrationHelpers.messageFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  selfStuff(...args) {
    integrationHelpers.selfStuffFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  blacklistItemNotExist(...args) {
    integrationHelpers.blacklistItemNotExistFailureTests(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  blacklistItemExist(...args) {
    integrationHelpers.blacklistItemExistFailureTests(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  contactItemNotExist(...args) {
    integrationHelpers.contactItemNotExistFailureTests(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  contactItemExist(...args) {
    integrationHelpers.contactItemExistFailureTests(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  targetUserNotExist(...args) {
    integrationHelpers.targetUserNotExistFailureTests(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
}

class GeneralSuccessTestMaker {
  constructor() {
    this.defaultOptions = testVariables.successTestDefaultOptions;
  }

  phoneNumber(
    { phoneNumberMain, phoneNumberTest } = {},
    options = this.defaultOptions
  ) {
    integrationHelpers.phoneNumberSuccessTests(
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
    integrationHelpers.verificationCodeSuccessTests(
      { verificationCodeTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  async token({ tokenTest, secret } = {}, options = this.defaultOptions) {
    await integrationHelpers.tokenSuccessTests(
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
    integrationHelpers.countryCodeSuccessTests(
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
    integrationHelpers.countryNameSuccessTests(
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
    integrationHelpers.firstNameSuccessTests(
      { firstNameMain, firstNameTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  lastName({ lastNameMain, lastNameTest } = {}, options = this.defaultOptions) {
    integrationHelpers.lastNameSuccessTests(
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
    integrationHelpers.privateIdSuccessTests(
      { privateIdMain, privateIdTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  chatId({ chatIdMain, chatIdTest } = {}, options = this.defaultOptions) {
    integrationHelpers.chatIdSuccessTests(
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
    integrationHelpers.messageIdSuccessTests(
      { messageIdMain, messageIdTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  message({ messageMain, messageTest } = {}, options = this.defaultOptions) {
    integrationHelpers.messageSuccessTests(
      { messageMain, messageTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
}

const generalTest = {
  createFailTest: (...args) => new GeneralFailTestMaker(...args),
  createSuccessTest: (...args) => new GeneralSuccessTestMaker(...args),
};

module.exports = {
  GeneralFailTestMaker,
  GeneralSuccessTestMaker,
  generalTest,
};
