import { authenticationE2eFailTestInitializer } from "./authentication";
import { bioE2eFailTestInitializer } from "./bio";
import { cellphoneE2eFailTestInitializer } from "./cellphone";
import { chatIdE2eFailTestInitializer } from "./chatId";
import { checkCurrentUserStatusE2eFailTestInitializer } from "./checkCurrentUserStatus";
import { countryCodeE2eFailTestInitializer } from "./countryCode";
import { countryNameE2eFailTestInitializer } from "./countryName";
import {
  blacklistItemExistE2eFailTestInitializer,
  blacklistItemNotExistE2eFailTestInitializer,
  contactItemExistE2eFailTestInitializer,
  contactItemNotExistE2eFailTestInitializer,
  targetUserNotExistE2eFailTestInitializer,
} from "./existences";
import { firstNameE2eFailTestInitializer } from "./firstName";
import { inputE2eFailTestInitializer } from "./input";
import { inputMissingE2eFailTestInitializer } from "./inputMissing";
import { inputOverloadE2eFailTestInitializer } from "./inputOverload";
import { lastNameE2eFailTestInitializer } from "./lastName";
import { messageTextE2eFailTestInitializer } from "./messageText";
import { participantIdE2eFailTestInitializer } from "./participantId";
import { phoneNumberE2eFailTestInitializer } from "./phoneNumber";
import { selfStuffE2eFailTestInitializer } from "./selfStuff";
import { userIdE2eFailTestInitializer } from "./userId";
import { usernameE2eFailTestInitializer } from "./username";
import { verificationCodeE2eFailTestInitializer } from "./verificationCode";

const e2eFailTestInitializers = {
  authentication: authenticationE2eFailTestInitializer,
  bio: bioE2eFailTestInitializer,
  blacklistItemExist: blacklistItemExistE2eFailTestInitializer,
  blacklistItemNotExist: blacklistItemNotExistE2eFailTestInitializer,
  cellphone: cellphoneE2eFailTestInitializer,
  chatId: chatIdE2eFailTestInitializer,
  checkCurrentUserStatus: checkCurrentUserStatusE2eFailTestInitializer,
  contactItemExist: contactItemExistE2eFailTestInitializer,
  contactItemNotExist: contactItemNotExistE2eFailTestInitializer,
  countryCode: countryCodeE2eFailTestInitializer,
  countryName: countryNameE2eFailTestInitializer,
  firstName: firstNameE2eFailTestInitializer,
  input: inputE2eFailTestInitializer,
  inputMissing: inputMissingE2eFailTestInitializer,
  inputOverload: inputOverloadE2eFailTestInitializer,
  lastName: lastNameE2eFailTestInitializer,
  messageText: messageTextE2eFailTestInitializer,
  participantId: participantIdE2eFailTestInitializer,
  phoneNumber: phoneNumberE2eFailTestInitializer,
  selfStuff: selfStuffE2eFailTestInitializer,
  targetUserNotExist: targetUserNotExistE2eFailTestInitializer,
  userId: userIdE2eFailTestInitializer,
  username: usernameE2eFailTestInitializer,
  verificationCode: verificationCodeE2eFailTestInitializer,
};

export { e2eFailTestInitializers };
