const { getUserData } = require("@/models/userModels/userModelFunctions");

const getUserDataUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { privateId } = req.body;

    const user = await getUserData(privateId);

    res.checkAndResponse({ user });
  } catch (error) {
    logger.log("getUserDataUserController catch, error: ", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getUserDataUserController };
