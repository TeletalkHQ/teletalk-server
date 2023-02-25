import { bioSuccessTest } from "$/tests/integration/helpers/success/bio";
import { blacklistSuccessTest } from "$/tests/integration/helpers/success/blacklist";
import { cellphoneSuccessTest } from "$/tests/integration/helpers/success/cellphone";
import { contactsSuccessTest } from "$/tests/integration/helpers/success/contacts";
import { fullNameSuccessTest } from "$/tests/integration/helpers/success/fullName";
import { userIdSuccessTest } from "$/tests/integration/helpers/success/userId";
import { usernameSuccessTest } from "$/tests/integration/helpers/success/username";

const userDataSuccessTest = ({ equalValue, testValue }) => {
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
