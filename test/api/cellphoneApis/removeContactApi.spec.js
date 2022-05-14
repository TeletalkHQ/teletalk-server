const {
  setTestUserProps,
  request,
  expect,
} = require("@/functions/utilities/testUtils");
const { userProps } = require("@/functions/helpers/UserProps");
const { customRequest } = require("@/functions/helpers/CustomRequest");
const { getTestUsersFromState } = require("@/functions/utilities/testUtils");

const {
  userModels: { phoneNumberModel, countryNameModel, countryCodeModel },
} = require("@/models/userModels/userModels");

const {
  cellphoneRoutes: {
    removeContactRoute,
    addContactRoute,
    cellphoneRouteBaseUrl,
  },
} = require("@/variables/routes/cellphoneRoutes");

const {
  countryCodeFailureTests,
} = require("$/api/generalTests/countryCodeTests");
const {
  phoneNumberFailureTests,
} = require("$/api/generalTests/phoneNumberTests");
const {
  countryNameFailureTests,
} = require("$/api/generalTests/countryNameTests");

const {
  userErrors: { CONTACT_ITEM_NOT_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");
const { countries } = require("@/variables/constants/countries");

const { cellphoneFailureTests } = require("$/api/generalTests/cellphoneTests");

let testUsers = {};

const cellphone = userProps.makeTestCellphone();

describe("", () => {
  it("should fill testUsers object", async () => {
    customRequest.setBaseUrl(cellphoneRouteBaseUrl);
    customRequest.setRouteObject(removeContactRoute);

    testUsers = await getTestUsersFromState();

    setTestUserProps(testUsers.testUser_0);
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
    } = await customRequest.sendRequest(testUser_3);

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
});
