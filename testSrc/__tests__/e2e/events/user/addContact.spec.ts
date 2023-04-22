import chai from "chai";
import { ContactWithCellphone } from "utility-store/lib/types";

import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";
import { userUtilities } from "@/classes/UserUtilities";

import { helpers } from "$/helpers";

import { models } from "@/models";

import { services } from "@/services";

import { UserMongo } from "@/types";

import { FIELD_TYPE } from "$/variables/fieldType";

describe("add contact success tests", () => {
  it("should add users to contacts", async () => {
    const { user: currentUser, socket } = await randomMaker.user();
    const addContactRequester =
      helpers.requesterCollection.addContactWithCellphone(socket);

    const contactsLength = 1;
    const users: UserMongo[] = [];
    for (let i = 0; i < contactsLength; i++) {
      const { user: targetUser } = await randomMaker.user();
      users.push(targetUser);
    }

    const addingContacts = [];
    for (const targetUser of users) {
      const targetUserCellphone = userUtilities.extractCellphone(targetUser);
      const sendingData = {
        ...targetUserCellphone,
        ...randomMaker.fullName(),
        userId: targetUser.userId,
      };

      const response = addContactRequester.sendFullFeaturedRequest(sendingData);

      addingContacts.push({
        res: response,
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
        sendingData,
        targetUser,
      });
    }

    const { contacts } = (await services.findOneUserById(
      currentUser.userId
    )) as UserMongo;

    chai.expect(contacts).to.be.an(FIELD_TYPE.ARRAY);
    chai.expect(contacts.length).to.be.equal(contactsLength);
  });
});

helpers.asyncDescribe("addContact fail tests", async () => {
  const currentUserSignData = randomMaker.unusedCellphone();
  const { requester, user: currentUser } = await helpers.setupRequester(
    helpers.requesterCollection.addContactWithCellphone,
    currentUserSignData
  );
  const selfStuffData = {
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
      ...randomMaker.unusedContactWithCellphone(
        models.native.firstName.maxlength.value,
        models.native.lastName.minlength.value
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
  addedContact: ContactWithCellphone;
  currentUser: UserMongo;
  sendingData: ContactWithCellphone;
  targetUser: UserMongo;
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
  chai.expect(targetUserContacts).an(FIELD_TYPE.ARRAY).and.to.be.empty;
};

const findSavedContact = async (
  currentUserId: string,
  addedContact: ContactWithCellphone
) => {
  const contacts = (await findContacts(
    currentUserId
  )) as ContactWithCellphone[];

  return contacts.find(
    (i) => i.userId === addedContact.userId
  ) as ContactWithCellphone;
};

const findContacts = async (userId: string) => {
  const { contacts } = (await services.findOneUserById(userId)) as UserMongo;
  return contacts;
};

const testOneContact = (
  testValue: ContactWithCellphone,
  equalValue: ContactWithCellphone
) => {
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
