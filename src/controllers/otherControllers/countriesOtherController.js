const { countries } = require("@/variables/others/countries");

const countriesOtherController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.checkDataAndResponse({ countries });
  } catch (error) {
    logger.log("countriesUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { countriesOtherController };
