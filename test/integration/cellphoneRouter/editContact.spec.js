const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { models } = require("@/models/models");

const { requesters } = require("$/functions/helpers/requesters");

const { testVariables } = require("$/variables/testVariables");
const { countries } = require("@/variables/others/countries");

const userModels = models.native.user;

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
          privateId,
        },
      },
    } = await requesters
      .addContact()
      .sendFullFeaturedRequest(
        testVariables.users.editContactSuccessful,
        null,
        {
          token: requesters.editContact().getOptions().token,
        }
      );
    const successTest = integrationHelpers.createSuccessTest();

    successTest
      .firstName({
        clientValue: testVariables.users.editContactSuccessful.firstName,
        responseValue: firstName,
      })
      .lastName({
        clientValue: testVariables.users.editContactSuccessful.lastName,
        responseValue: lastName,
      })
      .phoneNumber({
        clientValue: testVariables.users.editContactSuccessful.phoneNumber,
        responseValue: phoneNumber,
      })
      .countryCode({
        clientValue: testVariables.users.editContactSuccessful.countryCode,
        responseValue: countryCode,
      })
      .countryName({
        clientValue: testVariables.users.editContactSuccessful.countryName,
        responseValue: countryName,
      })
      .privateId({
        clientValue: testVariables.users.editContactSuccessful.privateId,
        responseValue: privateId,
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
      ...testVariables.users.editContactSuccessful,
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
    .selfStuff(testVariables.users.selfStuff)
    .contactItemNotExist(testVariables.users.editContactItemNotExist)
    .cellphone(contact)
    .countryCode(contact)
    .countryName(contact)
    .phoneNumber(contact)
    .firstName(contact)
    .lastName(contact);
});
