const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { generalTest } = require("@/classes/GeneralTest");

const {
  requesters: { addBlockRequest },
  testVariables: {
    testUsers: {
      addBlockSuccessfulTestUser,
      selfStuffTestUser,
      blacklistItemExistTestUser,
    },
  },
} = require("@/variables/others/testVariables");
const { countries } = require("@/variables/others/countries");

describe("addBlock successful tests", () => {
  it(`should add addBlockSuccessfulTestUser to testUser_0 blacklist`, async () => {
    const {
      body: {
        blockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await addBlockRequest().sendFullFeaturedRequest(
      addBlockSuccessfulTestUser
    );

    generalTest
      .createSuccessTest()
      .countryName({
        countryNameMain: addBlockSuccessfulTestUser.countryName,
        countryNameTest: countryName,
      })
      .countryCode({
        countryCodeMain: addBlockSuccessfulTestUser.countryCode,
        countryCodeTest: countryCode,
      })
      .phoneNumber({
        phoneNumberMain: addBlockSuccessfulTestUser.phoneNumber,
        phoneNumberTest: phoneNumber,
      });
  });
});

describe("addBlock failure tests", () => {
  before(async () => {
    //* Add someone to blacklist for blacklistItemExist error
    await addBlockRequest().sendFullFeaturedRequest(blacklistItemExistTestUser);
  });

  const cellphone = userPropsUtilities.makeRandomCellphone(countries);
  generalTest
    .createFailTest(addBlockRequest())
    .authentication()
    .selfStuff(selfStuffTestUser)
    .cellphone(cellphone)
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .blacklistItemExist(blacklistItemExistTestUser);
});
