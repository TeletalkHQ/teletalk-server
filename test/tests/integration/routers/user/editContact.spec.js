const { testHelper } = require("$/tests/integration/helpers/testHelper");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { models } = require("@/models");

const { requesters } = require("$/utilities/requesters");

const { testVariablesManager } = require("$/classes/TestVariablesManager");
const { countries } = require("@/variables/others/countries");

const userModels = models.native.user;

const users = testVariablesManager.getUsers();

describe("edit contact success tests", () => {
  it("should add and edit testUser_1 on testUser_0 contact list", async () => {
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
    } = await requesters
      .addContact()
      .sendFullFeaturedRequest(users.editContactSuccessful, undefined, {
        token: requesters.editContact().getOptions().token,
      });
    const successTest = testHelper.createSuccessTest();

    successTest
      .firstName({
        requestValue: users.editContactSuccessful.firstName,
        responseValue: firstName,
      })
      .lastName({
        requestValue: users.editContactSuccessful.lastName,
        responseValue: lastName,
      })
      .phoneNumber({
        requestValue: users.editContactSuccessful.phoneNumber,
        responseValue: phoneNumber,
      })
      .countryCode({
        requestValue: users.editContactSuccessful.countryCode,
        responseValue: countryCode,
      })
      .countryName({
        requestValue: users.editContactSuccessful.countryName,
        responseValue: countryName,
      })
      .userId({
        requestValue: users.editContactSuccessful.userId,
        responseValue: userId,
      });

    const editedFullName = {
      firstName: "new firstName",
      lastName: "new lastName",
    };

    const {
      body: {
        editedContact: { firstName: newFirstName, lastName: newLastName },
      },
    } = await requesters.editContact().sendFullFeaturedRequest({
      ...users.editContactSuccessful,
      ...editedFullName,
    });

    successTest
      .lastName({
        requestValue: editedFullName.lastName,
        responseValue: newLastName,
      })
      .firstName({
        requestValue: editedFullName.firstName,
        responseValue: newFirstName,
      });
  });
});

describe("editContact failure tests", () => {
  const contact = userPropsUtilities.makeRandomContact(
    userModels.firstName.maxlength.value,
    userModels.lastName.maxlength.value,
    countries
  );
  testHelper
    .createFailTest(requesters.editContact())
    .authentication()
    .input(contact)
    .checkCurrentUserStatus(contact)
    .selfStuff(users.selfStuff)
    .contactItemNotExist(users.editContactItemNotExist)
    .cellphone(contact)
    .countryCode(contact)
    .countryName(contact)
    .phoneNumber(contact)
    .firstName(contact)
    .lastName(contact);
});
