const { expect } = require("chai");

const { FIELD_TYPE } = require("@/variables/others/fieldType");
const {
  oneContactSuccessTest,
} = require("$/tests/integration/helpers/success/oneContact");

const contactsSuccessTest = ({ equalValue, testValue }) => {
  equalValue.forEach((contact) => {
    const responseContact = testValue.find((c) => c.userId === contact.userId);

    expect(responseContact).to.be.an(FIELD_TYPE.OBJECT);

    oneContactSuccessTest({
      equalValue: contact,
      testValue: responseContact,
    });
  });
};

module.exports = { contactsSuccessTest };
