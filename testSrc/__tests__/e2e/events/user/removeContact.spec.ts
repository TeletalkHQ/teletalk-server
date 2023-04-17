import { expect } from "chai";
import { ContactWithCellphone } from "utility-store/lib/types";

import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { clientInitializer } from "$/classes/ClientInitializer";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { UserMongo } from "@/types";

import { utilities } from "$/utilities";

describe("removeContact successful test", () => {
  it("should remove users from contacts", async () => {
    const contactsLength = 10;
    const addingContacts = await createContacts(contactsLength);

    const { socket, user: currentUser } = await randomMaker.user();
    const addContactRequester =
      utilities.requesters.addContactWithCellphone(socket);

    for (const addingContact of addingContacts) {
      await addContactRequester.sendFullFeaturedRequest(addingContact);
    }

    const removeContactRequester = utilities.requesters.removeContact(socket);
    for (const addingContact of [...addingContacts]) {
      const {
        data: { removedContact },
      } = await removeContactRequester.sendFullFeaturedRequest({
        userId: addingContact.userId,
      });

      testRemovedContact(removedContact.userId, addingContact.userId);

      addingContacts.shift();
      await testContactsAfterRemoveOneItem(currentUser, addingContacts);
    }

    await testContactsAfterRemoveAll(currentUser.userId);
  });
});

describe("removeContact fail tests", () => {
  const cellphone = randomMaker.unusedCellphone();
  const clientSocket = clientInitializer.createClient();
  const requester = utilities.requesters.removeContact(clientSocket);

  before(async () => {
    const { socket, user } = await randomMaker.user(cellphone);
    requester.setSocket(socket);
    data.selfStuff.userId = user.userId;
  });

  const data = {
    selfStuff: {
      userId: "",
    },
    random: {
      userId: randomMaker.id(),
    },
  };

  e2eFailTestInitializerHelper(requester)
    .authentication()
    .input(data.random)
    .checkCurrentUserStatus(data.random)
    .userId(data.random)
    .selfStuff(data.selfStuff)
    .contactItemNotExist(data.random);
});

const createContacts = async (length: number) => {
  const users = await randomMaker.users(length);
  return users.map((i) => userUtilities.extractContactWithCellphone(i.user));
};

const testRemovedContact = (equalValue: string, testValue: string) => {
  assertionInitializerHelper().userId({ equalValue, testValue });
};

const testContactsAfterRemoveOneItem = async (
  currentUser: UserMongo,
  addingContacts: ContactWithCellphone[]
) => {
  const nonRemovedContacts = await findContacts(currentUser.userId);
  expect(nonRemovedContacts.length).to.be.equal(addingContacts.length);

  addingContacts.forEach((addingContact) => {
    const nonRemovedContact = nonRemovedContacts.find(
      (j) => addingContact.userId === j.userId
    ) as ContactWithCellphone;

    expect(addingContact).to.be.deep.equal(
      userUtilities.extractContactWithCellphone(nonRemovedContact)
    );
  });
};

const testContactsAfterRemoveAll = async (userId: string) => {
  const contactsAfterRemoveAll = await findContacts(userId);
  expect(contactsAfterRemoveAll.length).to.be.equal(0);
};

const findContacts = async (userId: string) => {
  const { contacts } = (await services.findOneUserById(userId)) as UserMongo;
  return contacts;
};
