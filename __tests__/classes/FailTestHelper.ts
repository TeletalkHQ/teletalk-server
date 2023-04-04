import { Requester } from "$/classes/Requester";

import { testHelperCollection } from "$/helpers/testHelperCollection";

type MethodName = keyof typeof testHelperCollection.fail;

class FailTestHelper {
  constructor(private requester: Requester) {}

  setRequirements(requester: Requester) {
    this.requester = requester;
    return this;
  }

  private failTestMaker(methodName: MethodName) {
    return (data?: any) => {
      testHelperCollection.fail[methodName](this.requester, data);
      return this;
    };
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
  message = this.failTestMaker("messageText");
  participantId = this.failTestMaker("participantId");
  phoneNumber = this.failTestMaker("phoneNumber");
  selfStuff = this.failTestMaker("selfStuff");
  targetUserNotExist = this.failTestMaker("targetUserNotExist");
  userId = this.failTestMaker("userId");
  username = this.failTestMaker("username");
  verificationCode = this.failTestMaker("verificationCode");
}

const failTestHelper = (requester: Requester) => new FailTestHelper(requester);

export { failTestHelper, FailTestHelper };
