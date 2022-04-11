const { UserModel } = require("~/models/userModels/UserModel");

const {
  initialOptions,
} = require("~/variables/constants/initialOptions/initialOptions");

const userFinder = async (data = initialOptions.userInitialOptions) => {
  try {
    if (!data) {
      const error = "You should send me data to find your target";

      throw error;
    }

    const user = await UserModel.findOne({
      ...data,
    });

    return { user };
  } catch (error) {
    logger.log("userFinder catch", error);
    throw error;
  }
};

module.exports = { userFinder };
