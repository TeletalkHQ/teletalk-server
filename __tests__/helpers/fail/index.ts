import { authenticationFailTest } from "$/helpers/fail/authentication";
import { bioFailTest } from "$/helpers/fail/bio";
import { cellphoneFailTest } from "$/helpers/fail/cellphone";
import { chatIdFailTest } from "$/helpers/fail/chatId";
import { checkCurrentUserStatusFailTest } from "$/helpers/fail/checkCurrentUserStatus";
import { countryCodeFailTest } from "$/helpers/fail/countryCode";
import { countryNameFailTest } from "$/helpers/fail/countryName";
import {
  blacklistItemExistFailTest,
  blacklistItemNotExistFailTest,
  contactItemExistFailTest,
  contactItemNotExistFailTest,
  targetUserNotExistFailTest,
} from "$/helpers/fail/existences";
import { firstNameFailTest } from "$/helpers/fail/firstName";
import { inputFailTest } from "$/helpers/fail/input";
import { inputMissingFailTest } from "$/helpers/fail/inputMissing";
import { inputOverloadFailTest } from "$/helpers/fail/inputOverload";
import { lastNameFailTest } from "$/helpers/fail/lastName";
import { messageTextFailTest } from "$/helpers/fail/messageText";
import { participantIdFailTest } from "$/helpers/fail/participantId";
import { phoneNumberFailTest } from "$/helpers/fail/phoneNumber";
import { selfStuffFailTest } from "$/helpers/fail/selfStuff";
import { userIdFailTest } from "$/helpers/fail/userId";
import { usernameFailTest } from "$/helpers/fail/username";
import { verificationCodeFailTest } from "$/helpers/fail/verificationCode";

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
  messageText: messageTextFailTest,
  participantId: participantIdFailTest,
  phoneNumber: phoneNumberFailTest,
  selfStuff: selfStuffFailTest,
  targetUserNotExist: targetUserNotExistFailTest,
  userId: userIdFailTest,
  username: usernameFailTest,
  verificationCode: verificationCodeFailTest,
};

export { failCollection };
