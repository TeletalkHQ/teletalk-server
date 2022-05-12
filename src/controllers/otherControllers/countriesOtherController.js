const { countries } = require("@/variables/constants/countries");

const countriesOtherController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.checkAndResponse({ countries });
  } catch (error) {
    logger.log("countriesUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { countriesOtherController };
