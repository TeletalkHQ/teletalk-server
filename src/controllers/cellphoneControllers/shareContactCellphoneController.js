const shareContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
  } catch (error) {
    logger.log("shareContactCellphoneController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { shareContactCellphoneController };
