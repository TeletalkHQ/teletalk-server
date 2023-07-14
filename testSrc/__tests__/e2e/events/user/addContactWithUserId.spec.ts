import { customTypeof } from "custom-typeof";
import { maker } from "utility-store";
import { ContactItem, FullNameWithUserId } from "utility-store/lib/types";

import { services } from "~/services";
import { UserId } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe("add contact success tests", () => {
  it("should add users to contacts", async () => {
    const { user: currentUser, socket } = await randomMaker.user();
    const requester = utils.requesterCollection.addContactWithUserId(socket);

    const contactsLength = 10;
    const users = await randomMaker.users(contactsLength);

    const addingContacts = [];
    for (const { user: targetUser } of users) {
      const sendingData: FullNameWithUserId = {
        ...randomMaker.fullName(),
        userId: targetUser.userId,
      };

      const responsePromise = await requester.sendFullFeaturedRequest(
        sendingData
      );

      addingContacts.push({
        res: responsePromise,
        sendingData,
        targetUser,
      });
    }

    for (const { sendingData, res, targetUser } of addingContacts) {
      const {
        data: { addedContact },
      } = res;

      await testResponse({
        addedContact,
        currentUserId: currentUser.userId,
        sendingData,
        targetUserId: targetUser.userId,
      });
    }

    const { contacts } = (await services.findOneUser({
      userId: currentUser.userId,
    }))!;

    expect(customTypeof.isArray(contacts)).toBeTruthy();
    expect(contacts.length).toEqual(contactsLength);
  });
});

await utils.asyncDescribe("addContact with cellphone fail tests", async () => {
  const currentUserCellphone = randomMaker.unusedCellphone();

  const targetUserCellphone = randomMaker.unusedCellphone();
  const { user: targetUser } = await randomMaker.user(targetUserCellphone);

  const { requester, user: currentUser } = await utils.setupRequester(
    utils.requesterCollection.addContactWithUserId,
    currentUserCellphone
  );

  const existingContactData: FullNameWithUserId = {
    ...randomMaker.fullName(),
    userId: targetUser.userId,
  };

  await requester.sendFullFeaturedRequest(existingContactData);

  return () => {
    const contactItemWithUserId: FullNameWithUserId = {
      ...randomMaker.fullName(),
      userId: randomMaker.userId(),
    };

    const selfStuffData: FullNameWithUserId = {
      ...randomMaker.fullName(),
      userId: currentUser.userId,
    };

    e2eFailTestInitializerHelper(requester)
      .input(contactItemWithUserId)
      .firstName(contactItemWithUserId)
      .lastName(contactItemWithUserId)
      .userId(contactItemWithUserId)
      .selfStuff(selfStuffData)
      .contactItemExist(existingContactData)
      .targetUserNotExist(contactItemWithUserId);
  };
});

const testResponse = async (data: {
  addedContact: ContactItem;
  currentUserId: UserId;
  sendingData: FullNameWithUserId;
  targetUserId: UserId;
}) => {
  await testTargetUserContacts(data.targetUserId);

  const savedContact = await findSavedContact(
    data.currentUserId,
    data.addedContact
  );

  testContact(data.addedContact, savedContact);
  testContact(data.addedContact, {
    ...data.sendingData,
    ...maker.emptyCellphone(),
  });
};

const testTargetUserContacts = async (targetUserId: UserId) => {
  const targetUserContacts = await findContacts(targetUserId);
  expect(customTypeof.isArray(targetUserContacts)).toBeTruthy();
  expect(targetUserContacts).toHaveLength(0);
};

const findSavedContact = async (
  currentUserId: UserId,
  addedContact: ContactItem
) => {
  const contacts = (await findContacts(currentUserId))!;

  return contacts.find((i) => i.userId === addedContact.userId)!;
};

const findContacts = async (userId: UserId) => {
  const { contacts } = (await services.findOneUser({ userId }))!;
  return contacts;
};

const testContact = (testValue: ContactItem, equalValue: ContactItem) => {
  //CLEANME: Extract to .contact
  assertionInitializerHelper()
    .userId({
      equalValue: equalValue.userId,
      testValue: testValue.userId,
    })
    // .countryCode({
    //   equalValue: equalValue.countryCode,
    //   testValue: testValue.countryCode,
    // })
    // .countryName({
    //   equalValue: equalValue.countryName,
    //   testValue: testValue.countryName,
    // })
    // .phoneNumber({
    //   equalValue: equalValue.phoneNumber,
    //   testValue: testValue.phoneNumber,
    // })
    .lastName({
      equalValue: equalValue.lastName,
      testValue: testValue.lastName,
    })
    .firstName({
      equalValue: equalValue.firstName,
      testValue: testValue.firstName,
    });
};
