import { FIELD_TYPE } from "@/variables/others/fieldType";
import { oneContactSuccessTest } from "$/tests/integration/helpers/success/oneContact";

const contactsSuccessTest = ({ equalValue, testValue }) => {
  equalValue.forEach((contact) => {
    const responseContact = testValue.find((c) => c.userId === contact.userId);

    expect(responseContact).toBeInstanceOf(FIELD_TYPE.OBJECT);

    oneContactSuccessTest({
      equalValue: contact,
      testValue: responseContact,
    });
  });
};

export { contactsSuccessTest };
