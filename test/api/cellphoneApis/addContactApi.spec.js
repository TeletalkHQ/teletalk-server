const {
  request,
  expect,
  setTestUserAndTestToken,
  getTestUsersFromState,
} = require("@/functions/utilities/testUtils");
const { randomString } = require("@/functions/utilities/utilsNoDeps");
const {
  randomStringNumber,
  randomCountryCode,
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
      addContactRoute: { properties: addContactRoute },
      cellphoneRouteBaseUrl: { properties: cellphoneRouteBaseUrl },
    },
  },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userErrors: {
    properties: {
      CELLPHONE_REQUIRED: { properties: CELLPHONE_REQUIRED },
      CONTACT_ITEM_EXIST: { properties: CONTACT_ITEM_EXIST },
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
      FIRST_NAME_INVALID_TYPE: { properties: FIRST_NAME_INVALID_TYPE },
      FIRST_NAME_MAXLENGTH_REACH: { properties: FIRST_NAME_MAXLENGTH_REACH },
      FIRST_NAME_MINLENGTH_REACH: { properties: FIRST_NAME_MINLENGTH_REACH },
      FIRST_NAME_REQUIRED: { properties: FIRST_NAME_REQUIRED },
      LAST_NAME_INVALID_TYPE: { properties: LAST_NAME_INVALID_TYPE },
      LAST_NAME_MAXLENGTH_REACH: { properties: LAST_NAME_MAXLENGTH_REACH },
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
      TARGET_USER_NOT_EXIST: { properties: TARGET_USER_NOT_EXIST },
    },
  },
} = require("@/variables/errors/userErrors");
const { countries } = require("@/variables/constants/countries");

const {
  userModels: {
    properties: {
      privateIdModel: { properties: privateIdModel },
      firstNameModel: { properties: firstNameModel },
      lastNameModel: { properties: lastNameModel },
    },
  },
} = require("@/models/userModels/userModels");

let testUsers = {};

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

const userContact = (firstName, lastName) => ({
  firstName,
  lastName,
  ...cellphone,
});

const myRequest = (data, errorObject) => {
  return request(cellphoneRouteBaseUrl, addContactRoute, data, errorObject);
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

describe("add contact successfully", () => {
  it(`should add testUser_1 to testUser_0 contact list`, async () => {
    const { testUser_1 } = testUsers;

    const {
      body: {
        addedContact: { firstName, lastName, privateId },
      },
    } = await myRequest(testUser_1);

    expect(firstName).equal(testUser_1.firstName);
    expect(firstName.length)
      .greaterThanOrEqual(firstNameModel.minlength.value)
      .lessThanOrEqual(firstNameModel.maxlength.value);

    expect(lastName).equal(testUser_1.lastName);
    expect(lastName.length)
      .greaterThanOrEqual(lastNameModel.minlength.value)
      .lessThanOrEqual(lastNameModel.maxlength.value);

    expect(privateId).to.be.a(privateIdModel.type.value);
    expect(privateId.length)
      .greaterThanOrEqual(privateIdModel.minlength.value)
      .lessThanOrEqual(privateIdModel.maxlength.value);
  });
});

describe("addContact failure tests", () => {
  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = testUsers;
    await myRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, CONTACT_ITEM_EXIST", async () => {
    const { testUser_2 } = testUsers;

    //* First one get succeed, but second one is duplicate &_&
    await myRequest(testUser_2);
    await myRequest(testUser_2, CONTACT_ITEM_EXIST);
  });

  it("should get error, TARGET_USER_NOT_EXIST", async () => {
    const { countryCode, countryName } = countries[0];

    await myRequest(
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

  //* after countryCode:countryName:phoneNumber get passed, its time to validate firstName:lastName

  //#region //! Copied from createNewUserApi.spec  !//
  const lastNameMaxLength = lastNameModel.maxlength.value;
  const firstNameMaxLength = firstNameModel.maxlength.value;
  const firstNameMinLength = firstNameModel.minlength.value;

  it("should get error, FIRST_NAME_REQUIRED", async () => {
    await myRequest(
      userContact(undefined, randomString(lastNameMaxLength)),
      FIRST_NAME_REQUIRED
    );
  });
  it("should get error, FIRST_NAME_MINLENGTH_REACH", async () => {
    await myRequest(
      userContact(randomString(+firstNameMinLength - 1), undefined),
      FIRST_NAME_MINLENGTH_REACH
    );
  });
  it("should get error, FIRST_NAME_MAXLENGTH_REACH", async () => {
    await myRequest(
      userContact(randomString(+firstNameMaxLength + 1), undefined),
      FIRST_NAME_MAXLENGTH_REACH
    );
  });
  it("should get error, FIRST_NAME_INVALID_TYPE", async () => {
    await myRequest(
      userContact(
        123456789, //* Invalid type!
        undefined
      ),
      FIRST_NAME_INVALID_TYPE
    );
  });

  it("should get error, LAST_NAME_MAXLENGTH_REACH", async () => {
    await myRequest(
      userContact(
        randomString(firstNameMaxLength),
        randomString(lastNameMaxLength + 1)
      ),
      LAST_NAME_MAXLENGTH_REACH
    );
  });
  it("should get error, LAST_NAME_INVALID_TYPE", async () => {
    await myRequest(
      userContact(
        randomString(firstNameMaxLength),
        123456789 //* Invalid type!
      ),
      LAST_NAME_INVALID_TYPE
    );
  });

  //#endregion
});
