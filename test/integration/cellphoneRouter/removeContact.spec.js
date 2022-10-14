const {
  integrationHelpers,
} = require("$/helpers/integrationHelpers/integrationHelpers");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { requesters } = require("$/helpers/requesters");

const { testVariables } = require("$/variables/testVariables");
const { countries } = require("@/variables/others/countries");

describe("removeContact successful test", () => {
  it("should add testUser_3 to testUser_0 contact list", async () => {
    await requesters
      .addContactRequest()
      .sendFullFeaturedRequest(
        testVariables.users.removeContactSuccessful,
        null,
        {
          token: requesters.removeContactRequest().getOptions().token,
        }
      );

    const {
      body: {
        removedContact: { phoneNumber, countryCode, countryName },
      },
    } = await requesters
      .removeContactRequest()
      .sendFullFeaturedRequest(testVariables.users.removeContactSuccessful);

    integrationHelpers
      .createSuccessTest()
      .countryName({
        countryNameMain:
          testVariables.users.removeContactSuccessful.countryName,
        countryNameTest: countryName,
      })
      .countryCode({
        countryCodeMain:
          testVariables.users.removeContactSuccessful.countryCode,
        countryCodeTest: countryCode,
      })
      .phoneNumber({
        phoneNumberMain:
          testVariables.users.removeContactSuccessful.phoneNumber,
        phoneNumberTest: phoneNumber,
      });
  });
});

describe("removeContact failure tests", () => {
  const cellphone = userPropsUtilities.makeRandomCellphone(countries);
  integrationHelpers
    .createFailTest(requesters.removeContactRequest())
    .authentication()
    .cellphone()
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(testVariables.users.selfStuff)
    .contactItemNotExist(testVariables.cellphones.notExistedContact);
});
