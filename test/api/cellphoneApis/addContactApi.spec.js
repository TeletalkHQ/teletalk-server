const {
  expect,
  setTestUserAndTestToken,
  getTestUsersFromState,
} = require("@/functions/utilities/testUtils");
const { userProps } = require("@/functions/helpers/UserProps");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  userModels: { privateIdModel, firstNameModel, lastNameModel },
} = require("@/models/userModels/userModels");

const {
  cellphoneRoutes: { addContactRoute, cellphoneRouteBaseUrl },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userErrors: { CONTACT_ITEM_EXIST, SELF_STUFF, TARGET_USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");
const { countries } = require("@/variables/constants/countries");

const { countryCodeFailureTests } = require("$/api/userTests/countryCodeTests");
const { phoneNumberFailureTests } = require("$/api/userTests/phoneNumberTests");
const { countryNameFailureTests } = require("$/api/userTests/countryNameTests");
const { firstNameFailureTests } = require("$/api/userTests/firstNameTests");
const { lastNameFailureTests } = require("$/api/userTests/lastNameTests");
const { cellphoneFailureTests } = require("$/api/userTests/cellphoneTests");

let testUsers = {};

const contact = userProps.makeTestContact();

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

    //   //* First one get succeed, but second one is duplicate
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

  cellphoneFailureTests();
  countryCodeFailureTests(contact);
  countryNameFailureTests(contact);
  phoneNumberFailureTests(contact);
  firstNameFailureTests(contact);
  lastNameFailureTests(contact);
});
