const { UserModel } = require("~/models/userModels/user.mongo");

const {
  initialOptions,
} = require("~/variables/constants/initialOptions/initialOptions");
const { errorThrower } = require("~/functions/utilities/utils");

const userFinder = async (
  userData = initialOptions.userInitialOptions,
  findMethod = "findOne"
) => {
  try {
    errorThrower(!userData, "You should send me data to find your target");

    return await UserModel[findMethod]({
      ...userData,
    });
  } catch (error) {
    logger.log("userFinder catch", error);
    errorThrower(error, error);
  }
};

module.exports = { userFinder };
