const { getStatusCodeFromRoute } = require("~/functions/utilities/utilsNoDeps");
const { otherRoutes } = require("~/variables/routes/otherRoutes");

const welcomeOtherController = (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.status(getStatusCodeFromRoute(otherRoutes.properties.welcome)).json({
      message: "Hey! Welcome to teletalk <3",
    });
  } catch (error) {
    logger.log("welcome url catch", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { welcomeOtherController };
