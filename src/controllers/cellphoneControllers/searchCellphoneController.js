const searchCellphoneController = (
  req = expressRequest,
  res = expressResponse
) => {
  try {
  } catch (error) {
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { searchCellphoneController };
