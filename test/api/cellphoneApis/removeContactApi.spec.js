const { generalTest } = require("@/classes/GeneralTest");
const { userProps } = require("@/classes/UserProps");

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
  const cellphone = userProps.makeTestCellphone();
  generalTest
    .createFailTest(removeContactRequest)
    .authentication()
    .cellphone()
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(selfStuffTestUser)
    .contactItemNotExist(notExistedContact);
});
