const {
  request,
  expect,
  getTestUsersFromState,
  setTestUserAndTestToken,
} = require("@/functions/utilities/testUtils");
const {
  randomStringNumber,
  randomCountryCode,
  randomString,
} = require("@/functions/utilities/utilsNoDeps");

const {
  cellphoneRoutes: {
    properties: {
      addBlockRoute: { properties: addBlockRoute },
      cellphoneRouteBaseUrl: { properties: cellphoneRouteBaseUrl },
    },
  },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userErrors: {
    properties: {
      BLACKLIST_ITEM_EXIST: { properties: BLACKLIST_ITEM_EXIST },
      CELLPHONE_REQUIRED: { properties: CELLPHONE_REQUIRED },
      COUNTRY_CODE_INVALID_TYPE: { properties: COUNTRY_CODE_INVALID_TYPE },
      COUNTRY_CODE_MAXLENGTH_REACH: {
        properties: COUNTRY_CODE_MAXLENGTH_REACH,
      },
      COUNTRY_CODE_MINLENGTH_REACH: {
        properties: COUNTRY_CODE_MINLENGTH_REACH,
      },
      COUNTRY_CODE_NOT_SUPPORTED: { properties: COUNTRY_CODE_NOT_SUPPORTED },
      COUNTRY_CODE_NUMERIC: { properties: COUNTRY_CODE_NUMERIC },
      COUNTRY_CODE_REQUIRED: { properties: COUNTRY_CODE_REQUIRED },
      COUNTRY_NAME_INVALID_TYPE: { properties: COUNTRY_NAME_INVALID_TYPE },
      COUNTRY_NAME_MAXLENGTH_REACH: {
        properties: COUNTRY_NAME_MAXLENGTH_REACH,
      },
      COUNTRY_NAME_MINLENGTH_REACH: {
        properties: COUNTRY_NAME_MINLENGTH_REACH,
      },
      COUNTRY_NAME_NOT_SUPPORTED: { properties: COUNTRY_NAME_NOT_SUPPORTED },
      COUNTRY_NAME_REQUIRED: { properties: COUNTRY_NAME_REQUIRED },
      PHONE_NUMBER_INVALID_TYPE: { properties: PHONE_NUMBER_INVALID_TYPE },
      PHONE_NUMBER_MAXLENGTH_REACH: {
        properties: PHONE_NUMBER_MAXLENGTH_REACH,
      },
      PHONE_NUMBER_MINLENGTH_REACH: {
        properties: PHONE_NUMBER_MINLENGTH_REACH,
      },
      PHONE_NUMBER_NUMERIC: { properties: PHONE_NUMBER_NUMERIC },
      PHONE_NUMBER_REQUIRED: { properties: PHONE_NUMBER_REQUIRED },
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

const countryCodeMaxlength = countryCodeModel.maxlength.value;
const countryCodeMinlength = countryCodeModel.minlength.value;
const countryNameMaxlength = countryNameModel.maxlength.value;
const countryNameMinlength = countryNameModel.minlength.value;
const phoneNumberMaxlength = phoneNumberModel.maxlength.value;
const phoneNumberMinlength = phoneNumberModel.minlength.value;

const cellphone = {
  ...countries[randomCountryCode()],
  phoneNumber: randomStringNumber(10),
};

const myRequest = (data, errorObject) => {
  return request(cellphoneRouteBaseUrl, addBlockRoute, data, errorObject);
};

describe("", () => {
  it("should fill testUsers object", async () => {
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
    } = await myRequest(testUser_1);

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
    await myRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, BLACKLIST_ITEM_EXIST", async () => {
    const { testUser_2 } = testUsers;

    //* First one get succeed, but second one is duplicate
    await myRequest(testUser_2);
    await myRequest(testUser_2, BLACKLIST_ITEM_EXIST);
  });

  //#region //! Copied from signInNormalApi.spec  !//
  it(`It should get error, CELLPHONE_REQUIRED`, async () => {
    await myRequest({}, CELLPHONE_REQUIRED);
  });

  it(`It should get error, PHONE_NUMBER_REQUIRED`, async () => {
    await myRequest(
      {
        countryCode: cellphone.countryCode,
        countryName: cellphone.countryName,
      },
      PHONE_NUMBER_REQUIRED
    );
  });
  it(`It should get error, PHONE_NUMBER_INVALID_TYPE`, async () => {
    await myRequest(
      {
        countryCode: cellphone.countryCode,
        countryName: cellphone.countryName,
        phoneNumber: 9119119191,
      },
      PHONE_NUMBER_INVALID_TYPE
    );
  });
  it(`It should get error, PHONE_NUMBER_NUMERIC`, async () => {
    await myRequest(
      {
        countryCode: cellphone.countryCode,
        countryName: cellphone.countryName,
        phoneNumber: "9119119191!",
      },
      PHONE_NUMBER_NUMERIC
    );
  });
  it(`It should get error, PHONE_NUMBER_MINLENGTH_REACH`, async () => {
    await myRequest(
      makeCellphone(
        cellphone.countryCode,
        cellphone.countryName,
        randomStringNumber(phoneNumberMinlength - 1)
      ),
      PHONE_NUMBER_MINLENGTH_REACH
    );
  });
  it(`It should get error, PHONE_NUMBER_MAXLENGTH_REACH`, async () => {
    await myRequest(
      makeCellphone(
        cellphone.countryCode,
        cellphone.countryName,
        randomStringNumber(phoneNumberMaxlength + 1)
      ),
      PHONE_NUMBER_MAXLENGTH_REACH
    );
  });

  it(`It should get error, COUNTRY_CODE_REQUIRED`, async () => {
    await myRequest(
      {
        countryName: cellphone.countryName,
        phoneNumber: cellphone.phoneNumber,
      },
      COUNTRY_CODE_REQUIRED
    );
  });
  it(`It should get error, COUNTRY_CODE_NUMERIC`, async () => {
    await myRequest(
      {
        countryCode: "98!",
        countryName: cellphone.countryName,
        phoneNumber: cellphone.phoneNumber,
      },
      COUNTRY_CODE_NUMERIC
    );
  });
  it(`It should get error, COUNTRY_CODE_INVALID_TYPE`, async () => {
    await myRequest(
      {
        countryCode: 98,
        countryName: cellphone.countryName,
        phoneNumber: cellphone.phoneNumber,
      },
      COUNTRY_CODE_INVALID_TYPE
    );
  });
  it(`It should get error, COUNTRY_CODE_NOT_SUPPORTED`, async () => {
    await myRequest(
      {
        countryCode: "010101",
        countryName: cellphone.countryName,
        phoneNumber: cellphone.phoneNumber,
      },
      COUNTRY_CODE_NOT_SUPPORTED
    );
  });
  it(`It should get error, COUNTRY_CODE_MINLENGTH_REACH`, async () => {
    await myRequest(
      {
        countryCode: randomStringNumber(countryCodeMinlength - 1),
        countryName: cellphone.countryName,
        phoneNumber: cellphone.phoneNumber,
      },
      COUNTRY_CODE_MINLENGTH_REACH
    );
  });
  it(`It should get error, COUNTRY_CODE_MAXLENGTH_REACH`, async () => {
    await myRequest(
      {
        countryCode: randomStringNumber(countryCodeMaxlength + 1),
        countryName: cellphone.countryName,
        phoneNumber: cellphone.phoneNumber,
      },
      COUNTRY_CODE_MAXLENGTH_REACH
    );
  });

  it(`It should get error, COUNTRY_NAME_REQUIRED`, async () => {
    await myRequest(
      {
        countryCode: cellphone.countryCode,
        phoneNumber: cellphone.phoneNumber,
      },
      COUNTRY_NAME_REQUIRED
    );
  });
  it(`It should get error, COUNTRY_NAME_NOT_SUPPORTED`, async () => {
    await myRequest(
      {
        countryCode: cellphone.countryCode,
        countryName: "Something wrong!",
        phoneNumber: cellphone.phoneNumber,
      },
      COUNTRY_NAME_NOT_SUPPORTED
    );
  });
  it(`It should get error, COUNTRY_NAME_INVALID_TYPE`, async () => {
    await myRequest(
      {
        countryCode: cellphone.countryCode,
        countryName: 1235468, //* Invalid type!
        phoneNumber: cellphone.phoneNumber,
      },
      COUNTRY_NAME_INVALID_TYPE
    );
  });
  it(`It should get error, COUNTRY_CODE_MINLENGTH_REACH`, async () => {
    await myRequest(
      {
        countryCode: cellphone.countryCode,
        countryName: randomString(countryNameMinlength - 1),
        phoneNumber: cellphone.phoneNumber,
      },
      COUNTRY_NAME_MINLENGTH_REACH
    );
  });
  it(`It should get error, COUNTRY_CODE_MAXLENGTH_REACH`, async () => {
    await myRequest(
      {
        countryCode: cellphone.countryCode,
        countryName: randomString(countryNameMaxlength + 1),
        phoneNumber: cellphone.phoneNumber,
      },
      COUNTRY_NAME_MAXLENGTH_REACH
    );
  });
  //#endregion
});
