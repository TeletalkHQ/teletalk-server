const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { requesters } = require("$/functions/helpers/requesters");

const { testVariables } = require("$/variables/testVariables");
const { countries } = require("@/variables/others/countries");

describe("removeContact successful test", () => {
  it("should add testUser_3 to testUser_0 contact list", async () => {
    await requesters
      .addContact()
      .sendFullFeaturedRequest(
        testVariables.users.removeContactSuccessful,
        null,
        {
          token: requesters.removeContact().getOptions().token,
        }
      );

    const {
      body: {
        removedContact: { phoneNumber, countryCode, countryName },
      },
    } = await requesters
      .removeContact()
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
    .createFailTest(requesters.removeContact())
    .authentication()
    .cellphone()
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(testVariables.users.selfStuff)
    .contactItemNotExist(testVariables.cellphones.notExistedContact);
});
