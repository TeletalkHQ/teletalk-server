//DEPRECATED
const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToGetChatsLastMessage = async (req) => {
  const { currentUserId } = req;
  const chatsWithLastMessages = await services.getChatsLastMessages({
    currentUserId,
  });
  return { chatsWithLastMessages };
};

const getChatsLastMessage = controllerBuilder
  .create()
  .body(tryToGetChatsLastMessage)
  .build();

module.exports = { getChatsLastMessage };
