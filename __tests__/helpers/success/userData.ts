import { bioSuccessTest } from "$/helpers/success/bio";
import { blacklistSuccessTest } from "$/helpers/success/blacklist";
import { cellphoneSuccessTest } from "$/helpers/success/cellphone";
import { contactsSuccessTest } from "$/helpers/success/contacts";
import { fullNameSuccessTest } from "$/helpers/success/fullName";
import { userIdSuccessTest } from "$/helpers/success/userId";
import { usernameSuccessTest } from "$/helpers/success/username";

import { SuccessTestExecutor } from "$/types";

const userDataSuccessTest: SuccessTestExecutor = ({
  equalValue,
  testValue,
}) => {
  bioSuccessTest({
    equalValue: equalValue.bio,
    testValue: testValue.bio,
  });

  blacklistSuccessTest({
    equalValue: equalValue.blacklist,
    testValue: testValue.blacklist,
  });

  cellphoneSuccessTest({ equalValue, testValue });

  contactsSuccessTest({
    equalValue: equalValue.contacts,
    testValue: testValue.contacts,
  });

  fullNameSuccessTest({ equalValue, testValue });

  userIdSuccessTest({
    equalValue: equalValue.userId,
    testValue: testValue.userId,
  });

  usernameSuccessTest({
    equalValue: equalValue.username,
    testValue: testValue.username,
  });
};

export { userDataSuccessTest };
