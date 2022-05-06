const {
  setTestUserAndTestToken,
  request,
  expect,
} = require("@/functions/utilities/testUtils");
const { getTestUsersFromState } = require("@/functions/utilities/testUtils");
const {
  randomStringNumber,
  randomCountryCode,
  randomString,
} = require("@/functions/utilities/utilsNoDeps");

const {
  userModels: {
    properties: {
      phoneNumberModel: { properties: phoneNumberModel },
      countryNameModel: { properties: countryNameModel },
      countryCodeModel: { properties: countryCodeModel },
    },
  },
} = require("@/models/userModels/userModels");

const {
  cellphoneRoutes: {
    properties: {
      removeContactRoute: { properties: removeContactRoute },
      addContactRoute: { properties: addContactRoute },
      cellphoneRouteBaseUrl: { properties: cellphoneRouteBaseUrl },
    },
  },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userErrors: {
    properties: {
      CELLPHONE_REQUIRED: { properties: CELLPHONE_REQUIRED },
      CONTACT_ITEM_NOT_EXIST: { properties: CONTACT_ITEM_NOT_EXIST },
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
      COUNTRY_NAME_MAXLENGTH_REACH: {
        properties: COUNTRY_NAME_MAXLENGTH_REACH,
      },
      COUNTRY_NAME_MINLENGTH_REACH: {
        properties: COUNTRY_NAME_MINLENGTH_REACH,
      },
      COUNTRY_NAME_NOT_SUPPORTED: { properties: COUNTRY_NAME_NOT_SUPPORTED },
      COUNTRY_NAME_REQUIRED: { properties: COUNTRY_NAME_REQUIRED },
      PHONE_NUMBER_INVALID_TYPE: { properties: PHONE_NUMBER_INVALID_TYPE },
      PHONE_NUMBER_NUMERIC: { properties: PHONE_NUMBER_NUMERIC },
      PHONE_NUMBER_REQUIRED: { properties: PHONE_NUMBER_REQUIRED },
      SELF_STUFF: { properties: SELF_STUFF },
      PHONE_NUMBER_MINLENGTH_REACH: {
        properties: PHONE_NUMBER_MINLENGTH_REACH,
      },
      PHONE_NUMBER_MAXLENGTH_REACH: {
        properties: PHONE_NUMBER_MAXLENGTH_REACH,
      },
    },
  },
} = require("@/variables/errors/userErrors");
const { countries } = require("@/variables/constants/countries");

let testUsers = {};

const cellphone = {
  ...countries[randomCountryCode()],
  phoneNumber: randomStringNumber(10),
};

const myRequest = (data, errorObject) => {
  return request(cellphoneRouteBaseUrl, removeContactRoute, data, errorObject);
};

const makeCellphone = (countryCode, countryName, phoneNumber) => ({
  countryCode,
  countryName,
  phoneNumber,
});

describe("", () => {
  it("should fill testUsers object", async () => {
    testUsers = await getTestUsersFromState();

    setTestUserAndTestToken(testUsers.testUser_0);
  });
});

const countryCodeMaxlength = countryCodeModel.maxlength.value;
const countryCodeMinlength = countryCodeModel.minlength.value;
const countryNameMaxlength = countryNameModel.maxlength.value;
const countryNameMinlength = countryNameModel.minlength.value;
const phoneNumberMaxlength = phoneNumberModel.maxlength.value;
const phoneNumberMinlength = phoneNumberModel.minlength.value;

describe("removeContact successful test", () => {
  it(`should add testUser_3 to testUser_0 contact list`, async () => {
    const { testUser_3 } = testUsers;

    await request(cellphoneRouteBaseUrl, addContactRoute, testUser_3);
    const {
      body: {
        removedContact: { phoneNumber, countryCode, countryName },
      },
    } = await myRequest(testUser_3);

    expect(phoneNumber).equal(testUser_3.phoneNumber);
    expect(phoneNumber.length)
      .greaterThanOrEqual(phoneNumberMinlength)
      .lessThanOrEqual(phoneNumberMaxlength);

    expect(countryCode).equal(testUser_3.countryCode);
    expect(countryCode.length)
      .greaterThanOrEqual(countryCodeMinlength)
      .lessThanOrEqual(countryCodeMaxlength);

    expect(countryName).equal(testUser_3.countryName);
    expect(countryName.length)
      .greaterThanOrEqual(countryNameMinlength)
      .lessThanOrEqual(countryNameMaxlength);
  });
});

