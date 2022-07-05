const { generalTest } = require("@/classes/GeneralTest");
const { userProps } = require("@/classes/UserProps");

const {
  userErrors: { CONTACT_ITEM_NOT_EXIST, SELF_STUFF },
} = require("@/variables/errors/userErrors");
const {
  requesters: { addContactRequest, removeContactRequest },
  testVariables: {
    cellphones: { notExistedContact },
    testUsers: { removeContactSuccessfulTestUser, selfStuffTestUser },
  },
} = require("@/variables/others/testVariables");

describe("removeContact successful test", () => {
  it(`should add testUser_3 to testUser_0 contact list`, async () => {
    await addContactRequest.sendRequest(removeContactSuccessfulTestUser, null, {
      token: removeContactRequest.getOptions().token,
    });

    const {
      body: {
        removedContact: { phoneNumber, countryCode, countryName },
      },
    } = await removeContactRequest.sendRequest(removeContactSuccessfulTestUser);

    generalTest
      .createSuccessTest()
      .countryName({
        countryNameMain: removeContactSuccessfulTestUser.countryName,
        countryNameTest: countryName,
      })
      .countryCode({
        countryCodeMain: removeContactSuccessfulTestUser.countryCode,
        countryCodeTest: countryCode,
      })
      .phoneNumber({
        phoneNumberMain: removeContactSuccessfulTestUser.phoneNumber,
        phoneNumberTest: phoneNumber,
      });
  });
});

describe("removeContact failure tests", () => {
  it("should get error, SELF_STUFF", async () => {
    await removeContactRequest.sendRequest(selfStuffTestUser, SELF_STUFF);
  });

  it("should get error, CONTACT_ITEM_NOT_EXIST", async () => {
    await removeContactRequest.sendRequest(
      notExistedContact,
      CONTACT_ITEM_NOT_EXIST
    );
  });

  const cellphone = userProps.makeTestCellphone();

  generalTest
    .createFailTest(removeContactRequest)
    .authentication()
    .cellphone()
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone);
});
