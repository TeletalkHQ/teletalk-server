import chai from "chai";
import { ContactWithCellphone } from "utility-store/lib/types";

import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";
import { userUtilities } from "@/classes/UserUtilities";

import { helpers } from "$/helpers";

import { services } from "@/services";

import { Contact, UserMongo } from "@/types";

describe("edit contact success tests", () => {
  it("should edit users in contacts", async () => {
    const { user: currentUser, socket } = await randomMaker.user();

    const contactsLength = 10;
    const addingContacts = await createContacts(contactsLength);

    const addContactWithCellphoneRequester =
      helpers.requesters.addContactWithCellphone(socket);
    for (const contact of addingContacts) {
      await addContactWithCellphoneRequester.sendFullFeaturedRequest(contact);
    }

    const editContactRequester = helpers.requesters.editContact(socket);
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

      testContact(sendingData, editedContact);

      const { contacts: currentUserContacts } = (await services.findOneUserById(
        currentUser.userId
      )) as UserMongo;

      const foundEditedContact = currentUserContacts.find(
        (i) => i.userId === addingContact.userId
      ) as ContactWithCellphone;

      testContactWithCellphone(
        { ...addingContact, ...sendingData },
        foundEditedContact
      );

      testNonEditedContacts(
        { ...addingContact, ...sendingData },
        addingContacts,
        currentUserContacts as ContactWithCellphone[]
      );
    }
  });
});

await helpers.asyncDescribe("editContact fail tests", async () => {
  const { requester, user } = await helpers.setupRequester(
    helpers.requesters.editContact
  );
  const selfStuffData = {
    ...randomMaker.fullName(),
    userId: user.userId,
  };

  return () => {
    const randomContact = randomMaker.unusedContact();

    e2eFailTestInitializerHelper(requester)
      .authentication()
      .input(randomContact)
      .checkCurrentUserStatus(randomContact)
      .firstName(randomContact)
      .lastName(randomContact)
      .userId(randomContact)
      .selfStuff(selfStuffData)
      .contactItemNotExist(randomContact);
  };
});

const createContacts = async (length: number) => {
  const users = await randomMaker.users(length);
  return users.map((i) => userUtilities.extractContactWithCellphone(i.user));
};

const testNonEditedContacts = (
  sendingData: ContactWithCellphone,
  addingContacts: ContactWithCellphone[],
  currentUserContacts: ContactWithCellphone[]
) => {
  const filterNonEditedContacts = addingContacts.filter(
    (i) => i.userId !== sendingData.userId
  );
  const filterNonEditedCurrentUserContacts = currentUserContacts.filter(
    (i) => i.userId !== sendingData.userId
  );

  chai
    .expect(filterNonEditedCurrentUserContacts.length)
    .to.be.equal(filterNonEditedContacts.length);

  filterNonEditedContacts.forEach((contactItem) => {
    const foundCurrentUserContactItem = filterNonEditedCurrentUserContacts.find(
      (currentUserContactItem) =>
        currentUserContactItem.userId === contactItem.userId
    ) as ContactWithCellphone;

    testContactWithCellphone(contactItem, foundCurrentUserContactItem);
  });
};

const testContactWithCellphone = (
  equalValue: ContactWithCellphone,
  testValue: ContactWithCellphone
) => {
  testContact(equalValue, testValue);

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
    });
};

const testContact = (equalValue: Contact, testValue: Contact) => {
  assertionInitializerHelper()
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
