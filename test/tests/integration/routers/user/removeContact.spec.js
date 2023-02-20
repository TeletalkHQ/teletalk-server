const {
  isDataHasEqualityWithTargetCellphone,
} = require("utility-store/src/utilities/utilities");

const { randomMaker } = require("$/classes/RandomMaker");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");

describe("removeContact successful test", () => {
  it("should remove users from contacts", async () => {
    const contactsLength = 10;
    const cellphones = await createCellphones(contactsLength);

    const currentUser = await randomMaker.user();

    const addContactRequester = requesters.addContact();
    addContactRequester.setToken(currentUser.token);
    for (const cellphone of cellphones) {
      const fullName = randomMaker.fullName();
      await addContactRequester.sendFullFeaturedRequest({
        ...cellphone,
        ...fullName,
      });
    }

    const removeContactRequester = requesters.removeContact();
    removeContactRequester.setToken(currentUser.token);
    for (const cellphone of [...cellphones]) {
      const {
        body: { removedContact },
      } = await removeContactRequester.sendFullFeaturedRequest(cellphone);

      testRemovedContact({
        testValue: removedContact,
        equalValue: cellphone,
      });

      cellphones.shift();
      await testContactsAfterRemoveOneItem(currentUser, cellphones);
    }

    await testContactsAfterRemoveAll(currentUser.user.userId);
  });
});

describe("removeContact fail tests", () => {
  const cellphone = randomMaker.unusedCellphone();
  const requester = requesters.removeContact();

  beforeAll(async () => {
    const { token } = await randomMaker.user(cellphone);
    requester.setToken(token);
  });

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(cellphone)
    .checkCurrentUserStatus(cellphone)
    .cellphone(cellphone)
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(cellphone)
    .contactItemNotExist(randomMaker.unusedCellphone());
});

const createCellphones = async (length) => {
  const users = await randomMaker.users(length);
  return users.map((i) => userUtilities.extractCellphone(i.user));
};

const testRemovedContact = ({ equalValue, testValue }) => {
  testHelper
    .createSuccessTest()
    .countryName({
      equalValue: equalValue.countryName,
      testValue: testValue.countryName,
    })
    .countryCode({
      equalValue: equalValue.countryCode,
      testValue: testValue.countryCode,
    })
    .phoneNumber({
      equalValue: equalValue.phoneNumber,
      testValue: testValue.phoneNumber,
    });
};

const testContactsAfterRemoveOneItem = async (currentUser, cellphones) => {
  const contactsAfterRemove = await findContacts(currentUser.user.userId);
  expect(contactsAfterRemove.length).toBe(cellphones.length);

  cellphones.forEach((i) => {
    const removedCellphone = contactsAfterRemove.find((j) =>
      isDataHasEqualityWithTargetCellphone(i, j)
    );

    expect(i).toEqual(userUtilities.extractCellphone(removedCellphone));
  });
};

const testContactsAfterRemoveAll = async (userId) => {
  const contactsAfterRemoveAll = await findContacts(userId);
  expect(contactsAfterRemoveAll.length).toBe(0);
};

const findContacts = async (userId) => {
  const { contacts } = await services.findOneUserById(userId);
  return contacts;
};
