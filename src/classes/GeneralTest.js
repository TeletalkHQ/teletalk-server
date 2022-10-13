const {
  countryCodeFailureTests,
  countryCodeSuccessTests,
} = require("$/api/generalTests/countryCodeTests");
const { privateIdSuccessTests } = require("$/api/generalTests/privateIdTests");
const {
  countryNameFailureTests,
  countryNameSuccessTests,
} = require("$/api/generalTests/countryNameTests");
const {
  phoneNumberFailureTests,
  phoneNumberSuccessTests,
} = require("$/api/generalTests/phoneNumberTests");
const { cellphoneFailureTests } = require("$/api/generalTests/cellphoneTests");
const {
  verificationCodeFailureTests,
} = require("$/api/generalTests/verificationCodeTests");
const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");
const {
  verificationCodeSuccessTests,
} = require("$/api/generalTests/verificationCodeTests");
const { tokenSuccessTests } = require("$/api/generalTests/tokenTests");
const {
  firstNameFailureTests,
  firstNameSuccessTests,
} = require("$/api/generalTests/firstNameTests");
const {
  lastNameFailureTests,
  lastNameSuccessTests,
} = require("$/api/generalTests/lastNameTests");
const { chatIdSuccessTests } = require("$/api/generalTests/chatIdTests");
const { messageIdSuccessTests } = require("$/api/generalTests/messageIdTests");
const {
  messageSuccessTests,
  messageFailureTests,
} = require("$/api/generalTests/messageTests");
const {
  participantIdFailureTests,
} = require("$/api/generalTests/participantIdTests");
const {
  blacklistItemNotExistFailureTests,
  contactItemNotExistFailureTests,
  contactItemExistFailureTests,
  targetUserNotExistFailureTests,
  blacklistItemExistFailureTests,
} = require("$/api/generalTests/existencesTests");
const { selfStuffFailureTests } = require("$/api/generalTests/selfStuffTests");

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
    cellphoneFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  countryCode(...args) {
    countryCodeFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  countryName(...args) {
    countryNameFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  phoneNumber(...args) {
    phoneNumberFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  verificationCode(...args) {
    verificationCodeFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  authentication(...args) {
    authenticationFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  firstName(...args) {
    firstNameFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  lastName(...args) {
    lastNameFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  participantId(...args) {
    participantIdFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  message(...args) {
    messageFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  selfStuff(...args) {
    selfStuffFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  blacklistItemNotExist(...args) {
    blacklistItemNotExistFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  blacklistItemExist(...args) {
    blacklistItemExistFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  contactItemNotExist(...args) {
    contactItemNotExistFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  contactItemExist(...args) {
    contactItemExistFailureTests(...this.#defaultArgs(), ...args);
    return this;
  }
  targetUserNotExist(...args) {
    targetUserNotExistFailureTests(...this.#defaultArgs(), ...args);
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
    phoneNumberSuccessTests(
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
    verificationCodeSuccessTests(
      { verificationCodeTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  async token({ tokenTest, secret } = {}, options = this.defaultOptions) {
    await tokenSuccessTests(
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
    countryCodeSuccessTests(
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
    countryNameSuccessTests(
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
    firstNameSuccessTests(
      { firstNameMain, firstNameTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  lastName({ lastNameMain, lastNameTest } = {}, options = this.defaultOptions) {
    lastNameSuccessTests(
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
    privateIdSuccessTests(
      { privateIdMain, privateIdTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  chatId({ chatIdMain, chatIdTest } = {}, options = this.defaultOptions) {
    chatIdSuccessTests(
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
    messageIdSuccessTests(
      { messageIdMain, messageIdTest },
      {
        ...this.defaultOptions,
        ...options,
      }
    );
    return this;
  }
  message({ messageMain, messageTest } = {}, options = this.defaultOptions) {
    messageSuccessTests(
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
