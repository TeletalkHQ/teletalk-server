const { userProps } = require("@/classes/UserProps");

const { generalTest } = require("@/classes/GeneralTest");

const {
  userErrors: { BLACKLIST_ITEM_NOT_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");
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
  it("should get error, SELF_STUFF", async () => {
    await removeBlockRequest.sendRequest(selfStuffTestUser, SELF_STUFF);
  });

  it("should get error, BLACKLIST_ITEM_NOT_EXIST", async () => {
    await removeBlockRequest.sendRequest(
      notExistedContact,
      BLACKLIST_ITEM_NOT_EXIST
    );
  });

  const cellphone = userProps.makeTestCellphone();

  generalTest
    .createFailTest(removeBlockRequest)
    .authentication()
    .cellphone()
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone);
});
