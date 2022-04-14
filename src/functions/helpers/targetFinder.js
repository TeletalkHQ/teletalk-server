const { PrivateChatModel } = require("~/models/chatModels/privateChat.mongo");
const { UserModel } = require("~/models/userModels/userMongoModel");
const { errorThrower } = require("~/functions/utilities/utils");

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

    return await models[parameters.model][parameters.findMethod]({
      ...parameters.findParameters,
    });
  } catch (error) {
    logger.log("userFinder catch", error);
    errorThrower(error, error);
  }
};

module.exports = { targetFinder };
