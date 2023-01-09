const { expect } = require("chai");

const { randomMaker } = require("$/classes/RandomMaker");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");

const { FIELD_TYPE } = require("@/variables/others/fieldType");

describe("add contact success tests", () => {
  it("should add users to contacts", async () => {
    const currentUser = await randomMaker.user();

    const addContactRequester = requesters.addContact();

    const contactsLength = 10;
    for (let i = 0; i < contactsLength; i++) {
      const targetUser = await randomMaker.user();
      expect(targetUser.user.contacts).to.be.an(FIELD_TYPE.ARRAY).and.to.be
        .empty;

      addContactRequester.setToken(currentUser.token);

      const targetUserCellphone = userUtilities.extractCellphone(
        targetUser.user
      );
      const fullName = randomMaker.fullName();
      const data = { ...targetUserCellphone, ...fullName };

      const {
        body: { addedContact },
      } = await addContactRequester.sendFullFeaturedRequest(data);

      await testAddContactResponse({
        addedContact,
        currentUser,
        sentData: data,
        targetUser,
      });
    }

    const { contacts } = await services.findOneUserById(
      currentUser.user.userId
    );

    expect(contacts).to.be.an(FIELD_TYPE.ARRAY);
    expect(contacts.length).to.be.equal(contactsLength);
  });
});

describe("addContact fail tests", () => {
  const requester = requesters.addContact();

  const currentUserSignData = randomMaker.contact();
  const targetUserSignData = randomMaker.contact();
  const data = {
    addedContact: targetUserSignData,
    selfStuffData: currentUserSignData,
  };

  before(async () => {
    const { token } = await randomMaker.user(
      userUtilities.extractCellphone(currentUserSignData)
    );
    requester.setToken(token);

    const targetUser = await randomMaker.user(
      userUtilities.extractCellphone(targetUserSignData)
    );
    const contact = userUtilities.extractContact(targetUser.user);
    await requester.sendFullFeaturedRequest(contact);
  });

  const contact = randomMaker.contact();

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(contact)
    .checkCurrentUserStatus(contact)
    .cellphone(contact)
    .countryCode(contact)
    .countryName(contact)
    .phoneNumber(contact)
    .firstName(contact)
    .lastName(contact)
    .selfStuff(data.selfStuffData)
    .contactItemExist(data.addedContact)
    .targetUserNotExist(randomMaker.unusedContact());
});

const testAddContactResponse = async ({
  addedContact,
  sentData,
  currentUser,
  targetUser,
}) => {
  await testTargetUserContacts(targetUser.user.userId);

  const savedContact = await findSavedContact(currentUser, addedContact);
  testContactItem(addedContact, savedContact);
  testContactItem(addedContact, {
    ...sentData,
    userId: targetUser.user.userId,
  });
};

const findContacts = async (userId) => {
  const { contacts } = await services.findOneUserById(userId);
  return contacts;
};

const testTargetUserContacts = async (targetUserId) => {
  const targetUserContacts = await findContacts(targetUserId);
  expect(targetUserContacts).an(FIELD_TYPE.ARRAY).and.to.be.empty;
};

const findSavedContact = async (currentUser, addedContact) => {
  const contacts = await findContacts(currentUser.user.userId);
  const { item } = userUtilities.findByCellphone(contacts, addedContact);
  return item;
};

const testContactItem = (testValue, equalValue) => {
  testHelper
    .createSuccessTest()
    .userId({
      equalValue: equalValue.userId,
      testValue: testValue.userId,
    })
    .countryCode({
      equalValue: equalValue.countryCode,
      testValue: testValue.countryCode,
    })
    .countryName({
      equalValue: equalValue.countryName,
      testValue: testValue.countryName,
    })
    .phoneNumber({
      equalValue: equalValue.phoneNumber,
      testValue: testValue.phoneNumber,
    })
    .lastName({
      equalValue: equalValue.lastName,
      testValue: testValue.lastName,
    })
    .firstName({
      equalValue: equalValue.firstName,
      testValue: testValue.firstName,
    });
};
