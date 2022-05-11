const { countries } = require("@/variables/constants/countries");
const {
  otherRoutes: { countriesRoute },
} = require("@/variables/routes/otherRoutes");

const countriesOtherController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.checkAndResponse(countriesRoute, { countries });
  } catch (error) {
    logger.log("countriesUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { countriesOtherController };
