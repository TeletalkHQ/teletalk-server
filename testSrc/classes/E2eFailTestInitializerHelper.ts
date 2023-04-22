import { Requester } from "$/classes/Requester";

import { e2eFailTestInitializers } from "$/helpers/e2eFailTestInitializers";

type MethodName = keyof typeof e2eFailTestInitializers;

class E2eFailTestInitializerHelper {
  constructor(private requester: Requester) {}

  setRequirements(requester: Requester) {
    this.requester = requester;
    return this;
  }

  private initializer(methodName: MethodName) {
    return (data?: any) => {
      e2eFailTestInitializers[methodName](this.requester, data);
      return this;
    };
  }

  bio = this.initializer("bio");
  blacklistItemExist = this.initializer("blacklistItemExist");
  blacklistItemNotExist = this.initializer("blacklistItemNotExist");
  chatId = this.initializer("chatId");
  contactItemExist = this.initializer("contactItemExist");
  contactItemNotExist = this.initializer("contactItemNotExist");
  countryCode = this.initializer("countryCode");
  countryName = this.initializer("countryName");
  firstName = this.initializer("firstName");
  input = this.initializer("input");
  inputMissing = this.initializer("inputMissing");
  inputOverload = this.initializer("inputOverload");
  lastName = this.initializer("lastName");
  messageText = this.initializer("messageText");
  participantId = this.initializer("participantId");
  phoneNumber = this.initializer("phoneNumber");
  selfStuff = this.initializer("selfStuff");
  targetUserNotExist = this.initializer("targetUserNotExist");
  userId = this.initializer("userId");
  username = this.initializer("username");
  verificationCode = this.initializer("verificationCode");
}

const e2eFailTestInitializerHelper = (requester: Requester) =>
  new E2eFailTestInitializerHelper(requester);

export { e2eFailTestInitializerHelper, E2eFailTestInitializerHelper };
