const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { generalTest } = require("@/classes/GeneralTest");

const {
  requesters: { removeBlockRequest, addBlockRequest },
  testVariables: {
    testUsers: { removeBlockSuccessfulTestUser, selfStuffTestUser },
    cellphones: { notExistedContact },
  },
} = require("@/variables/others/testVariables");

describe("removeContact successful test", () => {
  it(`should add testUser_3 to testUser_0 contact list`, async () => {
    await addBlockRequest.sendRequest(removeBlockSuccessfulTestUser, null, {
      token: removeBlockRequest.getOptions().token,
    });
    const {
      body: {
        removedBlockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await removeBlockRequest.sendRequest(removeBlockSuccessfulTestUser);

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
  const cellphone = userPropsUtilities.makeRandomCellphone();
  generalTest
    .createFailTest(removeBlockRequest)
    .authentication()
    .cellphone()
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(selfStuffTestUser)
    .blacklistItemNotExist(notExistedContact);
});
