import { testHelperCollection } from "$/tests/integration/helpers/testHelperCollection";

class FailTestHelper {
  constructor(requester) {
    this.requester = requester;
  }

  failTestMaker(methodName) {
    return (...args) => {
      testHelperCollection.fail[methodName](...this.#defaultArgs(), ...args);
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
  bio = this.failTestMaker("bio");
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
  input = this.failTestMaker("input");
  inputMissing = this.failTestMaker("inputMissing");
  inputOverload = this.failTestMaker("inputOverload");
  lastName = this.failTestMaker("lastName");
  message = this.failTestMaker("message");
  participantId = this.failTestMaker("participantId");
  phoneNumber = this.failTestMaker("phoneNumber");
  selfStuff = this.failTestMaker("selfStuff");
  targetUserNotExist = this.failTestMaker("targetUserNotExist");
  userId = this.failTestMaker("userId");
  username = this.failTestMaker("username");
  verificationCode = this.failTestMaker("verificationCode");
}

const failTestHelper = (...args) => new FailTestHelper(...args);

export { failTestHelper, FailTestHelper };
