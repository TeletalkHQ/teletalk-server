const { generalTest } = require("@/classes/GeneralTest");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const {
  requesters: { addContactRequest },
  testVariables: {
    cellphones: { notExistedContact },
    testUsers: {
      addContactSuccessfulTestUser,
      selfStuffTestUser,
      contactItemExistTestUser,
    },
  },
} = require("@/variables/others/testVariables");

describe("add contact success tests", () => {
  it(`should add testUser_1 to testUser_0 contact list`, async () => {
    const {
      body: {
        addedContact: {
          countryCode,
          countryName,
          firstName,
          lastName,
          phoneNumber,
          privateId,
        },
      },
    } = await addContactRequest.sendRequest(addContactSuccessfulTestUser);

    generalTest
      .createSuccessTest()
      .privateId({
        privateIdMain: addContactSuccessfulTestUser.privateId,
        privateIdTest: privateId,
      })
      .countryCode({
        countryCodeMain: addContactSuccessfulTestUser.countryCode,
        countryCodeTest: countryCode,
      })
      .countryName({
        countryNameMain: addContactSuccessfulTestUser.countryName,
        countryNameTest: countryName,
      })
      .phoneNumber({
        phoneNumberMain: addContactSuccessfulTestUser.phoneNumber,
        phoneNumberTest: phoneNumber,
      })
      .lastName({
        lastNameMain: addContactSuccessfulTestUser.lastName,
        lastNameTest: lastName,
      })
      .firstName({
        firstNameMain: addContactSuccessfulTestUser.firstName,
        firstNameTest: firstName,
      });
  });
});

describe("addContact failure tests", () => {
  //* Add someone to contacts for contactItemExist fail tests
  before(async () => {
    await addContactRequest.sendRequest(contactItemExistTestUser);
  });

  const contact = userPropsUtilities.makeTestContact();
  generalTest
    .createFailTest(addContactRequest)
    .authentication()
    .cellphone(contact)
    .countryCode(contact)
    .countryName(contact)
    .phoneNumber(contact)
    .firstName(contact)
    .lastName(contact)
    .selfStuff(selfStuffTestUser)
    .contactItemExist(contactItemExistTestUser)
    .targetUserNotExist(notExistedContact);
});
