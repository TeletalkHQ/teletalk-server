const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { countries } = require("@/variables/others/countries");

const tryToGetCountries = async () => {
  return countries;
};

const responseToGetCountries = (countries, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { countries });
};

const catchGetCountries = commonFunctionalities.controllerCatchResponse;

const countriesOtherController = async (
  _ = expressRequest,
  res = expressResponse
) => {
  (await trier(countriesOtherController.name).tryAsync(tryToGetCountries))
    .executeIfNoError(responseToGetCountries, res)
    .catch(catchGetCountries, res);
};

module.exports = { countriesOtherController };
