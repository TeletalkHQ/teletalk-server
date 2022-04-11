const { PrivateChatModel } = require("~/models/chatModels/privateChatModel");
const { UserModel } = require("~/models/userModels/UserModel");
const { errorThrower } = require("../utilities/utils");

const models = { UserModel, PrivateChatModel };

const initialOptions = {
  model: "UserModel",
  findMethod: "findOne",
  findParameters: {},
};

const targetFinder = async (data = initialOptions) => {
  try {
    errorThrower(!data, "Yo, send data to find your target :| ");
    const parameters = {
      ...initialOptions,
      ...data,
    };

    const target = await models[parameters.model][parameters.findMethod]({
      ...parameters.findParameters,
    });

    return { target };
  } catch (error) {
    logger.log("userFinder catch", error);
    errorThrower(error, error);
  }
};

module.exports = { targetFinder };