describe("removeContact failure tests", () => {
  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = testUsers;
    await myRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, CONTACT_ITEM_NOT_EXIST", async () => {
    const { countryCode, countryName } = countries[0];

    await myRequest(
      makeCellphone(countryCode, countryName, "1234567890"),
      CONTACT_ITEM_NOT_EXIST
    );
  });

  //#region //! Copied from signInNormalApi.spec  !//
  it(`It should get error, CELLPHONE_REQUIRED`, async () => {
    await myRequest(makeCellphone(), CELLPHONE_REQUIRED);
  });

  it(`It should get error, PHONE_NUMBER_REQUIRED`, async () => {
    await myRequest(
      makeCellphone(cellphone.countryCode, cellphone.countryName),
      PHONE_NUMBER_REQUIRED
    );
  });
  it(`It should get error, PHONE_NUMBER_INVALID_TYPE`, async () => {
    await myRequest(
      makeCellphone(cellphone.countryCode, cellphone.countryName, 9119119191),
      PHONE_NUMBER_INVALID_TYPE
    );
  });
  it(`It should get error, PHONE_NUMBER_NUMERIC`, async () => {
    await myRequest(
      makeCellphone(
        cellphone.countryCode,
        cellphone.countryName,
        "9119119191!"
      ),
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
      makeCellphone(undefined, cellphone.countryName, cellphone.phoneNumber),
      COUNTRY_CODE_REQUIRED
    );
  });
  it(`It should get error, COUNTRY_CODE_NUMERIC`, async () => {
    await myRequest(
      makeCellphone("98!", cellphone.countryName, cellphone.phoneNumber),
      COUNTRY_CODE_NUMERIC
    );
  });
  it(`It should get error, COUNTRY_CODE_INVALID_TYPE`, async () => {
    await myRequest(
      makeCellphone(98, cellphone.countryName, cellphone.phoneNumber),
      COUNTRY_CODE_INVALID_TYPE
    );
  });
  it(`It should get error, COUNTRY_CODE_MINLENGTH_REACH`, async () => {
    await myRequest(
      makeCellphone(
        randomStringNumber(countryCodeMinlength - 1),
        cellphone.countryName,
        cellphone.phoneNumber
      ),
      COUNTRY_CODE_MINLENGTH_REACH
    );
  });
  it(`It should get error, COUNTRY_CODE_MAXLENGTH_REACH`, async () => {
    await myRequest(
      makeCellphone(
        randomStringNumber(countryCodeMaxlength + 1),
        cellphone.countryName,
        cellphone.phoneNumber
      ),
      COUNTRY_CODE_MAXLENGTH_REACH
    );
  });
  it(`It should get error, COUNTRY_CODE_NOT_SUPPORTED`, async () => {
    await myRequest(
      makeCellphone("010101", cellphone.countryName, cellphone.phoneNumber),
      COUNTRY_CODE_NOT_SUPPORTED
    );
  });

  it(`It should get error, COUNTRY_NAME_REQUIRED`, async () => {
    await myRequest(
      makeCellphone(cellphone.countryCode, undefined, cellphone.phoneNumber),
      COUNTRY_NAME_REQUIRED
    );
  });
  it(`It should get error, COUNTRY_NAME_NOT_SUPPORTED`, async () => {
    await myRequest(
      makeCellphone(
        cellphone.countryCode,
        "Something wrong!",
        cellphone.phoneNumber
      ),
      COUNTRY_NAME_NOT_SUPPORTED
    );
  });
  it(`It should get error, COUNTRY_CODE_MINLENGTH_REACH`, async () => {
    await myRequest(
      makeCellphone(
        cellphone.countryCode,
        randomString(countryNameMinlength - 1),
        cellphone.phoneNumber
      ),
      COUNTRY_NAME_MINLENGTH_REACH
    );
  });
  it(`It should get error, COUNTRY_CODE_MAXLENGTH_REACH`, async () => {
    await myRequest(
      makeCellphone(
        cellphone.countryCode,
        randomString(countryNameMaxlength + 1),
        cellphone.phoneNumber
      ),
      COUNTRY_NAME_MAXLENGTH_REACH
    );
  });
  //#endregion
});
