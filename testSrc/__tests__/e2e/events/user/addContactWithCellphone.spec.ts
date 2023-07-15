import chai from "chai";
import { extractor } from "utility-store";
import { ContactItem, UserData } from "utility-store/lib/types";

import { services } from "~/services";
import { ContactItemWithCellphone, UserId } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";
import { FIELD_TYPE } from "@/variables";

describe("add contact success tests", () => {
  it("should add users to contacts", async () => {
    const { user: currentUser, socket } = await randomMaker.user();
    const requester = utils.requesterCollection.addContactWithCellphone(socket);

    const contactsLength = 10;
    const users = await randomMaker.users(contactsLength);

    const addingContacts = [];
    for (const { user: targetUser } of users) {
      const sendingData: ContactItemWithCellphone = {
        ...extractor.cellphone(targetUser),
        ...randomMaker.fullName(),
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

    chai.expect(contacts).to.be.an(FIELD_TYPE.ARRAY);
    chai.expect(contacts.length).to.be.equal(contactsLength);
  });
});

await utils.asyncDescribe("addContact with cellphone fail tests", async () => {
  const currentUserCellphone = randomMaker.unusedCellphone();

  const targetUserCellphone = randomMaker.unusedCellphone();
  await randomMaker.user(targetUserCellphone);

  const { requester } = await utils.setupRequester(
    utils.requesterCollection.addContactWithCellphone,
    currentUserCellphone
  );

  const existingContactData: ContactItemWithCellphone = {
    ...targetUserCellphone,
    ...randomMaker.fullName(),
  };

  await requester.sendFullFeaturedRequest(existingContactData);

  return () => {
    const { userId, ...data } = randomMaker.unusedContact();

    const selfStuffData: ContactItemWithCellphone = {
      ...currentUserCellphone,
      ...randomMaker.fullName(),
    };

    e2eFailTestInitializerHelper(requester)
      .input(data)
      .countryCode(data)
      .countryName(data)
      .phoneNumber(data)
      .firstName(data)
      .lastName(data)
      .selfStuff(selfStuffData)
      .contactItemExist(existingContactData)
      .targetUserNotExist(data);
  };
});

const testResponse = async (data: {
  addedContact: ContactItem;
  currentUserId: UserId;
  sendingData: ContactItemWithCellphone;
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
    userId: data.targetUserId,
  });
};

const testTargetUserContacts = async (targetUserId: UserId) => {
  const targetUserContacts = await findContacts(targetUserId);
  chai.expect(targetUserContacts).to.be.an(FIELD_TYPE.ARRAY);
  chai.expect(targetUserContacts.length).to.be.equal(0);
};

const findSavedContact = async (
  currentUserId: UserId,
  addedContact: ContactItem
) => {
  const contacts = (await findContacts(currentUserId))!;

  return contacts.find((i) => i.userId === addedContact.userId) as ContactItem;
};

const findContacts = async (userId: UserId) => {
  const { contacts } = (await services.findOneUser({ userId })) as UserData;
  return contacts;
};

const testContact = (testValue: ContactItem, equalValue: ContactItem) => {
  //CLEANME: Extract to .contact
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
