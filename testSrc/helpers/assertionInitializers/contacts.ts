import { ContactItem } from "utility-store/lib/types";

import { oneContactAssertionInitializer } from "@/helpers/assertionInitializers/oneContact";
import { AssertionInitializer } from "@/types";
import { FIELD_TYPE } from "@/variables";

const contactsAssertionInitializer: AssertionInitializer = ({
  equalValue,
  testValue,
}) => {
  equalValue.forEach((contact: ContactItem) => {
    const responseContact = testValue.find(
      (c: ContactItem) => c.userId === contact.userId
    );

    expect(responseContact).toBe(FIELD_TYPE.OBJECT);

    oneContactAssertionInitializer({
      equalValue: contact,
      testValue: responseContact,
    });
  });
};

export { contactsAssertionInitializer };
