import { cellphoneFailTest } from "$/helpers/fail/cellphone";
import { selfStuffFailTest } from "$/helpers/fail/selfStuff";
import { authenticationFailTest } from "$/helpers/fail/authentication";
import {
  blacklistItemExistFailTest,
  blacklistItemNotExistFailTest,
  contactItemExistFailTest,
  contactItemNotExistFailTest,
  targetUserNotExistFailTest,
} from "$/helpers/fail/existences";
import { chatIdFailTest } from "$/helpers/fail/chatId";
import { checkCurrentUserStatusFailTest } from "$/helpers/fail/checkCurrentUserStatus";
import { countryCodeFailTest } from "$/helpers/fail/countryCode";
import { countryNameFailTest } from "$/helpers/fail/countryName";
import { firstNameFailTest } from "$/helpers/fail/firstName";
import { inputMissingFailTest } from "$/helpers/fail/inputMissing";
import { inputOverloadFailTest } from "$/helpers/fail/inputOverload";
import { inputFailTest } from "$/helpers/fail/input";
import { lastNameFailTest } from "$/helpers/fail/lastName";
import { messageFailTest } from "$/helpers/fail/message";
import { participantIdFailTest } from "$/helpers/fail/participantId";
import { phoneNumberFailTest } from "$/helpers/fail/phoneNumber";
import { userIdFailTest } from "$/helpers/fail/userId";
import { verificationCodeFailTest } from "$/helpers/fail/verificationCode";
import { bioFailTest } from "$/helpers/fail/bio";
import { usernameFailTest } from "$/helpers/fail/username";

const failCollection = {
  authentication: authenticationFailTest,
  bio: bioFailTest,
  blacklistItemExist: blacklistItemExistFailTest,
  blacklistItemNotExist: blacklistItemNotExistFailTest,
  cellphone: cellphoneFailTest,
  chatId: chatIdFailTest,
  checkCurrentUserStatus: checkCurrentUserStatusFailTest,
  contactItemExist: contactItemExistFailTest,
  contactItemNotExist: contactItemNotExistFailTest,
  countryCode: countryCodeFailTest,
  countryName: countryNameFailTest,
  firstName: firstNameFailTest,
  input: inputFailTest,
  inputMissing: inputMissingFailTest,
  inputOverload: inputOverloadFailTest,
  lastName: lastNameFailTest,
  message: messageFailTest,
  participantId: participantIdFailTest,
  phoneNumber: phoneNumberFailTest,
  selfStuff: selfStuffFailTest,
  targetUserNotExist: targetUserNotExistFailTest,
  userId: userIdFailTest,
  username: usernameFailTest,
  verificationCode: verificationCodeFailTest,
};

export { failCollection };
