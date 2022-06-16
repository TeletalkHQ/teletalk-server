const welcomeOtherController = (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.checkDataAndResponse({
      message: "Hey! Welcome to teletalk <3",
    });
  } catch (error) {
    logger.log("welcome url catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { welcomeOtherController };
