const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { getAllChats } = require("@/services/userServices");

const tryToGetAllChats = async (currentUser) => {
  const chats = await getAllChats(currentUser);
  return chats;
};

const responseToGetAllChats = (chats, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    chats,
  });
};

const catchGetAllChats = commonFunctionalities.controllerCatchResponse;

const getAllChatsUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const { currentUser } = req;
  (
    await trier(getAllChatsUserController.name).tryAsync(
      tryToGetAllChats,
      currentUser
    )
  )
    .executeIfNoError(responseToGetAllChats, res)
    .catch(catchGetAllChats, res);
};

module.exports = { getAllChatsUserController };
