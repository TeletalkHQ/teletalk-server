const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToGetAllPrivateChats = async (req) => {
  const { currentUserId } = req;
  const privateChats = await services
    .getAllPrivateChats()
    .exclude()
    .run({ currentUserId });
  return { privateChats };
};

const getAllPrivateChats = controllerBuilder
  .create()
  .body(tryToGetAllPrivateChats)
  .build();

module.exports = { getAllPrivateChats };
