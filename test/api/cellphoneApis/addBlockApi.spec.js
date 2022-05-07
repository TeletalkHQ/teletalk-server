const {
  expect,
  getTestUsersFromState,
  setTestUserAndTestToken,
} = require("@/functions/utilities/testUtils");
const {
  randomStringNumber,
  randomCountryCode,
} = require("@/functions/utilities/utilsNoDeps");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  cellphoneRoutes: {
    properties: {
      addBlockRoute: { properties: addBlockRoute },
      cellphoneRouteBaseUrl: { properties: cellphoneRouteBaseUrl },
    },
  },
} = require("@/variables/routes/cellphoneRoutes");

const {
  countryCodeFailureTests,
} = require("$/api/cellphoneApis/cellphoneTests/countryCodeTests");
const {
  phoneNumberFailureTests,
} = require("$/api/cellphoneApis/cellphoneTests/phoneNumberTests");
const {
  countryNameFailureTests,
} = require("$/api/cellphoneApis/cellphoneTests/countryNameTests");

const {
  userErrors: {
    properties: {
      BLACKLIST_ITEM_EXIST: { properties: BLACKLIST_ITEM_EXIST },
      CELLPHONE_REQUIRED: { properties: CELLPHONE_REQUIRED },
      SELF_STUFF: { properties: SELF_STUFF },
    },
  },
} = require("@/variables/errors/userErrors");
const { countries } = require("@/variables/constants/countries");

const {
  userModels: {
    properties: {
      phoneNumberModel: { properties: phoneNumberModel },
      countryNameModel: { properties: countryNameModel },
      countryCodeModel: { properties: countryCodeModel },
    },
  },
} = require("@/models/userModels/userModels");

let testUsers = {};

const makeCellphone = (countryCode, countryName, phoneNumber) => ({
  countryCode,
  countryName,
  phoneNumber,
});

const country = countries[randomCountryCode()];
const cellphone = makeCellphone(
  country.countryCode,
  country.countryName,
  randomStringNumber(10)
);

describe("", () => {
  it("should fill testUsers object", async () => {
    customRequest.setBaseUrl(cellphoneRouteBaseUrl);
    customRequest.setRouteObject(addBlockRoute);

    testUsers = await getTestUsersFromState();

    setTestUserAndTestToken(testUsers.testUser_0);
  });
});

describe("addBlock successful tests", () => {
  it(`should add testUser_1 to testUser_0 blacklist`, async () => {
    const { testUser_1 } = testUsers;

    const {
      body: {
        blockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await customRequest.sendRequest(testUser_1);

    expect(phoneNumber).equal(testUser_1.phoneNumber);
    expect(phoneNumber.length)
      .greaterThanOrEqual(phoneNumberModel.minlength.value)
      .lessThanOrEqual(phoneNumberModel.maxlength.value);

    expect(countryCode).equal(testUser_1.countryCode);
    expect(countryCode.length)
      .greaterThanOrEqual(countryCodeModel.minlength.value)
      .lessThanOrEqual(countryCodeModel.maxlength.value);

    expect(countryName).equal(testUser_1.countryName);
    expect(countryName.length)
      .greaterThanOrEqual(countryNameModel.minlength.value)
      .lessThanOrEqual(countryNameModel.maxlength.value);
  });
});

describe("addBlock failure tests", () => {
  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = testUsers;
    await customRequest.sendRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, BLACKLIST_ITEM_EXIST", async () => {
    const { testUser_2 } = testUsers;

    //* First one get succeed, but second one is duplicate
    await customRequest.sendRequest(testUser_2);
    await customRequest.sendRequest(testUser_2, BLACKLIST_ITEM_EXIST);
  });

  it(`It should get error, CELLPHONE_REQUIRED`, async () => {
    await customRequest.sendRequest({}, CELLPHONE_REQUIRED);
  });

  countryCodeFailureTests(cellphone);
  countryNameFailureTests(cellphone);
  phoneNumberFailureTests(cellphone);
});
