const { countries } = require("~/variables/constants/countries");
const { otherRoutes } = require("~/variables/routes/otherRoutes");

const countriesOtherController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.sendJsonResponse(otherRoutes.properties.countriesRoute, { countries });
  } catch (error) {
    logger.log("countriesUserController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { countriesOtherController };
