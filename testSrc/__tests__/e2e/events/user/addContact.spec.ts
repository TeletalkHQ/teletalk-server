import { customTypeof } from "custom-typeof";
import { ContactItem } from "utility-store/lib/types";
import { UserData } from "utility-store/lib/types";

import { userUtils } from "~/classes/UserUtils";
import { services } from "~/services";
import { UserId } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";

describe("add contact success tests", () => {
  it("should add users to contacts", async () => {
    const { user: currentUser, socket } = await randomMaker.user();
    const requester = helpers.requesterCollection.addContact(socket);

    const contactsLength = 1;
    const users: UserData[] = [];
    for (let i = 0; i < contactsLength; i++) {
      const { user: targetUser } = await randomMaker.user();
      users.push(targetUser);
    }

    const addingContacts = [];
    for (const targetUser of users) {
      const targetUserCellphone = userUtils.extractCellphone(targetUser);
      const sendingData: ContactItem = {
        ...targetUserCellphone,
        ...randomMaker.fullName(),
        userId: "",
      };

      const responsePromise = requester.sendFullFeaturedRequest(sendingData);

      addingContacts.push({
        res: responsePromise,
        sendingData,
        targetUser,
      });
    }

    for (const { sendingData, res, targetUser } of addingContacts) {
      const {
        data: { addedContact },
      } = await res;

      await testAddContactResponse({
        addedContact,
        currentUser,
        sendingData: { ...sendingData, userId: targetUser.userId },
        targetUser,
      });
    }

    const { contacts } = (await services.findOneUserById({
      userId: currentUser.userId,
    }))!;

    expect(customTypeof.isArray(contacts)).toBeTruthy();
    expect(contacts.length).toEqual(contactsLength);
  });
});

await helpers.asyncDescribe(
  "addContact fail tests with empty cellphone",
  async () => {
    const currentUserSignData = randomMaker.unusedCellphone();
    const { requester, user: currentUser } = await helpers.setupRequester(
      helpers.requesterCollection.addContact,
      currentUserSignData
    );
    const selfStuffData = {
      ...userUtils.makeEmptyCellphone(),
      ...randomMaker.fullName(),
      userId: currentUser.userId,
    };

    const targetUserSignData = randomMaker.unusedCellphone();
    const { user: targetUser } = await randomMaker.user(targetUserSignData);
    const existingContactData = {
      ...targetUserSignData,
      ...randomMaker.fullName(),
      userId: targetUser.userId,
    };

    await requester.sendFullFeaturedRequest(existingContactData);

    return () => {
      const contactWithEmptyCellphone: ContactItem = {
        ...userUtils.makeEmptyCellphone(),
        ...randomMaker.fullName(),
        userId: randomMaker.userId(),
      };

      e2eFailTestInitializerHelper(requester)
        .input(contactWithEmptyCellphone)
        .firstName(contactWithEmptyCellphone)
        .lastName(contactWithEmptyCellphone)
        .selfStuff(selfStuffData)
        .contactItemExist(existingContactData)
        .userId(contactWithEmptyCellphone, ["empty"])
        .targetUserNotExist(contactWithEmptyCellphone);
    };
  }
);

await helpers.asyncDescribe("addContact fail tests", async () => {
  const currentUserSignData = randomMaker.unusedCellphone();
  const { requester, user: currentUser } = await helpers.setupRequester(
    helpers.requesterCollection.addContact,
    currentUserSignData
  );
  const selfStuffData: ContactItem = {
    ...currentUserSignData,
    ...randomMaker.fullName(),
    userId: currentUser.userId,
  };

  const targetUserSignData = randomMaker.unusedCellphone();
  const { user: targetUser } = await randomMaker.user(targetUserSignData);
  const existingContactData = {
    ...targetUserSignData,
    ...randomMaker.fullName(),
    userId: targetUser.userId,
  };

  await requester.sendFullFeaturedRequest(existingContactData);

  return () => {
    const contactWithEmptyUserId: ContactItem = {
      ...randomMaker.unusedContact(),
      userId: "",
    };

    e2eFailTestInitializerHelper(requester)
      .input(contactWithEmptyUserId)
      .countryCode(contactWithEmptyUserId)
      .countryName(contactWithEmptyUserId)
      .phoneNumber(contactWithEmptyUserId)
      .firstName(contactWithEmptyUserId)
      .lastName(contactWithEmptyUserId)
      .selfStuff(selfStuffData)
      .contactItemExist(existingContactData)
      .targetUserNotExist(contactWithEmptyUserId);
  };
});

const testAddContactResponse = async (data: {
  addedContact: ContactItem;
  currentUser: UserData;
  sendingData: ContactItem;
  targetUser: UserData;
}) => {
  await testTargetUserContacts(data.targetUser.userId);

  const savedContact = await findSavedContact(
    data.currentUser.userId,
    data.addedContact
  );
  testOneContact(data.addedContact, savedContact);
  testOneContact(data.addedContact, data.sendingData);
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

  return contacts.find((i) => i.userId === addedContact.userId) as ContactItem;
};

const findContacts = async (userId: UserId) => {
  const { contacts } = (await services.findOneUserById({ userId })) as UserData;
  return contacts;
};

const testOneContact = (testValue: ContactItem, equalValue: ContactItem) => {
  assertionInitializerHelper()
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
