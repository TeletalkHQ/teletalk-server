const { getAllChats } = require("@/models/chatModels/chatModelFunctions");
const {
  privateChatRoutes: { getAllChatsRoute },
} = require("@/variables/routes/privateChatRoutes");

const getAllChatsUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser } = req;

    const chats = await getAllChats(currentUser);

    res.checkAndResponse(getAllChatsRoute, {
      chats,
    });
  } catch (error) {
    logger.log("getAllChatsUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getAllChatsUserController };
