const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { services } = require("@/services");
const { trier } = require("utility-store/src/classes/Trier");

const tryToGetAllUsers = async () => {
  const users = await services.getAllUsers();
  return users;
};

const responseToGetAllUsers = (users, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { users });
};

const catchGetAllUsers = commonFunctionalities.controllerErrorResponse;

const getAllUsersController = async (
  _ = expressRequest,
  res = expressResponse
) => {
  (await trier(getAllUsersController.name).tryAsync(tryToGetAllUsers))
    .executeIfNoError(responseToGetAllUsers, res)
    .catch(catchGetAllUsers, res);
};

module.exports = { getAllUsers: getAllUsersController };
