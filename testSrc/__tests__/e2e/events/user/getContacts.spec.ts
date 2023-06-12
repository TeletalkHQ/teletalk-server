import { ContactWithCellphone } from "utility-store/lib/types";

import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";
import { userUtilities } from "~/classes/UserUtilities";

import { helpers } from "$/helpers";

import { services } from "~/services";

import { customTypeof } from "custom-typeof";

describe("getContacts success tests", () => {
  it("", async () => {
    const { user: currentUser, socket } = await randomMaker.user();

    const contactsLength = 10;
    const users = await randomMaker.users(contactsLength);
    const addingContacts = users.map((i) =>
      userUtilities.extractContactWithCellphone(i.user)
    );

    const addContactRequester =
      helpers.requesterCollection.addContactWithCellphone(socket);

    for (const contact of addingContacts) {
      await addContactRequester.sendFullFeaturedRequest(contact);
    }

    const savedContacts = (await services.getUserContacts({
      currentUserId: currentUser.userId,
    })) as ContactWithCellphone[];

    testContacts(addingContacts, savedContacts);

    const getContactsRequester =
      helpers.requesterCollection.getContacts(socket);
    const {
      data: { contacts: contactsFromEvent },
    } = await getContactsRequester.sendFullFeaturedRequest();
    testContacts(addingContacts, contactsFromEvent);
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

const testContacts = (
  addingContacts: ContactWithCellphone[],
  savedContacts: ContactWithCellphone[]
) => {
  expect(customTypeof.isArray(savedContacts)).toBeTruthy();
  expect(savedContacts.length).toEqual(addingContacts.length);

  addingContacts.forEach((i) => {
    const savedContact = savedContacts.find(
      (j) => i.userId === j.userId
    ) as ContactWithCellphone;

    testOneContact(i, savedContact);
  });
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
