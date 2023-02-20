const {
  isDataHasEqualityWithTargetCellphone,
} = require("utility-store/src/utilities/utilities");

const { randomMaker } = require("$/classes/RandomMaker");
const { userUtilities } = require("@/classes/UserUtilities");

const { helpers } = require("$/helpers");

const { services } = require("@/services");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");

const { FIELD_TYPE } = require("@/variables/others/fieldType");

describe("getContacts success tests", () => {
  it("", async () => {
    const currentUser = await randomMaker.user();

    const contactsLength = 10;
    const users = await randomMaker.users(contactsLength);
    const contacts = users.map((i) => userUtilities.extractContact(i.user));

    const addContactRequester = requesters.addContact();
    addContactRequester.setToken(currentUser.token);

    for (const { userId, ...contact } of contacts) {
      await addContactRequester.sendFullFeaturedRequest(contact);
    }

    const contactsFromDb = await services
      .getUserContacts()
      .run({ currentUserId: currentUser.user.userId });
    testContacts(contacts, contactsFromDb);

    const getContactsRequester = requesters.getContacts();
    getContactsRequester.setToken(currentUser.token);
    const {
      body: { contacts: contactsFromApi },
    } = await getContactsRequester.sendFullFeaturedRequest();
    testContacts(contacts, contactsFromApi);
  });
});

describe("getContacts fail tests", () => {
  const requester = requesters.getContacts();
  helpers.configureFailTestRequester(requester);

  testHelper
    .createFailTest(requester)
    .authentication()
    .checkCurrentUserStatus();
});

const testContacts = (equalValue, testValue) => {
  expect(testValue).toBeInstanceOf(FIELD_TYPE.ARRAY);
  expect(testValue.length).toBe(equalValue.length);

  equalValue.forEach((i) => {
    const savedContact = testValue.find((j) =>
      isDataHasEqualityWithTargetCellphone(i, j)
    );
    testOneContact(i, savedContact);
  });
};

const testOneContact = (testValue, equalValue) => {
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
