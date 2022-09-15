const { generalTest } = require("@/classes/GeneralTest");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const {
  userModels: { firstNameModel, lastNameModel },
} = require("@/models/dataModels/userModels");

const {
  requesters: { editContactRequest, addContactRequest },
  testVariables: {
    testUsers: {
      editContactItemNotExistTestUser,
      editContactSuccessfulTestUser,
      selfStuffTestUser,
    },
  },
} = require("@/variables/others/testVariables");
const { countries } = require("@/variables/others/countries");

describe("edit contact success tests", () => {
  it(`should add and edit testUser_1 on testUser_0 contact list`, async () => {
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
    } = await addContactRequest().sendFullFeaturedRequest(
      editContactSuccessfulTestUser,
      null,
      {
        token: editContactRequest().getOptions().token,
      }
    );
    const gt = generalTest.createSuccessTest();

    gt.firstName({
      firstNameMain: editContactSuccessfulTestUser.firstName,
      firstNameTest: firstName,
    })
      .lastName({
        lastNameMain: editContactSuccessfulTestUser.lastName,
        lastNameTest: lastName,
      })
      .phoneNumber({
        phoneNumberMain: editContactSuccessfulTestUser.phoneNumber,
        phoneNumberTest: phoneNumber,
      })
      .countryCode({
        countryCodeMain: editContactSuccessfulTestUser.countryCode,
        countryCodeTest: countryCode,
      })
      .countryName({
        countryNameMain: editContactSuccessfulTestUser.countryName,
        countryNameTest: countryName,
      })
      .privateId({
        privateIdMain: editContactSuccessfulTestUser.privateId,
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
    } = await editContactRequest().sendFullFeaturedRequest({
      ...editContactSuccessfulTestUser,
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
    firstNameModel.maxlength.value,
    lastNameModel.maxlength.value,
    countries
  );
  generalTest
    .createFailTest(editContactRequest())
    .authentication()
    .selfStuff(selfStuffTestUser)
    .contactItemNotExist(editContactItemNotExistTestUser)
    .cellphone(contact)
    .countryCode(contact)
    .countryName(contact)
    .phoneNumber(contact)
    .firstName(contact)
    .lastName(contact);
});
