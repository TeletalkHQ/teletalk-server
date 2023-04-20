import { assertionInitializers } from "$/helpers/assertionInitializers";
import { authenticationAssertion } from "$/helpers/assertionInitializers/authentication";

import { AssertionInitializerArgs, AssertionInitializerOptions } from "$/types";

type MethodName = keyof typeof assertionInitializers;

class AssertionInitializerHelper {
  private initializer(methodName: MethodName) {
    return (
      arg: AssertionInitializerArgs,
      options?: AssertionInitializerOptions
    ) => {
      assertionInitializers[methodName](arg, options);
      return this;
    };
  }

  authentication(
    {
      equalValue,
      testValue,
      secret,
    }: AssertionInitializerArgs & { secret: string },
    options?: AssertionInitializerOptions
  ) {
    authenticationAssertion({ equalValue, testValue, secret }, options);
    return this;
  }

  bio = this.initializer("bio");
  blacklist = this.initializer("blacklist");
  cellphone = this.initializer("cellphone");
  chatId = this.initializer("chatId");
  contacts = this.initializer("contacts");
  countryCode = this.initializer("countryCode");
  countryName = this.initializer("countryName");
  firstName = this.initializer("firstName");
  fullName = this.initializer("fullName");
  lastName = this.initializer("lastName");
  messageText = this.initializer("messageText");
  messageId = this.initializer("messageId");
  oneContact = this.initializer("oneContact");
  phoneNumber = this.initializer("phoneNumber");
  privateChats = this.initializer("privateChats");
  userData = this.initializer("userData");
  userId = this.initializer("userId");
  username = this.initializer("username");
  verificationCode = this.initializer("verificationCode");
}

const assertionInitializerHelper = () => new AssertionInitializerHelper();

export { assertionInitializerHelper, AssertionInitializerHelper };
