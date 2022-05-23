const {
  getTestUsersFromState,
  request,
} = require("@/functions/testUtilities/testUtils");
const { userProps } = require("@/functions/helpers/UserProps");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  cellphoneRoutes: { addContactRoute, editContactRoute, cellphoneRouteBaseUrl },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userErrors: { CONTACT_ITEM_NOT_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");

const {
  countryCodeFailureTests,
  countryCodeSuccessTests,
} = require("$/api/generalTests/countryCodeTests");
const {
  phoneNumberFailureTests,
  phoneNumberSuccessTests,
} = require("$/api/generalTests/phoneNumberTests");
const {
  countryNameFailureTests,
  countryNameSuccessTests,
} = require("$/api/generalTests/countryNameTests");
const {
  firstNameFailureTests,
  firstNameSuccessTests,
} = require("$/api/generalTests/firstNameTests");
const {
  lastNameFailureTests,
  lastNameSuccessTests,
} = require("$/api/generalTests/lastNameTests");
const { cellphoneFailureTests } = require("$/api/generalTests/cellphoneTests");
const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");
const { privateIdSuccessTests } = require("$/api/generalTests/privateIdTests");

let testUsers = {};

const contact = userProps.makeTestContact();

describe("", () => {
  it("should fill testUsers object", async () => {
    testUsers = await getTestUsersFromState();
    customRequest.setRequestRequirements(
      cellphoneRouteBaseUrl,
      editContactRoute
    );
    customRequest.setMainTokenFromUserObject(testUsers.testUser_0);
  });
});

describe("edit contact success tests", () => {
  it(`should add and edit testUser_1 on testUser_0 contact list`, async () => {
    const { testUser_4 } = testUsers;

    const {
      body: {
        addedContact: {
          firstName,
          lastName,
          privateId,
          countryCode,
          countryName,
          phoneNumber,
        },
      },
    } = await request(
      cellphoneRouteBaseUrl,
      addContactRoute,
      testUser_4,
      null,
      { token: customRequest.options.token }
    );

    firstNameSuccessTests(
      {
        firstNameMain: testUser_4.firstName,
        firstNameTest: firstName,
      },
      {
        modelCheck: true,
        stringEquality: true,
      }
    );

    lastNameSuccessTests(
      {
        lastNameMain: testUser_4.lastName,
        lastNameTest: lastName,
      },
      {
        modelCheck: true,
        stringEquality: true,
      }
    );

    phoneNumberSuccessTests(
      {
        phoneNumberMain: testUser_4.phoneNumber,
        phoneNumberTest: phoneNumber,
      },
      {
        modelCheck: true,
        stringEquality: true,
      }
    );

    countryCodeSuccessTests(
      {
        countryCodeMain: testUser_4.countryCode,
        countryCodeTest: countryCode,
      },
      { modelCheck: true, stringEquality: true }
    );

    countryNameSuccessTests(
      {
        countryNameMain: testUser_4.countryName,
        countryNameTest: countryName,
      },
      { modelCheck: true, stringEquality: true }
    );

    privateIdSuccessTests(
      {
        privateIdMain: testUser_4.privateId,
        privateIdTest: privateId,
      },
      { modelCheck: true, stringEquality: true }
    );

    const editedFullName = {
      firstName: "new firstName",
      lastName: "new lastName",
    };

    const {
      body: {
        editedContact: { firstName: newFirstName, lastName: newLastName },
      },
    } = await customRequest.sendRequest({
      ...testUser_4,
      ...editedFullName,
    });

    firstNameSuccessTests(
      {
        firstNameMain: editedFullName.firstName,
        firstNameTest: newFirstName,
      },
      { modelCheck: true, stringEquality: true }
    );

    lastNameSuccessTests(
      {
        lastNameMain: editedFullName.lastName,
        lastNameTest: newLastName,
      },
      { modelCheck: true, stringEquality: true }
    );
  });
});

describe("editContact failure tests", () => {
  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = testUsers;
    await customRequest.sendRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, CONTACT_ITEM_NOT_EXIST", async () => {
    const { testUser_10 } = testUsers;

    await customRequest.sendRequest(testUser_10, CONTACT_ITEM_NOT_EXIST);
  });

  cellphoneFailureTests(contact);
  countryCodeFailureTests(contact);
  countryNameFailureTests(contact);
  phoneNumberFailureTests(contact);
  firstNameFailureTests(contact);
  lastNameFailureTests(contact);
  authenticationFailureTests();
});
