const {
  PrivateChatModel,
} = require("@/models/chatModels/privateChatMongoModel");
const { UserMongoModel } = require("@/models/userModels/userMongoModel");
const { errorThrower } = require("@/functions/utilities/utils");

const models = { UserMongoModel, PrivateChatModel };

const initialOptions = {
  model: "UserMongoModel",
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
    logger.log("userFinder catch, error:", error);
    errorThrower(error, error);
  }
};

module.exports = { targetFinder };
