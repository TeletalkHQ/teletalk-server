const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { generalTest } = require("@/classes/GeneralTest");

const {
  requesters: { addBlockRequest, removeBlockRequest },
  testVariables: {
    cellphones: { notExistedContact },
    testUsers: { removeBlockSuccessfulTestUser, selfStuffTestUser },
  },
} = require("@/variables/others/testVariables");
const { countries } = require("@/variables/others/countries");

describe("removeContact successful test", () => {
  it(`should add testUser_3 to testUser_0 contact list`, async () => {
    await addBlockRequest().sendFullFeaturedRequest(
      removeBlockSuccessfulTestUser,
      null,
      {
        token: removeBlockRequest().getOptions().token,
      }
    );
    const {
      body: {
        removedBlockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await removeBlockRequest().sendFullFeaturedRequest(
      removeBlockSuccessfulTestUser
    );

    generalTest
      .createSuccessTest()
      .countryName({
        countryNameMain: removeBlockSuccessfulTestUser.countryName,
        countryNameTest: countryName,
      })
      .countryCode({
        countryCodeMain: removeBlockSuccessfulTestUser.countryCode,
        countryCodeTest: countryCode,
      })
      .phoneNumber({
        phoneNumberMain: removeBlockSuccessfulTestUser.phoneNumber,
        phoneNumberTest: phoneNumber,
      });
  });
});

describe("removeBlock failure tests", () => {
  const cellphone = userPropsUtilities.makeRandomCellphone(countries);
  generalTest
    .createFailTest(removeBlockRequest())
    .authentication()
    .cellphone()
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(selfStuffTestUser)
    .blacklistItemNotExist(notExistedContact);
});
