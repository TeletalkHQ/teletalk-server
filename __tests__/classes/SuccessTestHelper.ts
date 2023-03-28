import { authenticationSuccessTest } from "$/helpers/success/authentication";
import { testHelperCollection } from "$/helpers/testHelperCollection";

import { SuccessTestExecuterArgs, SuccessTestExecutorOptions } from "$/types";

type MethodName = keyof typeof testHelperCollection.success;

class SuccessTestHelper {
  private successTestMaker(methodName: MethodName) {
    return (
      arg: SuccessTestExecuterArgs,
      options?: SuccessTestExecutorOptions
    ) => {
      testHelperCollection.success[methodName](arg, options);
      return this;
    };
  }

  authentication(
    {
      equalValue,
      testValue,
      secret,
    }: SuccessTestExecuterArgs & { secret: string },
    options?: SuccessTestExecutorOptions
  ) {
    authenticationSuccessTest({ equalValue, testValue, secret }, options);
    return this;
  }

  bio = this.successTestMaker("bio");
  blacklist = this.successTestMaker("blacklist");
  cellphone = this.successTestMaker("cellphone");
  chatId = this.successTestMaker("chatId");
  contacts = this.successTestMaker("contacts");
  countryCode = this.successTestMaker("countryCode");
  countryName = this.successTestMaker("countryName");
  firstName = this.successTestMaker("firstName");
  fullName = this.successTestMaker("fullName");
  lastName = this.successTestMaker("lastName");
  message = this.successTestMaker("message");
  messageId = this.successTestMaker("messageId");
  oneContact = this.successTestMaker("oneContact");
  phoneNumber = this.successTestMaker("phoneNumber");
  privateChats = this.successTestMaker("privateChats");
  userData = this.successTestMaker("userData");
  userId = this.successTestMaker("userId");
  username = this.successTestMaker("username");
  verificationCode = this.successTestMaker("verificationCode");
}

const successTestHelper = () => new SuccessTestHelper();

export { successTestHelper, SuccessTestHelper };
