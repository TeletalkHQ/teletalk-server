import { customTypeof } from "custom-typeof";
import { ContactItem, Contacts } from "utility-store/lib/types";

import { userUtils } from "~/classes/UserUtils";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";

describe("getContacts success tests", () => {
  it("", async () => {
    const { user: currentUser, socket } = await randomMaker.user();

    const contactsLength = 10;
    const users = await randomMaker.users(contactsLength);
    const addingContacts = users.map((i) => userUtils.extractContact(i.user));

    const addContactRequester = helpers.requesterCollection.addContact(socket);

    for (const contact of addingContacts) {
      await addContactRequester.sendFullFeaturedRequest(contact);
    }

    const savedContacts = (await services.getUserContacts({
      currentUserId: currentUser.userId,
    })) as ContactItem[];

    testContacts(addingContacts, savedContacts);

    const getContactsRequester =
      helpers.requesterCollection.getContacts(socket);
    const {
      data: { contacts: contactsFromEvent },
    } = await getContactsRequester.sendFullFeaturedRequest();
    testContacts(addingContacts, contactsFromEvent as Contacts);
  });
});

// await helpers.asyncDescribe("getContacts fail tests", async () => {
//   const { requester } = await helpers.setupRequester(
//     helpers.requesterCollection.getContacts
//   );

//   return () => {
//     e2eFailTestInitializerHelper(requester);
//   };
// });

const testContacts = (addingContacts: Contacts, savedContacts: Contacts) => {
  expect(customTypeof.isArray(savedContacts)).toBeTruthy();
  expect(savedContacts.length).toEqual(addingContacts.length);

  addingContacts.forEach((i) => {
    const savedContact = savedContacts.find((j) => i.userId === j.userId)!;

    testOneContact(i, savedContact);
  });
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
