const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");

const { requesters } = require("$/functions/helpers/requesters");

const { testVariables } = require("$/variables/testVariables");
const { countries } = require("@/variables/others/countries");

describe("addBlock successful tests", () => {
  it("should add addBlockSuccessfulTestUser to testUser_0 blacklist", async () => {
    const {
      body: {
        blockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await requesters
      .addBlock()
      .sendFullFeaturedRequest(testVariables.users.addBlockSuccessful);

    integrationHelpers
      .createSuccessTest()
      .countryName({
        clientValue: testVariables.users.addBlockSuccessful.countryName,
        responseValue: countryName,
      })
      .countryCode({
        clientValue: testVariables.users.addBlockSuccessful.countryCode,
        responseValue: countryCode,
      })
      .phoneNumber({
        clientValue: testVariables.users.addBlockSuccessful.phoneNumber,
        responseValue: phoneNumber,
      });
  });
});

describe("addBlock failure tests", () => {
  before(async () => {
    //* Add someone to blacklist for blacklistItemExist error
    await requesters
      .addBlock()
      .sendFullFeaturedRequest(testVariables.users.blacklistItemExist);
  });

  const cellphone = userPropsUtilities.makeRandomCellphone(countries);
  integrationHelpers
    .createFailTest(requesters.addBlock())
    .authentication()
    .selfStuff(testVariables.users.selfStuff)
    .cellphone(cellphone)
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .blacklistItemExist(testVariables.users.blacklistItemExist);
});
