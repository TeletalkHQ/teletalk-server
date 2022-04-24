const { getAllChats } = require("~/models/chatModels/chatModelFunctions");
const {
  privateChatRoutes: { properties: getAllChatsRoute },
} = require("~/variables/routes/privateChatRoutes");

const getAllChatsUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser } = req;

    const chats = await getAllChats(currentUser);

    res.sendJsonResponse(getAllChatsRoute, {
      chats,
    });
  } catch (error) {
    logger.log("getAllChatsUserController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getAllChatsUserController };
