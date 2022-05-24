const {
  getTestUsersFromState,
} = require("@/functions/testUtilities/testUtils");
const { userProps } = require("@/functions/helpers/UserProps");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  cellphoneRoutes: { addContactRoute, cellphoneRouteBaseUrl },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userErrors: { CONTACT_ITEM_EXIST, SELF_STUFF, TARGET_USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");
const { countries } = require("@/variables/constants/countries");

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
    customRequest.setRequestRequirements(
      cellphoneRouteBaseUrl,
      addContactRoute
    );
    testUsers = await getTestUsersFromState();

    customRequest.setMainTokenFromUserObject(testUsers.testUser_0);
  });
});

describe("add contact successfully", () => {
  it(`should add testUser_1 to testUser_0 contact list`, async () => {
    const { testUser_1 } = testUsers;
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
    } = await customRequest.sendRequest(testUser_1);

    firstNameSuccessTests({
      firstNameMain: testUser_1.firstName,
      firstNameTest: firstName,
    });

    lastNameSuccessTests({
      lastNameMain: testUser_1.lastName,
      lastNameTest: lastName,
    });

    phoneNumberSuccessTests({
      phoneNumberMain: testUser_1.phoneNumber,
      phoneNumberTest: phoneNumber,
    });

    countryCodeSuccessTests({
      countryCodeMain: testUser_1.countryCode,
      countryCodeTest: countryCode,
    });

    countryNameSuccessTests({
      countryNameMain: testUser_1.countryName,
      countryNameTest: countryName,
    });

    privateIdSuccessTests({
      privateIdMain: testUser_1.privateId,
      privateIdTest: privateId,
    });
  });
});

describe("addContact failure tests", () => {
  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = testUsers;
    await customRequest.sendRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, CONTACT_ITEM_EXIST", async () => {
    const { testUser_2 } = testUsers;

    //   //* First one get succeed, but second one is duplicate
    await customRequest.sendRequest(testUser_2);
    await customRequest.sendRequest(testUser_2, CONTACT_ITEM_EXIST);
  });

  it("should get error, TARGET_USER_NOT_EXIST", async () => {
    const { countryCode, countryName } = countries[0];

    await customRequest.sendRequest(
      {
        phoneNumber: "1234567890",
        countryCode,
        countryName,
        firstName: "Stalwart",
        lastName: "SS!",
      },
      TARGET_USER_NOT_EXIST
    );
  });

  cellphoneFailureTests(contact);
  countryCodeFailureTests(contact);
  countryNameFailureTests(contact);
  phoneNumberFailureTests(contact);
  firstNameFailureTests(contact);
  lastNameFailureTests(contact);
  authenticationFailureTests();
});
