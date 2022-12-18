const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToGetAllUsers = async () => {
  return await services.getAllUsers();
};

const responseToGetAllUsers = (users, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { users });
};

const catchGetAllUsers = commonFunctionalities.controllerErrorResponse;

const getAllUsers = async (_ = expressRequest, res = expressResponse) => {
  await trier(getAllUsers.name)
    .tryAsync(tryToGetAllUsers)
    .executeIfNoError(responseToGetAllUsers, res)
    .catch(catchGetAllUsers, res)
    .runAsync();
};

module.exports = { getAllUsers };
