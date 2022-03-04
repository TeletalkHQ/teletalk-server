const shareContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
  } catch (error) {
    console.log("shareContactCellphoneController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { shareContactCellphoneController };
