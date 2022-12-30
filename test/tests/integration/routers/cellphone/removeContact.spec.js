const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { testHelper } = require("$/tests/integration/helpers/testHelper");
const { requesters } = require("$/utilities/requesters");

const { countries } = require("@/variables/others/countries");

const users = testVariablesManager.getUsers();
const cellphones = testVariablesManager.getCellphones();

describe("removeContact successful test", () => {
  it("should add testUser_3 to testUser_0 contact list", async () => {
    await requesters
      .addContact()
      .sendFullFeaturedRequest(users.removeContactSuccessful, undefined, {
        token: requesters.removeContact().getOptions().token,
      });

    const {
      body: {
        removedContact: { phoneNumber, countryCode, countryName },
      },
    } = await requesters
      .removeContact()
      .sendFullFeaturedRequest(users.removeContactSuccessful);

    testHelper
      .createSuccessTest()
      .countryName({
        requestValue: users.removeContactSuccessful.countryName,
        responseValue: countryName,
      })
      .countryCode({
        requestValue: users.removeContactSuccessful.countryCode,
        responseValue: countryCode,
      })
      .phoneNumber({
        requestValue: users.removeContactSuccessful.phoneNumber,
        responseValue: phoneNumber,
      });
  });
});

describe("removeContact failure tests", () => {
  const cellphone = userPropsUtilities.makeRandomCellphone(countries);
  testHelper
    .createFailTest(requesters.removeContact())
    .authentication()
    .input(cellphone)
    .checkCurrentUserStatus(cellphone)
    .cellphone(cellphone)
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(users.selfStuff)
    .contactItemNotExist(cellphones.notExistedContact);
});
