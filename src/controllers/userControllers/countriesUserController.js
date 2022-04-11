const { countries } = require("~/variables/constants/countries");

const countriesUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.status(200).json({ countries });
  } catch (error) {
    logger.log("countriesUserController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { countriesUserController };
