const { getStatusCodeFromRoute } = require("~/functions/utilities/utils");
const { countries } = require("~/variables/constants/countries");
const { otherRoutes } = require("~/variables/routes/otherRoutes");

const countriesOtherController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res
      .status(getStatusCodeFromRoute(otherRoutes.properties.countries))
      .json({ countries });
  } catch (error) {
    logger.log("countriesUserController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { countriesOtherController };
