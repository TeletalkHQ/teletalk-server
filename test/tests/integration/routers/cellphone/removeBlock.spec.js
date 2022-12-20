const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");

const { requesters } = require("$/functions/helpers/requesters");

const { countries } = require("@/variables/others/countries");

const users = testVariablesManager.getUsers();
const cellphones = testVariablesManager.getCellphones();

describe("removeContact successful test", () => {
  it("should add testUser_3 to testUser_0 contact list", async () => {
    await requesters
      .addBlock()
      .sendFullFeaturedRequest(users.removeBlockSuccessful, null, {
        token: requesters.removeBlock().getOptions().token,
      });
    const {
      body: {
        removedBlockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await requesters
      .removeBlock()
      .sendFullFeaturedRequest(users.removeBlockSuccessful);

    integrationHelpers
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
  integrationHelpers
    .createFailTest(requesters.removeBlock())
    .authentication()
    .cellphone()
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(users.selfStuff)
    .blacklistItemNotExist(cellphones.notExistedContact);
});
