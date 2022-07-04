const { generalTest } = require("@/classes/GeneralTest");
const { userProps } = require("@/classes/UserProps");

const {
  userErrors: { CONTACT_ITEM_EXIST, SELF_STUFF, TARGET_USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");
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

//CLEANME SELF_STUFF CONTACT_ITEM_EXIST tests
describe("addContact failure tests", () => {
  const contact = userProps.makeTestContact();

  it("should get error, SELF_STUFF", async () => {
    await addContactRequest.sendRequest(selfStuffTestUser, SELF_STUFF);
  });

  it("should get error, CONTACT_ITEM_EXIST", async () => {
    //* First one get succeed, but second one is duplicate
    await addContactRequest.sendRequest(contactItemExistTestUser);
    await addContactRequest.sendRequest(
      contactItemExistTestUser,
      CONTACT_ITEM_EXIST
    );
  });

  it("should get error, TARGET_USER_NOT_EXIST", async () => {
    await addContactRequest.sendRequest(
      notExistedContact,
      TARGET_USER_NOT_EXIST
    );
  });

  generalTest
    .createFailTest(addContactRequest)
    .authentication()
    .cellphone(contact)
    .countryCode(contact)
    .countryName(contact)
    .phoneNumber(contact)
    .firstName(contact)
    .lastName(contact);
});
