const {
  integrationHelpersCollection,
} = require("$/tests/integration/helpers/integrationCollection");

class IntegrationFailTestBuilder {
  constructor(requester) {
    this.requester = requester;
  }

  failTestMaker(methodName) {
    return (...args) => {
      integrationHelpersCollection.fail[methodName](
        ...this.#defaultArgs(),
        ...args
      );
      return this;
    };
  }

  #defaultArgs() {
    return [this.requester];
  }

  setRequirements(requester) {
    this.requester = requester;
    return this;
  }

  authentication = this.failTestMaker("authentication");
  blacklistItemExist = this.failTestMaker("blacklistItemExist");
  blacklistItemNotExist = this.failTestMaker("blacklistItemNotExist");
  cellphone = this.failTestMaker("cellphone");
  chatId = this.failTestMaker("chatId");
  checkCurrentUserStatus = this.failTestMaker("checkCurrentUserStatus");
  contactItemExist = this.failTestMaker("contactItemExist");
  contactItemNotExist = this.failTestMaker("contactItemNotExist");
  countryCode = this.failTestMaker("countryCode");
  countryName = this.failTestMaker("countryName");
  firstName = this.failTestMaker("firstName");
  inputMissing = this.failTestMaker("inputMissing");
  lastName = this.failTestMaker("lastName");
  message = this.failTestMaker("message");
  participantId = this.failTestMaker("participantId");
  phoneNumber = this.failTestMaker("phoneNumber");
  selfStuff = this.failTestMaker("selfStuff");
  targetUserNotExist = this.failTestMaker("targetUserNotExist");
  verificationCode = this.failTestMaker("verificationCode");
}

const integrationFailTestBuilder = (...args) =>
  new IntegrationFailTestBuilder(...args);

module.exports = {
  integrationFailTestBuilder,
  IntegrationFailTestBuilder,
};
