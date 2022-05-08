const { allStuff } = require("@/variables/otherVariables");

const getAllStuffVersionControlController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.status(200).json(allStuff);
  } catch (error) {
    logger.log("getAllStuffVersionControlController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getAllStuffVersionControlController };
