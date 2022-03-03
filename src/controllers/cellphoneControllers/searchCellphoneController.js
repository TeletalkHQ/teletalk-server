const searchCellphoneController = (req, res) => {
  try {
  } catch (error) {
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { searchCellphoneController };
