const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToGetPublicUserInfo = async (userId) => {
  const user = (await services.getUserData.run({ userId })).result();

  return {
    bio: user.bio,
    firstName: user.firstName,
    lastName: user.lastName,
    userId: user.userId,
    username: user.username,
  };
};

const responseToGetUserData = (publicUserInfo, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { publicUserInfo });
};

const catchGetUserData = commonFunctionalities.controllerErrorResponse;

const getPublicUserData = async (
  req = expressRequest,
  res = expressResponse
) => {
  const { userId } = req.body;

  (await trier(getPublicUserData.name).tryAsync(tryToGetPublicUserInfo, userId))
    .executeIfNoError(responseToGetUserData, res)
    .catch(catchGetUserData, res);
};

module.exports = { getPublicUserData };
