const { request } = require("@/functions/testUtilities/testUtils");
const { userProps } = require("@/functions/helpers/UserProps");
const { customRequest } = require("@/functions/helpers/CustomRequest");
const {
  getTestUsersFromState,
} = require("@/functions/testUtilities/testUtils");

const {
  cellphoneRoutes: {
    removeContactRoute,
    addContactRoute,
    cellphoneRouteBaseUrl,
  },
} = require("@/variables/routes/cellphoneRoutes");

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
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");

const {
  userErrors: { CONTACT_ITEM_NOT_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");
const { countries } = require("@/variables/constants/countries");

const { cellphoneFailureTests } = require("$/api/generalTests/cellphoneTests");

let testUsers = {};

const cellphone = userProps.makeTestCellphone();

describe("", () => {
  it("should fill testUsers object", async () => {
    testUsers = await getTestUsersFromState();

    customRequest.setRequestRequirements(
      cellphoneRouteBaseUrl,
      removeContactRoute
    );
    customRequest.setMainTokenFromUserObject(testUsers.testUser_0);
  });
});

describe("removeContact successful test", () => {
  it(`should add testUser_3 to testUser_0 contact list`, async () => {
    const { testUser_3 } = testUsers;

    await request(cellphoneRouteBaseUrl, addContactRoute, testUser_3, null, {
      token: customRequest.options.token,
    });

    const {
      body: {
        removedContact: { phoneNumber, countryCode, countryName },
      },
    } = await customRequest.sendRequest(testUser_3);

    phoneNumberSuccessTests({
      phoneNumberMain: testUser_3.phoneNumber,
      phoneNumberTest: phoneNumber,
    });

    countryCodeSuccessTests({
      countryCodeMain: testUser_3.countryCode,
      countryCodeTest: countryCode,
    });

    countryNameSuccessTests({
      countryNameMain: testUser_3.countryName,
      countryNameTest: countryName,
    });
  });
});

describe("removeContact failure tests", () => {
  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = testUsers;
    await customRequest.sendRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, CONTACT_ITEM_NOT_EXIST", async () => {
    const { countryCode, countryName } = countries[0];

    await customRequest.sendRequest(
      userProps.makeCellphone(countryCode, countryName, "1234567890"),
      CONTACT_ITEM_NOT_EXIST
    );
  });

  cellphoneFailureTests();
  countryCodeFailureTests(cellphone);
  countryNameFailureTests(cellphone);
  phoneNumberFailureTests(cellphone);
  authenticationFailureTests();
});
