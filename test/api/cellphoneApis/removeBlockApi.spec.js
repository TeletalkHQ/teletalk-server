const { userProps } = require("@/classes/UserProps");
const { customRequest } = require("@/classes/CustomRequest");
const { describer } = require("@/classes/Describer");
const { stateManager } = require("@/functions/tools/StateManager");

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
const { countries } = require("@/variables/others/countries");

const { cellphoneFailureTests } = require("$/api/generalTests/cellphoneTests");

describer.addInitialDescribe(cellphoneRouteBaseUrl, removeBlockRoute, "0");

describe("removeContact successful test", () => {
  it(`should add testUser_3 to testUser_0 contact list`, async () => {
    const { testUser_3 } = stateManager.state.testUsers;

    await customRequest.sendRequest(
      testUser_3,
      null,
      {
        token: customRequest.options.token,
      },
      cellphoneRouteBaseUrl,
      addBlockRoute
    );
    const {
      body: {
        removedBlockedCellphone: { phoneNumber, countryCode, countryName },
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

describe("removeBlock failure tests", () => {
  const cellphone = userProps.makeTestCellphone();

  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = stateManager.state.testUsers;
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
