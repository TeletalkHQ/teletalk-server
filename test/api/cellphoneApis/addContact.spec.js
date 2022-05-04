const { setTestUserAndTestToken } = require("@/functions/utilities/testUtils");
const { getTestUsers } = require("@/functions/utilities/utils");
const { request, expect } = require("@/functions/utilities/testUtils");

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
      SELF_STUFF,
      CONTACT_ITEM_EXIST,
      CONTACT_ITEM_NOT_EXIST,
      CONTACT_INVALID_TYPE,
    },
  },
} = require("@/variables/errors/userErrors");

const {
  userModels: {
    properties: {
      privateIdModel: { properties: privateIdModel },
    },
  },
} = require("@/models/userModels/userModels");

let testUsers = {};

before(async () => {
  const testUsers = await getTestUsers();
  setTestUserAndTestToken(testUsers.testUser_0);
});

describe("add contact successfully", () => {
  it(`should add testUser_1 to testUser_0 contact list`, async () => {
    const { testUser_1 } = testUsers;
    const {
      body: {
        contact: { firstName, lastName, privateId },
      },
    } = await request(cellphoneRouteBaseUrl, addContactRoute, testUser_1);

    expect(firstName).equal(testUser_1.firstName);
    expect(lastName).equal(testUser_1.lastName);
    expect(privateId).to.be.a(privateIdModel.type.value);
    expect(privateId.length)
      .greaterThanOrEqual(privateIdModel.minlength.value)
      .lessThanOrEqual(privateIdModel.maxlength.value);
  });
});

describe("addContact failure", () => {
  it("should get error, SELF_STUFF", () => {});
});
