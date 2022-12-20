const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { models } = require("@/models");

const { requesters } = require("$/functions/helpers/requesters");

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
      .sendFullFeaturedRequest(users.editContactSuccessful, null, {
        token: requesters.editContact().getOptions().token,
      });
    const successTest = integrationHelpers.createSuccessTest();

    successTest
      .firstName({
        clientValue: users.editContactSuccessful.firstName,
        responseValue: firstName,
      })
      .lastName({
        clientValue: users.editContactSuccessful.lastName,
        responseValue: lastName,
      })
      .phoneNumber({
        clientValue: users.editContactSuccessful.phoneNumber,
        responseValue: phoneNumber,
      })
      .countryCode({
        clientValue: users.editContactSuccessful.countryCode,
        responseValue: countryCode,
      })
      .countryName({
        clientValue: users.editContactSuccessful.countryName,
        responseValue: countryName,
      })
      .userId({
        clientValue: users.editContactSuccessful.userId,
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
        clientValue: editedFullName.lastName,
        responseValue: newLastName,
      })
      .firstName({
        clientValue: editedFullName.firstName,
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
  integrationHelpers
    .createFailTest(requesters.editContact())
    .authentication()
    .selfStuff(users.selfStuff)
    .contactItemNotExist(users.editContactItemNotExist)
    .cellphone(contact)
    .countryCode(contact)
    .countryName(contact)
    .phoneNumber(contact)
    .firstName(contact)
    .lastName(contact);
});
