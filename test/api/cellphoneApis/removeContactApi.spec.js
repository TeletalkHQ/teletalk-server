const { describer } = require("@/functions/helpers/Describer");
const { userProps } = require("@/functions/helpers/UserProps");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  cellphoneRoutes: {
    removeContactRoute,
    addContactRoute,
    cellphoneRouteBaseUrl,
  },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userErrors: { CONTACT_ITEM_NOT_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");
const { countries } = require("@/variables/others/countries");

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
const { cellphoneFailureTests } = require("$/api/generalTests/cellphoneTests");

describer.addInitialDescribe(cellphoneRouteBaseUrl, removeContactRoute, "0");

describe("removeContact successful test", () => {
  it(`should add testUser_3 to testUser_0 contact list`, async () => {
    const { testUser_3 } = describer.state.testUsers;

    await customRequest.sendRequest(
      testUser_3,
      null,
      {
        token: customRequest.options.token,
      },
      cellphoneRouteBaseUrl,
      addContactRoute
    );

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
  const cellphone = userProps.makeTestCellphone();

  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = describer.state.testUsers;
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
