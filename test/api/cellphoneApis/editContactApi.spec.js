const {
  expect,
  setTestUserProps,
  getTestUsersFromState,
  request,
} = require("@/functions/utilities/testUtils");
const { userProps } = require("@/functions/helpers/UserProps");
const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  userModels: { privateIdModel, firstNameModel, lastNameModel },
} = require("@/models/userModels/userModels");

const {
  cellphoneRoutes: { addContactRoute, editContactRoute, cellphoneRouteBaseUrl },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userErrors: { CONTACT_ITEM_NOT_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");

const {
  countryCodeFailureTests,
} = require("$/api/generalTests/countryCodeTests");
const {
  phoneNumberFailureTests,
} = require("$/api/generalTests/phoneNumberTests");
const {
  countryNameFailureTests,
} = require("$/api/generalTests/countryNameTests");
const { firstNameFailureTests } = require("$/api/generalTests/firstNameTests");
const { lastNameFailureTests } = require("$/api/generalTests/lastNameTests");
const { cellphoneFailureTests } = require("$/api/generalTests/cellphoneTests");

let testUsers = {};

const contact = userProps.makeTestContact();

describe("", () => {
  it("should fill testUsers object", async () => {
    customRequest.setBaseUrl(cellphoneRouteBaseUrl);
    customRequest.setRouteObject(editContactRoute);

    testUsers = await getTestUsersFromState();

    setTestUserProps(testUsers.testUser_0);
  });
});

describe("edit contact success tests", () => {
  it(`should add and edit testUser_1 on testUser_0 contact list`, async () => {
    const { testUser_4 } = testUsers;

    const {
      body: {
        addedContact: { firstName, lastName, privateId },
      },
    } = await request(cellphoneRouteBaseUrl, addContactRoute, testUser_4);

    expect(firstName).equal(testUser_4.firstName);
    expect(firstName.length)
      .greaterThanOrEqual(firstNameModel.minlength.value)
      .lessThanOrEqual(firstNameModel.maxlength.value);

    expect(lastName).equal(testUser_4.lastName);
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
      body: {
        editedContact: { firstName: newFirstName, lastName: newLastName },
      },
    } = await customRequest.sendRequest({
      ...testUser_4,
      ...editedFullName,
    });

    expect(editedFullName.firstName).equal(newFirstName);
    expect(newFirstName.length)
      .greaterThanOrEqual(firstNameModel.minlength.value)
      .lessThanOrEqual(firstNameModel.maxlength.value);

    expect(newLastName).equal(editedFullName.lastName);
    expect(newLastName.length)
      .greaterThanOrEqual(lastNameModel.minlength.value)
      .lessThanOrEqual(lastNameModel.maxlength.value);
  });
});

describe("editContact failure tests", () => {
  it("should get error, SELF_STUFF", async () => {
    const { testUser_0 } = testUsers;
    await customRequest.sendRequest(testUser_0, SELF_STUFF);
  });

  it("should get error, CONTACT_ITEM_NOT_EXIST", async () => {
    const { testUser_10 } = testUsers;

    await customRequest.sendRequest(testUser_10, CONTACT_ITEM_NOT_EXIST);
  });

  cellphoneFailureTests(contact);
  countryCodeFailureTests(contact);
  countryNameFailureTests(contact);
  phoneNumberFailureTests(contact);
  firstNameFailureTests(contact);
  lastNameFailureTests(contact);
});
