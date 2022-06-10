const { userProps } = require("@/classes/UserProps");
const { customRequest } = require("@/classes/CustomRequest");
const { describer } = require("@/classes/Describer");

const {
  cellphoneRoutes: { cellphoneRouteBaseUrl, addBlockRoute },
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
const { cellphoneFailureTests } = require("$/api/generalTests/cellphoneTests");
const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");

const {
  userErrors: { BLACKLIST_ITEM_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");
const { stateManager } = require("@/functions/tools/StateManager");

describer.addInitialDescribe(cellphoneRouteBaseUrl, addBlockRoute, "0");

describe("addBlock successful tests", () => {
  it(`should add testUser_1 to testUser_0 blacklist`, async () => {
    const { testUser_1 } = stateManager.state.testUsers;

    const {
      body: {
        blockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await customRequest.sendRequest(testUser_1);

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
  });
});

//CLEANME SELF_STUFF BLACKLIST_ITEM_EXIST tests
describe("addBlock failure tests", () => {
  const cellphone = userProps.makeTestCellphone();

  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = stateManager.state.testUsers;
    await customRequest.sendRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, BLACKLIST_ITEM_EXIST", async () => {
    const { testUser_2 } = stateManager.state.testUsers;

    //* First one get succeed, but second one is duplicate
    await customRequest.sendRequest(testUser_2);
    await customRequest.sendRequest(testUser_2, BLACKLIST_ITEM_EXIST);
  });

  cellphoneFailureTests();
  countryCodeFailureTests(cellphone);
  countryNameFailureTests(cellphone);
  phoneNumberFailureTests(cellphone);
  authenticationFailureTests();
});
