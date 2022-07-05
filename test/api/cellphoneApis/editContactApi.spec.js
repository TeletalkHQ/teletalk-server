const { generalTest } = require("@/classes/GeneralTest");
const { userProps } = require("@/classes/UserProps");

const {
  userErrors: { CONTACT_ITEM_NOT_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");
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
    } = await addContactRequest.sendRequest(
      editContactSuccessfulTestUser,
      null,
      {
        token: editContactRequest.getOptions().token,
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
    } = await editContactRequest.sendRequest({
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

//CLEANME SELF_STUFF CONTACT_ITEM_NOT_EXIST tests
describe("editContact failure tests", () => {
  const contact = userProps.makeTestContact();

  it("should get error, SELF_STUFF", async () => {
    await editContactRequest.sendRequest(selfStuffTestUser, SELF_STUFF);
  });
  it("should get error, CONTACT_ITEM_NOT_EXIST", async () => {
    await editContactRequest.sendRequest(
      editContactItemNotExistTestUser,
      CONTACT_ITEM_NOT_EXIST
    );
  });

  generalTest
    .createFailTest(editContactRequest)
    .authentication()
    .cellphone(contact)
    .countryCode(contact)
    .countryName(contact)
    .phoneNumber(contact)
    .firstName(contact)
    .lastName(contact);
});
