const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { services } = require("@/services");

const tryToUpdatePersonalInfo = async (data) => {
  await services.updatePersonalInfo().run(data);
};

const responseToUpdatePersonalInfo = (_, res, firstName, lastName) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    user: {
      firstName,
      lastName,
    },
  });
};

const catchUpdatePersonalInfo = commonFunctionalities.controllerErrorResponse;

const updatePersonalInfoController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const {
    body: { firstName, lastName },
    currentUserId,
  } = req;

  await trier(updatePersonalInfoController.name)
    .tryAsync(tryToUpdatePersonalInfo, { currentUserId, firstName, lastName })
    .executeIfNoError(responseToUpdatePersonalInfo, res, firstName, lastName)
    .catch(catchUpdatePersonalInfo, res)
    .runAsync();
};

module.exports = {
  updatePersonalInfo: updatePersonalInfoController,
};
