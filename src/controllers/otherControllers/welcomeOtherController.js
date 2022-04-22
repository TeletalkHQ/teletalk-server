const { otherRoutes } = require("~/variables/routes/otherRoutes");

const welcomeOtherController = (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.sendJsonResponse(otherRoutes.properties.welcomeRoute, {
      message: "Hey! Welcome to teletalk <3",
    });
  } catch (error) {
    logger.log("welcome url catch", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { welcomeOtherController };
