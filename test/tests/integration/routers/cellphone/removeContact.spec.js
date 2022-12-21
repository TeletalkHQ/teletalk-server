const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const {
  integrationHelpers,
} = require("$/tests/integration/helpers/integrationHelpers");
const { requesters } = require("$/utilities/requesters");

const { countries } = require("@/variables/others/countries");

const users = testVariablesManager.getUsers();
const cellphones = testVariablesManager.getCellphones();

describe("removeContact successful test", () => {
  it("should add testUser_3 to testUser_0 contact list", async () => {
    await requesters
      .addContact()
      .sendFullFeaturedRequest(users.removeContactSuccessful, null, {
        token: requesters.removeContact().getOptions().token,
      });

    const {
      body: {
        removedContact: { phoneNumber, countryCode, countryName },
      },
    } = await requesters
      .removeContact()
      .sendFullFeaturedRequest(users.removeContactSuccessful);

    integrationHelpers
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
  integrationHelpers
    .createFailTest(requesters.removeContact())
    .authentication()
    .inputMissing(cellphone)
    .cellphone(cellphone)
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(users.selfStuff)
    .contactItemNotExist(cellphones.notExistedContact);
});
