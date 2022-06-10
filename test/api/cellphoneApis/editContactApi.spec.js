const { userProps } = require("@/classes/UserProps");
const { customRequest } = require("@/classes/CustomRequest");
const { describer } = require("@/classes/Describer");
const { stateManager } = require("@/functions/tools/StateManager");

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

describer.addInitialDescribe(cellphoneRouteBaseUrl, editContactRoute, "0");

describe("edit contact success tests", () => {
  it(`should add and edit testUser_1 on testUser_0 contact list`, async () => {
    const { testUser_4 } = stateManager.state.testUsers;

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
    } = await customRequest.sendRequest(
      testUser_4,
      null,
      {
        token: customRequest.options.token,
      },
      cellphoneRouteBaseUrl,
      addContactRoute
    );

    firstNameSuccessTests({
      firstNameMain: testUser_4.firstName,
      firstNameTest: firstName,
    });

    lastNameSuccessTests({
      lastNameMain: testUser_4.lastName,
      lastNameTest: lastName,
    });

    phoneNumberSuccessTests({
      phoneNumberMain: testUser_4.phoneNumber,
      phoneNumberTest: phoneNumber,
    });

    countryCodeSuccessTests({
      countryCodeMain: testUser_4.countryCode,
      countryCodeTest: countryCode,
    });

    countryNameSuccessTests({
      countryNameMain: testUser_4.countryName,
      countryNameTest: countryName,
    });

    privateIdSuccessTests({
      privateIdMain: testUser_4.privateId,
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
    } = await customRequest.sendRequest({
      ...testUser_4,
      ...editedFullName,
    });

    firstNameSuccessTests({
      firstNameMain: editedFullName.firstName,
      firstNameTest: newFirstName,
    });

    lastNameSuccessTests({
      lastNameMain: editedFullName.lastName,
      lastNameTest: newLastName,
    });
  });
});

//CLEANME SELF_STUFF CONTACT_ITEM_NOT_EXIST tests
describe("editContact failure tests", () => {
  const contact = userProps.makeTestContact();

  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = stateManager.state.testUsers;
    await customRequest.sendRequest(testUser_0, SELF_STUFF);
  });
  it("should get error, CONTACT_ITEM_NOT_EXIST", async () => {
    const { testUser_10 } = stateManager.state.testUsers;
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
