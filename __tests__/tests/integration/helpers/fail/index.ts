import { cellphoneFailTest } from "$/tests/integration/helpers/fail/cellphone";
import { selfStuffFailTest } from "$/tests/integration/helpers/fail/selfStuff";
import { authenticationFailTest } from "$/tests/integration/helpers/fail/authentication";
import {
  blacklistItemExistFailTest,
  blacklistItemNotExistFailTest,
  contactItemExistFailTest,
  contactItemNotExistFailTest,
  targetUserNotExistFailTest,
} from "$/tests/integration/helpers/fail/existences";
import { chatIdFailTest } from "$/tests/integration/helpers/fail/chatId";
import { checkCurrentUserStatusFailTest } from "$/tests/integration/helpers/fail/checkCurrentUserStatus";
import { countryCodeFailTest } from "$/tests/integration/helpers/fail/countryCode";
import { countryNameFailTest } from "$/tests/integration/helpers/fail/countryName";
import { firstNameFailTest } from "$/tests/integration/helpers/fail/firstName";
import { inputMissingFailTest } from "$/tests/integration/helpers/fail/inputMissing";
import { inputOverloadFailTest } from "$/tests/integration/helpers/fail/inputOverload";
import { inputFailTest } from "$/tests/integration/helpers/fail/input";
import { lastNameFailTest } from "$/tests/integration/helpers/fail/lastName";
import { messageFailTest } from "$/tests/integration/helpers/fail/message";
import { participantIdFailTest } from "$/tests/integration/helpers/fail/participantId";
import { phoneNumberFailTest } from "$/tests/integration/helpers/fail/phoneNumber";
import { userIdFailTest } from "$/tests/integration/helpers/fail/userId";
import { verificationCodeFailTest } from "$/tests/integration/helpers/fail/verificationCode";
import { bioFailTest } from "$/tests/integration/helpers/fail/bio";
import { usernameFailTest } from "$/tests/integration/helpers/fail/username";

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
