const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToGetAllPrivateChats = async (data) => {
  return (await services.getAllPrivateChats.run(data)).exclude().result();
};

const responseToGetAllPrivateChats = (privateChats, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    privateChats,
  });
};

const catchGetAllChats = commonFunctionalities.controllerErrorResponse;

const getAllPrivateChats = async (
  req = expressRequest,
  res = expressResponse
) => {
  const { currentUserId } = req;
  (
    await trier(getAllPrivateChats.name).tryAsync(tryToGetAllPrivateChats, {
      currentUserId,
    })
  )
    .executeIfNoError(responseToGetAllPrivateChats, res)
    .catch(catchGetAllChats, res);
};

module.exports = { getAllPrivateChats };
