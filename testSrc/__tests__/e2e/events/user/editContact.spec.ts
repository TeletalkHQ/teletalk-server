import { ContactItem } from "utility-store/lib/types";

import { userUtils } from "~/classes/UserUtils";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";

describe("edit contact success tests", () => {
  it("should edit users in contacts", async () => {
    const { user: currentUser, socket } = await randomMaker.user();

    const contactsLength = 10;
    const addingContacts = await createContacts(contactsLength);

    const addContactRequester = helpers.requesterCollection.addContact(socket);
    for (const contact of addingContacts) {
      await addContactRequester.sendFullFeaturedRequest(contact);
    }

    const editContactRequester =
      helpers.requesterCollection.editContact(socket);
    for (const addingContact of addingContacts) {
      const fullName = randomMaker.fullName();
      const sendingData = {
        ...fullName,
        userId: addingContact.userId,
      };

      const {
        data: { editedContact },
      } = await editContactRequester.sendFullFeaturedRequest(sendingData);
      addingContact.firstName = sendingData.firstName;
      addingContact.lastName = sendingData.lastName;

      testContact(
        {
          ...sendingData,
          ...userUtils.makeEmptyCellphone(),
        },
        {
          ...editedContact,
          ...userUtils.makeEmptyCellphone(),
        }
      );

      const { contacts: currentUserContacts } = (await services.findOneUserById(
        currentUser.userId
      ))!;

      const foundEditedContact = currentUserContacts.find(
        (i) => i.userId === addingContact.userId
      ) as ContactItem;

      testContact({ ...addingContact, ...sendingData }, foundEditedContact);

      testNonEditedContacts(
        { ...addingContact, ...sendingData },
        addingContacts,
        currentUserContacts as ContactItem[]
      );
    }
  });
});

await helpers.asyncDescribe("editContact fail tests", async () => {
  const { requester, user } = await helpers.setupRequester(
    helpers.requesterCollection.editContact
  );
  const selfStuffData = {
    ...randomMaker.fullName(),
    userId: user.userId,
  };

  return () => {
    const randomContact = randomMaker.unusedContact();

    e2eFailTestInitializerHelper(requester)
      .input(randomContact)
      .firstName(randomContact)
      .lastName(randomContact)
      .userId(randomContact)
      .selfStuff(selfStuffData)
      .contactItemNotExist(randomContact);
  };
});

const createContacts = async (length: number) => {
  const users = await randomMaker.users(length);
  return users.map((i) => userUtils.extractContact(i.user));
};

const testNonEditedContacts = (
  sendingData: ContactItem,
  addingContacts: ContactItem[],
  currentUserContacts: ContactItem[]
) => {
  const filterNonEditedContacts = addingContacts.filter(
    (i) => i.userId !== sendingData.userId
  );
  const filterNonEditedCurrentUserContacts = currentUserContacts.filter(
    (i) => i.userId !== sendingData.userId
  );

  expect(filterNonEditedCurrentUserContacts.length).toBe(
    filterNonEditedContacts.length
  );

  filterNonEditedContacts.forEach((contactItem) => {
    const foundCurrentUserContactItem = filterNonEditedCurrentUserContacts.find(
      (currentUserContactItem) =>
        currentUserContactItem.userId === contactItem.userId
    ) as ContactItem;

    testContact(contactItem, foundCurrentUserContactItem);
  });
};

const testContact = (equalValue: ContactItem, testValue: ContactItem) => {
  assertionInitializerHelper()
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
    .firstName({
      equalValue: equalValue.firstName,
      testValue: testValue.firstName,
    })
    .lastName({
      equalValue: equalValue.lastName,
      testValue: testValue.lastName,
    })
    .userId({ equalValue: equalValue.userId, testValue: testValue.userId });
};
