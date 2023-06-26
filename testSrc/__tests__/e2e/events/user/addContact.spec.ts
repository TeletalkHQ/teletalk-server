import { customTypeof } from "custom-typeof";
import { ContactItem } from "utility-store/lib/types";
import { UserData } from "utility-store/lib/types";

import { userUtils } from "~/classes/UserUtils";
import { models } from "~/models";
import { services } from "~/services";

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

    const { contacts } = (await services.findOneUserById(currentUser.userId))!;

    expect(customTypeof.isArray(contacts)).toBeTruthy();
    expect(contacts.length).toEqual(contactsLength);
  });
});

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
  const addingContactData = {
    ...targetUserSignData,
    ...randomMaker.fullName(),
    userId: targetUser.userId,
  };

  await requester.sendFullFeaturedRequest(addingContactData);

  return () => {
    const randomContact = {
      ...randomMaker.unusedContactWithEmptyCellphone(
        models.native.firstName.maxLength,
        models.native.lastName.minLength
      ),
      userId: randomMaker.id(),
    };

    e2eFailTestInitializerHelper(requester)
      .input(randomContact)
      .countryCode(randomContact)
      .countryName(randomContact)
      .phoneNumber(randomContact)
      .firstName(randomContact)
      .lastName(randomContact)
      .selfStuff(selfStuffData)
      .contactItemExist(addingContactData)
      .targetUserNotExist(randomContact);
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

const testTargetUserContacts = async (targetUserId: string) => {
  const targetUserContacts = await findContacts(targetUserId);
  expect(customTypeof.isArray(targetUserContacts)).toBeTruthy();
  expect(targetUserContacts).toHaveLength(0);
};

const findSavedContact = async (
  currentUserId: string,
  addedContact: ContactItem
) => {
  const contacts = (await findContacts(currentUserId)) as ContactItem[];

  return contacts.find((i) => i.userId === addedContact.userId) as ContactItem;
};

const findContacts = async (userId: string) => {
  const { contacts } = (await services.findOneUserById(userId)) as UserData;
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
