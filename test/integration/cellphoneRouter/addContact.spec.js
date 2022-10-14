const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { models } = require("@/models/models");

const { requesters } = require("$/functions/helpers/requesters");

const { testVariables } = require("$/variables/testVariables");
const { countries } = require("@/variables/others/countries");

const userModels = models.native.user;

const configuredAddContactRequester = requesters.addContact();

describe("add contact success tests", () => {
  it("should add testUser_1 to testUser_0 contact list", async () => {
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
      testVariables.users.addContactSuccessful
    );

    integrationHelpers
      .createSuccessTest()
      .privateId({
        privateIdMain: testVariables.users.addContactSuccessful.privateId,
        privateIdTest: privateId,
      })
      .countryCode({
        countryCodeMain: testVariables.users.addContactSuccessful.countryCode,
        countryCodeTest: countryCode,
      })
      .countryName({
        countryNameMain: testVariables.users.addContactSuccessful.countryName,
        countryNameTest: countryName,
      })
      .phoneNumber({
        phoneNumberMain: testVariables.users.addContactSuccessful.phoneNumber,
        phoneNumberTest: phoneNumber,
      })
      .lastName({
        lastNameMain: testVariables.users.addContactSuccessful.lastName,
        lastNameTest: lastName,
      })
      .firstName({
        firstNameMain: testVariables.users.addContactSuccessful.firstName,
        firstNameTest: firstName,
      });
  });
});

describe("addContact failure tests", () => {
  //* Add someone to contacts for contactItemExist fail tests
  before(async () => {
    await configuredAddContactRequester.sendFullFeaturedRequest(
      testVariables.users.contactItemExist
    );
  });

  const contact = userPropsUtilities.makeRandomContact(
    userModels.firstName.maxlength.value,
    userModels.lastName.maxlength.value,
    countries
  );
  integrationHelpers
    .createFailTest(configuredAddContactRequester)
    .authentication()
    .cellphone(contact)
    .countryCode(contact)
    .countryName(contact)
    .phoneNumber(contact)
    .firstName(contact)
    .lastName(contact)
    .selfStuff(testVariables.users.selfStuff)
    .contactItemExist(testVariables.users.contactItemExist)
    .targetUserNotExist(testVariables.cellphones.notExistedContact);
});
