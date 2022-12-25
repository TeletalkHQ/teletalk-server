const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities/requesters");

const { testVariablesManager } = require("$/classes/TestVariablesManager");
const { countries } = require("@/variables/others/countries");

const users = testVariablesManager.getUsers();

describe("addBlock successful tests", () => {
  it("should add addBlockSuccessfulTestUser to testUser_0 blacklist", async () => {
    const {
      body: {
        blockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await requesters
      .addBlock()
      .sendFullFeaturedRequest(users.addBlockSuccessful);

    testHelper
      .createSuccessTest()
      .countryName({
        requestValue: users.addBlockSuccessful.countryName,
        responseValue: countryName,
      })
      .countryCode({
        requestValue: users.addBlockSuccessful.countryCode,
        responseValue: countryCode,
      })
      .phoneNumber({
        requestValue: users.addBlockSuccessful.phoneNumber,
        responseValue: phoneNumber,
      });
  });
});

describe("addBlock failure tests", () => {
  before(async () => {
    //* Add someone to blacklist for blacklistItemExist error
    await requesters
      .addBlock()
      .sendFullFeaturedRequest(users.blacklistItemExist);
  });

  const cellphone = userPropsUtilities.makeRandomCellphone(countries);

  testHelper
    .createFailTest(requesters.addBlock())
    .authentication()
    .input(cellphone)
    .checkCurrentUserStatus(cellphone)
    .selfStuff(users.selfStuff)
    .cellphone(cellphone)
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .blacklistItemExist(users.blacklistItemExist);
});
