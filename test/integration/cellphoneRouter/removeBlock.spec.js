const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");

const { requesters } = require("$/functions/helpers/requesters");

const { testVariables } = require("$/variables/testVariables");
const { countries } = require("@/variables/others/countries");

describe("removeContact successful test", () => {
  it("should add testUser_3 to testUser_0 contact list", async () => {
    await requesters
      .addBlock()
      .sendFullFeaturedRequest(
        testVariables.users.removeBlockSuccessful,
        null,
        {
          token: requesters.removeBlock().getOptions().token,
        }
      );
    const {
      body: {
        removedBlockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await requesters
      .removeBlock()
      .sendFullFeaturedRequest(testVariables.users.removeBlockSuccessful);

    integrationHelpers
      .createSuccessTest()
      .countryName({
        clientValue: testVariables.users.removeBlockSuccessful.countryName,
        responseValue: countryName,
      })
      .countryCode({
        clientValue: testVariables.users.removeBlockSuccessful.countryCode,
        responseValue: countryCode,
      })
      .phoneNumber({
        clientValue: testVariables.users.removeBlockSuccessful.phoneNumber,
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
    .selfStuff(testVariables.users.selfStuff)
    .blacklistItemNotExist(testVariables.cellphones.notExistedContact);
});
