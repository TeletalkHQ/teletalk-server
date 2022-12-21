const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const { requesters } = require("$/utilities/requesters");
const {
  integrationHelpers,
} = require("$/tests/integration/helpers/integrationHelpers");

const { countries } = require("@/variables/others/countries");

const userModels = models.native.user;

const configuredAddContactRequester = requesters.addContact();

const users = testVariablesManager.getUsers();
const cellphones = testVariablesManager.getCellphones();

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
          userId,
        },
      },
    } = await configuredAddContactRequester.sendFullFeaturedRequest(
      users.addContactSuccessful
    );

    integrationHelpers
      .createSuccessTest()
      .userId({
        requestValue: users.addContactSuccessful.userId,
        responseValue: userId,
      })
      .countryCode({
        requestValue: users.addContactSuccessful.countryCode,
        responseValue: countryCode,
      })
      .countryName({
        requestValue: users.addContactSuccessful.countryName,
        responseValue: countryName,
      })
      .phoneNumber({
        requestValue: users.addContactSuccessful.phoneNumber,
        responseValue: phoneNumber,
      })
      .lastName({
        requestValue: users.addContactSuccessful.lastName,
        responseValue: lastName,
      })
      .firstName({
        requestValue: users.addContactSuccessful.firstName,
        responseValue: firstName,
      });
  });
});

describe("addContact failure tests", () => {
  //* Add someone to contacts for contactItemExist fail tests
  before(async () => {
    await configuredAddContactRequester.sendFullFeaturedRequest(
      users.contactItemExist
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
    .inputMissing(contact)
    .cellphone(contact)
    .countryCode(contact)
    .countryName(contact)
    .phoneNumber(contact)
    .firstName(contact)
    .lastName(contact)
    .selfStuff(users.selfStuff)
    .contactItemExist(users.contactItemExist)
    .targetUserNotExist(cellphones.notExistedContact);
});
