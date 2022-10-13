const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { generalTest } = require("@/classes/GeneralTest");

const { requesters } = require("$/helpers/requesters");

const { testVariables } = require("$/variables/testVariables");
const { countries } = require("@/variables/others/countries");

describe("removeContact successful test", () => {
  it("should add testUser_3 to testUser_0 contact list", async () => {
    await requesters
      .addBlockRequest()
      .sendFullFeaturedRequest(
        testVariables.users.removeBlockSuccessful,
        null,
        {
          token: requesters.removeBlockRequest().getOptions().token,
        }
      );
    const {
      body: {
        removedBlockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await requesters
      .removeBlockRequest()
      .sendFullFeaturedRequest(testVariables.users.removeBlockSuccessful);

    generalTest
      .createSuccessTest()
      .countryName({
        countryNameMain: testVariables.users.removeBlockSuccessful.countryName,
        countryNameTest: countryName,
      })
      .countryCode({
        countryCodeMain: testVariables.users.removeBlockSuccessful.countryCode,
        countryCodeTest: countryCode,
      })
      .phoneNumber({
        phoneNumberMain: testVariables.users.removeBlockSuccessful.phoneNumber,
        phoneNumberTest: phoneNumber,
      });
  });
});

describe("removeBlock failure tests", () => {
  const cellphone = userPropsUtilities.makeRandomCellphone(countries);
  generalTest
    .createFailTest(requesters.removeBlockRequest())
    .authentication()
    .cellphone()
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(testVariables.users.selfStuff)
    .blacklistItemNotExist(testVariables.cellphones.notExistedContact);
});
