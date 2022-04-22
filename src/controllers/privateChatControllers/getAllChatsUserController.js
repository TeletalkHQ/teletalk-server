const { getAllChats } = require("~/models/chatModels/chatModelFunctions");
const { privateChatRoutes } = require("~/variables/routes/privateChatRoutes");

const getAllChatsUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser } = req;

    const chats = await getAllChats(currentUser);

    res.sendJsonResponse(privateChatRoutes.properties.getAllChatsRoute, {
      chats,
    });
  } catch (error) {
    logger.log("getAllChatsUserController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getAllChatsUserController };
