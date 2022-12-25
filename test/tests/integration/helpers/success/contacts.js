const { expect } = require("chai");

const { FIELD_TYPE } = require("@/variables/others/fieldType");
const {
  oneContactSuccessTest,
} = require("$/tests/integration/helpers/success/oneContact");

const contactsSuccessTest = ({ requestValue, responseValue }) => {
  requestValue.forEach((contact) => {
    const responseContact = responseValue.contacts.find(
      (c) => c.userId === contact.userId
    );

    expect(responseContact).to.be.an(FIELD_TYPE.OBJECT);

    oneContactSuccessTest({
      requestValue: contact,
      responseValue: responseContact,
    });
  });
};

module.exports = { contactsSuccessTest };
