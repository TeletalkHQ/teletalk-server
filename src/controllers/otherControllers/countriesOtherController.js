const { countries } = require("@/variables/constants/countries");
const {
  otherRoutes: {
    properties: {
      countriesRoute: { properties: countriesRoute },
    },
  },
} = require("@/variables/routes/otherRoutes");

const countriesOtherController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.sendJsonResponse(countriesRoute, { countries });
  } catch (error) {
    logger.log("countriesUserController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { countriesOtherController };
