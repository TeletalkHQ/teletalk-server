const { generalTest } = require("@/classes/GeneralTest");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { models } = require("@/models/models");

const { requesters } = require("$/helpers/requesters");

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
      .addContactRequest()
      .sendFullFeaturedRequest(
        testVariables.users.editContactSuccessful,
        null,
        {
          token: requesters.editContactRequest().getOptions().token,
        }
      );
    const gt = generalTest.createSuccessTest();

    gt.firstName({
      firstNameMain: testVariables.users.editContactSuccessful.firstName,
      firstNameTest: firstName,
    })
      .lastName({
        lastNameMain: testVariables.users.editContactSuccessful.lastName,
        lastNameTest: lastName,
      })
      .phoneNumber({
        phoneNumberMain: testVariables.users.editContactSuccessful.phoneNumber,
        phoneNumberTest: phoneNumber,
      })
      .countryCode({
        countryCodeMain: testVariables.users.editContactSuccessful.countryCode,
        countryCodeTest: countryCode,
      })
      .countryName({
        countryNameMain: testVariables.users.editContactSuccessful.countryName,
        countryNameTest: countryName,
      })
      .privateId({
        privateIdMain: testVariables.users.editContactSuccessful.privateId,
        privateIdTest: privateId,
      });

    const editedFullName = {
      firstName: "new firstName",
      lastName: "new lastName",
    };

    const {
      body: {
        editedContact: { firstName: newFirstName, lastName: newLastName },
      },
    } = await requesters.editContactRequest().sendFullFeaturedRequest({
      ...testVariables.users.editContactSuccessful,
      ...editedFullName,
    });

    gt.lastName({
      lastNameMain: editedFullName.lastName,
      lastNameTest: newLastName,
    }).firstName({
      firstNameMain: editedFullName.firstName,
      firstNameTest: newFirstName,
    });
  });
});

describe("editContact failure tests", () => {
  const contact = userPropsUtilities.makeRandomContact(
    userModels.firstName.maxlength.value,
    userModels.lastName.maxlength.value,
    countries
  );
  generalTest
    .createFailTest(requesters.editContactRequest())
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
