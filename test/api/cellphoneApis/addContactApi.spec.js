const {
  expect,
  setTestUserAndTestToken,
  getTestUsersFromState,
} = require("@/functions/utilities/testUtils");
const { customRequest } = require("@/functions/helpers/CustomRequest");
const { makeCellphone } = require("@/functions/utilities/utilsNoDeps");
const {
  randomStringNumber,
  randomCountryCode,
} = require("@/functions/utilities/utilsNoDeps");

const {
  userModels: {
    properties: {
      privateIdModel: { properties: privateIdModel },
      firstNameModel: { properties: firstNameModel },
      lastNameModel: { properties: lastNameModel },
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
      SELF_STUFF: { properties: SELF_STUFF },
      TARGET_USER_NOT_EXIST: { properties: TARGET_USER_NOT_EXIST },
    },
  },
} = require("@/variables/errors/userErrors");
const { countries } = require("@/variables/constants/countries");

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
  firstNameFailureTests,
} = require("$/api/cellphoneApis/cellphoneTests/firstNameTests");
const {
  lastNameFailureTests,
} = require("$/api/cellphoneApis/cellphoneTests/lastNameTests");

let testUsers = {};

const country = countries[randomCountryCode()];
const cellphone = makeCellphone(
  country.countryCode,
  country.countryName,
  randomStringNumber(10)
);

describe("", () => {
  it("should fill testUsers object", async () => {
    customRequest.setBaseUrl(cellphoneRouteBaseUrl);
    customRequest.setRouteObject(addContactRoute);

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
    } = await customRequest.sendRequest(testUser_1);

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
    await customRequest.sendRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, CONTACT_ITEM_EXIST", async () => {
    const { testUser_2 } = testUsers;

    //* First one get succeed, but second one is duplicate &_&
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

  //#region //! Copied from signInNormalApi.spec  !//
  it(`It should get error, CELLPHONE_REQUIRED`, async () => {
    await customRequest.sendRequest({}, CELLPHONE_REQUIRED);
  });

  //* after countryCode:countryName:phoneNumber get passed, its time to validate firstName:lastName
  countryCodeFailureTests(cellphone);
  countryNameFailureTests(cellphone);
  phoneNumberFailureTests(cellphone);
  firstNameFailureTests(cellphone);
  lastNameFailureTests(cellphone);
});
