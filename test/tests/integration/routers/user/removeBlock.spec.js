const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities/requesters");

const { countries } = require("@/variables/others/countries");

const users = testVariablesManager.getUsers();
const cellphones = testVariablesManager.getCellphones();

describe("removeContact successful test", () => {
  it("should add testUser_3 to testUser_0 contact list", async () => {
    await requesters
      .addBlock()
      .sendFullFeaturedRequest(users.removeBlockSuccessful, undefined, {
        token: requesters.removeBlock().getOptions().token,
      });
    const {
      body: {
        removedBlockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await requesters
      .removeBlock()
      .sendFullFeaturedRequest(users.removeBlockSuccessful);

    testHelper
      .createSuccessTest()
      .countryName({
        requestValue: users.removeBlockSuccessful.countryName,
        responseValue: countryName,
      })
      .countryCode({
        requestValue: users.removeBlockSuccessful.countryCode,
        responseValue: countryCode,
      })
      .phoneNumber({
        requestValue: users.removeBlockSuccessful.phoneNumber,
        responseValue: phoneNumber,
      });
  });
});

describe("removeBlock failure tests", () => {
  const cellphone = userPropsUtilities.makeRandomCellphone(countries);
  testHelper
    .createFailTest(requesters.removeBlock())
    .authentication()
    .input(cellphone)
    .checkCurrentUserStatus(cellphone)
    .cellphone(cellphone)
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(users.selfStuff)
    .blacklistItemNotExist(cellphones.notExistedContact);
});
