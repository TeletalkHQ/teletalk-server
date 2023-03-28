import { expect } from "chai";
import { ContactWithCellphone } from "utility-store/lib/types";

import { randomMaker } from "$/classes/RandomMaker";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { testHelper } from "$/helpers/testHelper";

import { UserMongo } from "@/types";

import { utilities } from "$/utilities";

import { socketHelper } from "$/classes/SocketHelper";
import { FIELD_TYPE } from "$/variables/fieldType";
import { models } from "@/models";

describe("add contact success tests", () => {
  it("should add users to contacts", async () => {
    const { user: currentUser, socket } = await randomMaker.user();
    const addContactRequester =
      utilities.requesters.addContactWithCellphone(socket);

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

    expect(contacts).to.be.an(FIELD_TYPE.ARRAY);
    expect(contacts.length).to.be.equal(contactsLength);
  });
});

describe("addContact fail tests", () => {
  const clientSocket = socketHelper.createClient();
  const requester = utilities.requesters.addContactWithCellphone(clientSocket);

  const currentUserSignData = randomMaker.unusedCellphone();
  const targetUserSignData = randomMaker.unusedCellphone();

  const data = {
    addingContact: {
      ...targetUserSignData,
      ...randomMaker.fullName(),
      userId: "",
    },
    selfStuffData: {
      ...currentUserSignData,
      ...randomMaker.fullName(),
      userId: "",
    },
  };

  before(async () => {
    const { socket, user } = await randomMaker.user(currentUserSignData);
    requester.setSocket(socket);
    data.selfStuffData.userId = user.userId;

    const { user: targetUser } = await randomMaker.user(targetUserSignData);
    data.addingContact.userId = targetUser.userId;

    await requester.sendFullFeaturedRequest(data.addingContact);
  });

  const randomContact = {
    ...randomMaker.unusedContactWithCellphone(
      models.native.user.firstName.maxlength.value,
      models.native.user.lastName.minlength.value
    ),
    userId: randomMaker.id(),
  };

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(randomContact)
    .checkCurrentUserStatus(randomContact)
    .cellphone(randomContact)
    .countryCode(randomContact)
    .countryName(randomContact)
    .phoneNumber(randomContact)
    .firstName(randomContact)
    .lastName(randomContact)
    .selfStuff(data.selfStuffData)
    .contactItemExist(data.addingContact)
    .targetUserNotExist(randomContact);
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
  expect(targetUserContacts).an(FIELD_TYPE.ARRAY).and.to.be.empty;
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
