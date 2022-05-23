const { request } = require("@/functions/testUtilities/testUtils");
const { userProps } = require("@/functions/helpers/UserProps");
const { customRequest } = require("@/functions/helpers/CustomRequest");
const {
  getTestUsersFromState,
} = require("@/functions/testUtilities/testUtils");

const {
  cellphoneRoutes: { removeBlockRoute, addBlockRoute, cellphoneRouteBaseUrl },
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
  userErrors: { BLACKLIST_ITEM_NOT_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");
const { countries } = require("@/variables/constants/countries");

const { cellphoneFailureTests } = require("$/api/generalTests/cellphoneTests");

let testUsers = {};

const cellphone = userProps.makeTestCellphone();

describe("", () => {
  it("should set routes objects and fill testUsers", async () => {
    testUsers = await getTestUsersFromState();

    customRequest.setRequestRequirements(
      cellphoneRouteBaseUrl,
      removeBlockRoute
    );
    customRequest.setMainTokenFromUserObject(testUsers.testUser_0);
  });
});

describe("removeContact successful test", () => {
  it(`should add testUser_3 to testUser_0 contact list`, async () => {
    const { testUser_3 } = testUsers;

    await request(cellphoneRouteBaseUrl, addBlockRoute, testUser_3, null, {
      token: customRequest.options.token,
    });
    const {
      body: {
        removedBlockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await customRequest.sendRequest(testUser_3);

    phoneNumberSuccessTests(
      {
        phoneNumberMain: testUser_3.phoneNumber,
        phoneNumberTest: phoneNumber,
      },
      {
        modelCheck: true,
        stringEquality: true,
      }
    );

    countryCodeSuccessTests(
      {
        countryCodeMain: testUser_3.countryCode,
        countryCodeTest: countryCode,
      },
      { modelCheck: true, stringEquality: true }
    );

    countryNameSuccessTests(
      {
        countryNameMain: testUser_3.countryName,
        countryNameTest: countryName,
      },
      { modelCheck: true, stringEquality: true }
    );
  });
});

describe("removeBlock failure tests", () => {
  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = testUsers;
    await customRequest.sendRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, BLACKLIST_ITEM_NOT_EXIST", async () => {
    const { countryCode, countryName } = countries[0];

    await customRequest.sendRequest(
      userProps.makeCellphone(countryCode, countryName, "1234567890"),
      BLACKLIST_ITEM_NOT_EXIST
    );
  });

  cellphoneFailureTests();
  countryCodeFailureTests(cellphone);
  countryNameFailureTests(cellphone);
  phoneNumberFailureTests(cellphone);
  authenticationFailureTests();
});
