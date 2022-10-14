const {
  integrationHelpersCollection,
} = require("$/functions/helpers/integrationHelpers/integrationCollection");

class IntegrationFailTestMaker {
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
    integrationHelpersCollection.fail.cellphone(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  chatId(...args) {
    integrationHelpersCollection.fail.chatId(...this.#defaultArgs(), ...args);
    return this;
  }
  countryCode(...args) {
    integrationHelpersCollection.fail.countryCode(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  countryName(...args) {
    integrationHelpersCollection.fail.countryName(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  phoneNumber(...args) {
    integrationHelpersCollection.fail.phoneNumber(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  verificationCode(...args) {
    integrationHelpersCollection.fail.verificationCode(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  authentication(...args) {
    integrationHelpersCollection.fail.authentication(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  firstName(...args) {
    integrationHelpersCollection.fail.firstName(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  lastName(...args) {
    integrationHelpersCollection.fail.lastName(...this.#defaultArgs(), ...args);
    return this;
  }
  participantId(...args) {
    integrationHelpersCollection.fail.participantId(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  message(...args) {
    integrationHelpersCollection.fail.message(...this.#defaultArgs(), ...args);
    return this;
  }
  selfStuff(...args) {
    integrationHelpersCollection.fail.selfStuff(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  blacklistItemNotExist(...args) {
    integrationHelpersCollection.fail.blacklistItemNotExist(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  blacklistItemExist(...args) {
    integrationHelpersCollection.fail.blacklistItemExist(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  contactItemNotExist(...args) {
    integrationHelpersCollection.fail.contactItemNotExist(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  contactItemExist(...args) {
    integrationHelpersCollection.fail.contactItemExist(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
  targetUserNotExist(...args) {
    integrationHelpersCollection.fail.targetUserNotExist(
      ...this.#defaultArgs(),
      ...args
    );
    return this;
  }
}

module.exports = { IntegrationFailTestMaker };
