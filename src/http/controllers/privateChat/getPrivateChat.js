const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const { validators } = require("@/validators");

const tryToGetPrivateChatMessages = async (req) => {
  const {
    body: { chatId },
  } = req;

  await validators.chatId(chatId);

  const privateChat = await services.getPrivateChat().exclude().run({
    chatId,
  });
  return { privateChat };
};

const getPrivateChat = controllerBuilder
  .create()
  .body(tryToGetPrivateChatMessages)
  .build();

module.exports = { getPrivateChat };