import { ContactWithCellphone } from "utility-store/lib/types";

import { userUtilities } from "~/classes/UserUtilities";
import { services } from "~/services";
import { UserMongo } from "~/types";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";

describe("removeContact successful test", () => {
  it("should remove users from contacts", async () => {
    const contactsLength = 10;
    const addingContacts = await createContacts(contactsLength);

    const { socket, user: currentUser } = await randomMaker.user();
    const addContactRequester =
      helpers.requesterCollection.addContactWithCellphone(socket);

    for (const addingContact of addingContacts) {
      await addContactRequester.sendFullFeaturedRequest(addingContact);
    }

    const removeContactRequester =
      helpers.requesterCollection.removeContact(socket);
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

await helpers.asyncDescribe("removeContact fail tests", async () => {
  const { requester, user } = await helpers.setupRequester(
    helpers.requesterCollection.removeContact
  );

  return () => {
    const selfStuffData = {
      userId: user.userId,
    };
    const randomData = {
      userId: randomMaker.id(),
    };

    e2eFailTestInitializerHelper(requester)
      .input(randomData)
      .userId(randomData)
      .selfStuff(selfStuffData)
      .contactItemNotExist(randomData);
  };
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
  expect(nonRemovedContacts.length).toEqual(addingContacts.length);

  addingContacts.forEach((addingContact) => {
    const nonRemovedContact = nonRemovedContacts.find(
      (j) => addingContact.userId === j.userId
    ) as ContactWithCellphone;

    expect(addingContact).toEqual(
      userUtilities.extractContactWithCellphone(nonRemovedContact)
    );
  });
};

const testContactsAfterRemoveAll = async (userId: string) => {
  const contactsAfterRemoveAll = await findContacts(userId);
  expect(contactsAfterRemoveAll.length).toEqual(0);
};

const findContacts = async (userId: string) => {
  const { contacts } = (await services.findOneUserById(userId)) as UserMongo;
  return contacts;
};
