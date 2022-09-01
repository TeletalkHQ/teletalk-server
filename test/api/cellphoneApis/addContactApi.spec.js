const { generalTest } = require("@/classes/GeneralTest");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const {
  userModels: { firstNameModel, lastNameModel },
} = require("@/models/userModels/userModels");

const {
  requesters: { addContactRequest },
  testVariables: {
    cellphones: { notExistedContact },
    testUsers: {
      addContactSuccessfulTestUser,
      contactItemExistTestUser,
      selfStuffTestUser,
    },
  },
} = require("@/variables/others/testVariables");
const { countries } = require("@/variables/others/countries");

const configuredAddContactRequester = addContactRequest();

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
    } = await configuredAddContactRequester.sendFullFeaturedRequest(
      //TODO User cellphone instead
      addContactSuccessfulTestUser
    );

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
    await configuredAddContactRequester.sendFullFeaturedRequest(
      contactItemExistTestUser
    );
  });

  const contact = userPropsUtilities.makeRandomContact(
    firstNameModel.maxlength.value,
    lastNameModel.maxlength.value,
    countries
  );
  generalTest
    .createFailTest(configuredAddContactRequester)
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
