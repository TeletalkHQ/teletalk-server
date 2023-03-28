import { expect } from "chai";

import { oneContactSuccessTest } from "$/helpers/success/oneContact";

import { SuccessTestExecutor } from "$/types";

import { FIELD_TYPE } from "$/variables/fieldType";
import { Contact } from "@/types";

const contactsSuccessTest: SuccessTestExecutor = ({
  equalValue,
  testValue,
}) => {
  equalValue.forEach((contact: Contact) => {
    const responseContact = testValue.find(
      (c: Contact) => c.userId === contact.userId
    );

    expect(responseContact).to.be.an(FIELD_TYPE.OBJECT);

    oneContactSuccessTest({
      equalValue: contact,
      testValue: responseContact,
    });
  });
};

export { contactsSuccessTest };
