const {
  otherRoutes: { welcomeRoute },
} = require("@/variables/routes/otherRoutes");

const welcomeOtherController = (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.sendJsonResponse(welcomeRoute, {
      message: "Hey! Welcome to teletalk <3",
    });
  } catch (error) {
    logger.log("welcome url catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { welcomeOtherController };
