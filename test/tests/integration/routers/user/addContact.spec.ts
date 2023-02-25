import { randomMaker } from "$/classes/RandomMaker";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { testHelper } from "$/tests/integration/helpers/testHelper";

import { requesters } from "$/utilities";

import { FIELD_TYPE } from "@/variables/others/fieldType";

describe("add contact success tests", () => {
  it("should add users to contacts", async () => {
    const currentUser = await randomMaker.user();

    const addContactRequester = requesters.addContact();
    addContactRequester.setToken(currentUser.token);

    const contactsLength = 100;
    const users = [];
    for (let i = 0; i < contactsLength; i++) {
      const targetUser = await randomMaker.user();
      users.push(targetUser);
    }

    const responses = [];
    for (const targetUser of users) {
      const targetUserCellphone = userUtilities.extractCellphone(
        targetUser.user
      );
      const fullName = randomMaker.fullName();
      const data = { ...targetUserCellphone, ...fullName };

      const response = addContactRequester.sendFullFeaturedRequest(data);

      responses.push({
        data,
        res: response,
        targetUser,
      });
    }

    for (const { data, res, targetUser } of responses) {
      const {
        body: { addedContact },
      } = await res;

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

    expect(contacts).toBeInstanceOf(FIELD_TYPE.ARRAY);
    expect(contacts.length).toBe(contactsLength);
  });
});

describe("addContact fail tests", () => {
  const requester = requesters.addContact();

  const currentUserSignData = randomMaker.unusedCellphone();
  const targetUserSignData = randomMaker.unusedCellphone();
  const data = {
    addedContact: {
      ...targetUserSignData,
      ...randomMaker.fullName(),
    },
    selfStuffData: { ...currentUserSignData, ...randomMaker.fullName() },
  };

  beforeAll(async () => {
    const { token } = await randomMaker.user(currentUserSignData);
    requester.setToken(token);

    const targetUser = await randomMaker.user(targetUserSignData);
    const { userId, ...contact } = userUtilities.extractContact(
      targetUser.user
    );
    await requester.sendFullFeaturedRequest(contact);
  });

  const contact = randomMaker.unusedContact();

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
  testOneContact(addedContact, savedContact);
  testOneContact(addedContact, {
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
  expect(Object.keys(targetUserContacts)).toHaveLength(0);
};

const findSavedContact = async (currentUser, addedContact) => {
  const contacts = await findContacts(currentUser.user.userId);
  const { item } = userUtilities.findByCellphone(contacts, addedContact);
  return item;
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
