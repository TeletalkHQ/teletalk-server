const searchCellphoneController = (
  req = expressRequest,
  res = expressResponse
) => {
  try {
  } catch (error) {
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { searchCellphoneController };
