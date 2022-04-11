const { UserModel } = require("~/models/userModels/UserModel");

const {
  initialOptions,
} = require("~/variables/constants/initialOptions/initialOptions");
const { errorThrower } = require("../utilities/utils");

const userFinder = async (
  userData = initialOptions.userInitialOptions,
  findMethod = "findOne"
) => {
  try {
    errorThrower(!userData, "You should send me data to find your target");

    const user = await UserModel[findMethod]({
      ...userData,
    });

    return { user };
  } catch (error) {
    logger.log("userFinder catch", error);
    errorThrower(error, error);
  }
};

module.exports = { userFinder };
