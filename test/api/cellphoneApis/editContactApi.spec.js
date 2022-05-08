const {
  expect,
  setTestUserAndTestToken,
  getTestUsersFromState,
  makeTestCellphone,
  request,
} = require("@/functions/utilities/testUtils");
const { CustomRequest } = require("@/functions/helpers/CustomRequest");

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
      editContactRoute: { properties: editContactRoute },
      cellphoneRouteBaseUrl: { properties: cellphoneRouteBaseUrl },
    },
  },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userErrors: {
    properties: {
      CONTACT_ITEM_NOT_EXIST: { properties: CONTACT_ITEM_NOT_EXIST },
      SELF_STUFF: { properties: SELF_STUFF },
    },
  },
} = require("@/variables/errors/userErrors");

const { countryCodeFailureTests } = require("$/api/userTests/countryCodeTests");
const { phoneNumberFailureTests } = require("$/api/userTests/phoneNumberTests");
const { countryNameFailureTests } = require("$/api/userTests/countryNameTests");
const { firstNameFailureTests } = require("$/api/userTests/firstNameTests");
const { lastNameFailureTests } = require("$/api/userTests/lastNameTests");
const { cellphoneFailureTests } = require("$/api/userTests/cellphoneTests");

let testUsers = {};

const cellphone = makeTestCellphone();

describe("", () => {
  it("should fill testUsers object", async () => {
    CustomRequest.setBaseUrl(cellphoneRouteBaseUrl);
    CustomRequest.setRouteObject(editContactRoute);

    testUsers = await getTestUsersFromState();

    setTestUserAndTestToken(testUsers.testUser_0);
  });
});

describe("edit contact success tests", () => {
  it(`should add and edit testUser_1 on testUser_0 contact list`, async () => {
    const { testUser_1 } = testUsers;

    const {
      body: {
        addedContact: { firstName, lastName, privateId },
      },
    } = await request(cellphoneRouteBaseUrl, addContactRoute, testUser_1);

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

    const editedFullName = {
      firstName: "new firstName",
      lastName: "new lastName",
    };
    const {
      editedContact: {
        phoneNumber,
        countryCode,
        countryName,
        firstName: newFirstName,
        lastName: newLastName,
      },
    } = await CustomRequest.sendRequest({
      ...testUser_1,
      ...editedFullName,
    });

    // expect(editedFullName.firstName).equal(newFirstName);
    // expect(newFirstName.length)
    //   .greaterThanOrEqual(firstNameModel.minlength.value)
    //   .lessThanOrEqual(firstNameModel.maxlength.value);

    // expect(newLastName).equal(editedFullName.lastName);
    // expect(newLastName.length)
    //   .greaterThanOrEqual(lastNameModel.minlength.value)
    //   .lessThanOrEqual(lastNameModel.maxlength.value);
  });
});

// describe("editContact failure tests", () => {
//   it("should get error, SELF_STUFF", async () => {
//     const { testUser_0 } = testUsers;
//     await CustomRequest.sendRequest(testUser_0, SELF_STUFF);
//   });

//   it("should get error, CONTACT_ITEM_NOT_EXIST", async () => {
//     const { testUser_10 } = testUsers;

//     await CustomRequest.sendRequest(testUser_10, CONTACT_ITEM_NOT_EXIST);
//   });

// cellphoneFailureTests();
// countryCodeFailureTests(cellphone);
// countryNameFailureTests(cellphone);
// phoneNumberFailureTests(cellphone);
// firstNameFailureTests(cellphone);
// lastNameFailureTests(cellphone);
// });
