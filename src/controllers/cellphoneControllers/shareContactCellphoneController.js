const shareContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
  } catch (error) {
    logger.log("shareContactCellphoneController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { shareContactCellphoneController };
