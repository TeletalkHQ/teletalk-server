const { UserModel } = require("~/models/userModels/UserModel");

const userFinder = async (data) => {
  try {
    if (!data) {
      const error = "Yo, send data to find your target :| ";

      throw error;
    }

    const user = await UserModel.findOne({
      ...data,
    });

    return { user };
  } catch (error) {
    console.log("userFinder catch", error);
    throw error;
  }
};

module.exports = { userFinder };
