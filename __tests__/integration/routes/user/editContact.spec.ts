import { expect } from "chai";
import { ContactWithCellphone } from "utility-store/lib/types";

import { randomMaker } from "$/classes/RandomMaker";
import { socketHelper } from "$/classes/SocketHelper";
import { userUtilities } from "@/classes/UserUtilities";

import { testHelper } from "$/helpers/testHelper";

import { services } from "@/services";

import { Contact, UserMongo } from "@/types";

import { utilities } from "$/utilities";

describe("edit contact success tests", () => {
  it("should edit users in contacts", async () => {
    const { user: currentUser, socket } = await randomMaker.user();

    const contactsLength = 10;
    const addingContacts = await createContacts(contactsLength);

    const addContactWithCellphoneRequester =
      utilities.requesters.addContactWithCellphone(socket);
    for (const contact of addingContacts) {
      await addContactWithCellphoneRequester.sendFullFeaturedRequest(contact);
    }

    const editContactRequester = utilities.requesters.editContact(socket);
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

describe("editContact fail tests", () => {
  const clientSocket = socketHelper.createClient();
  const requester = utilities.requesters.editContact(clientSocket);

  const randomContact = randomMaker.unusedContact();

  const data = {
    self: {
      ...randomMaker.fullName(),
      userId: "",
    },
  };

  before(async () => {
    const { socket, user } = await randomMaker.user();
    requester.setSocket(socket);
    data.self.userId = user.userId;
  });

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(randomContact)
    .checkCurrentUserStatus(randomContact)
    .firstName(randomContact)
    .lastName(randomContact)
    .userId(randomContact)
    .selfStuff(data.self)
    .contactItemNotExist(randomContact);
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

  expect(filterNonEditedCurrentUserContacts.length).to.be.equal(
    filterNonEditedContacts.length
  );

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

  testHelper
    .createSuccessTest()
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
  testHelper
    .createSuccessTest()
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
