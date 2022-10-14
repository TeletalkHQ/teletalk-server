const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const {
  integrationHelpers,
} = require("$/helpers/integrationHelpers/integrationHelpers");

const { requesters } = require("$/helpers/requesters");

const { testVariables } = require("$/variables/testVariables");
const { countries } = require("@/variables/others/countries");

describe("addBlock successful tests", () => {
  it("should add addBlockSuccessfulTestUser to testUser_0 blacklist", async () => {
    const {
      body: {
        blockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await requesters
      .addBlockRequest()
      .sendFullFeaturedRequest(testVariables.users.addBlockSuccessful);

    integrationHelpers
      .createSuccessTest()
      .countryName({
        countryNameMain: testVariables.users.addBlockSuccessful.countryName,
        countryNameTest: countryName,
      })
      .countryCode({
        countryCodeMain: testVariables.users.addBlockSuccessful.countryCode,
        countryCodeTest: countryCode,
      })
      .phoneNumber({
        phoneNumberMain: testVariables.users.addBlockSuccessful.phoneNumber,
        phoneNumberTest: phoneNumber,
      });
  });
});

describe("addBlock failure tests", () => {
  before(async () => {
    //* Add someone to blacklist for blacklistItemExist error
    await requesters
      .addBlockRequest()
      .sendFullFeaturedRequest(testVariables.users.blacklistItemExist);
  });

  const cellphone = userPropsUtilities.makeRandomCellphone(countries);
  integrationHelpers
    .createFailTest(requesters.addBlockRequest())
    .authentication()
    .selfStuff(testVariables.users.selfStuff)
    .cellphone(cellphone)
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .blacklistItemExist(testVariables.users.blacklistItemExist);
});
