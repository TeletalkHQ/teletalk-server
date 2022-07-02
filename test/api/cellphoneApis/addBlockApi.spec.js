const { userProps } = require("@/classes/UserProps");

const { generalTest } = require("@/classes/GeneralTest");

const {
  userErrors: { BLACKLIST_ITEM_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");
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

describe("addBlock successful tests", () => {
  it(`should add addBlockSuccessfulTestUser to testUser_0 blacklist`, async () => {
    const {
      body: {
        blockedCellphone: { phoneNumber, countryCode, countryName },
      },
    } = await addBlockRequest.sendRequest(addBlockSuccessfulTestUser);

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

//CLEANME SELF_STUFF BLACKLIST_ITEM_EXIST tests
describe("addBlock failure tests", () => {
  it("should get error, SELF_STUFF", async () => {
    await addBlockRequest.sendRequest(selfStuffTestUser, SELF_STUFF);
  });

  it("should get error, BLACKLIST_ITEM_EXIST", async () => {
    //* First one get succeed, but second one is duplicate
    await addBlockRequest.sendRequest(blacklistItemExistTestUser);
    await addBlockRequest.sendRequest(
      blacklistItemExistTestUser,
      BLACKLIST_ITEM_EXIST
    );
  });

  const cellphone = userProps.makeTestCellphone();

  generalTest
    .createFailTest(addBlockRequest)
    .cellphone(cellphone)
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .authentication();
});
