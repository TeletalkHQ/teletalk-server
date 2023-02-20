const {
  isDataHasEqualityWithTargetCellphone,
} = require("utility-store/src/utilities/utilities");

const { randomMaker } = require("$/classes/RandomMaker");
const { userUtilities } = require("@/classes/UserUtilities");

const { helpers } = require("$/helpers");

const { services } = require("@/services");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");

describe("edit contact success tests", () => {
  it("should edit users in contacts", async () => {
    const currentUser = await randomMaker.user();

    const contactsLength = 10;
    const contacts = await createContacts(contactsLength);

    const addContactRequester = requesters.addContact();
    addContactRequester.setToken(currentUser.token);
    for (const { userId, ...contact } of contacts) {
      await addContactRequester.sendFullFeaturedRequest(contact);
    }

    const editContactRequester = requesters.editContact();
    editContactRequester.setToken(currentUser.token);
    for (const contact of contacts) {
      const fullName = randomMaker.fullName();
      const { userId, ...data } = { ...contact, ...fullName };
      const {
        body: { editedContact },
      } = await editContactRequester.sendFullFeaturedRequest(data);

      testContact(data, editedContact);

      contact.firstName = data.firstName;
      contact.lastName = data.lastName;

      const { contacts: currentUserContacts } = await services.findOneUserById(
        currentUser.user.userId
      );
      const foundEditedContact = currentUserContacts.find((i) =>
        isDataHasEqualityWithTargetCellphone(i, data)
      );
      testContact(data, foundEditedContact);

      testContacts(data, contacts, currentUserContacts);
    }
  });
});

describe("editContact fail tests", () => {
  const contact = randomMaker.unusedContact();
  const currentUserSignData = randomMaker.unusedCellphone();

  const requester = requesters.editContact();
  helpers.configureFailTestRequester(requester);
  beforeAll(async () => {
    const { token } = await randomMaker.user(currentUserSignData);
    requester.setToken(token);
  });

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
    .selfStuff({
      ...currentUserSignData,
      ...randomMaker.fullName(),
    })
    .contactItemNotExist(contact);
});

const createContacts = async (length) => {
  const users = await randomMaker.users(length);
  return users.map((i) => userUtilities.extractContact(i.user));
};

const testContact = (equalValue, testValue) => {
  testHelper
    .createSuccessTest()
    .firstName({
      equalValue: equalValue.firstName,
      testValue: testValue.firstName,
    })
    .lastName({
      equalValue: equalValue.lastName,
      testValue: testValue.lastName,
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
    });
};

const testContacts = (data, contacts, currentUserContacts) => {
  const filterEditedContacts = contacts.filter(
    (i) => !isDataHasEqualityWithTargetCellphone(i, data)
  );
  const filterEditedCurrentUserContacts = currentUserContacts.filter(
    (i) => !isDataHasEqualityWithTargetCellphone(i, data)
  );

  expect(filterEditedCurrentUserContacts.length).toBe(
    filterEditedContacts.length
  );

  filterEditedContacts.forEach((i) => {
    const j = filterEditedCurrentUserContacts.find((m) =>
      isDataHasEqualityWithTargetCellphone(m, i)
    );

    testContact(i, j);
  });
};
