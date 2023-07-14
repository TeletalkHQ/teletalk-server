import { ContactItem } from "utility-store/lib/types";

import { AssertionInitializer } from "@/types";
import { oneContactAssertionInitializer } from "@/utils/assertionInitializers/oneContact";
import { FIELD_TYPE } from "@/variables";

export const contactsAssertionInitializer: AssertionInitializer = ({
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
