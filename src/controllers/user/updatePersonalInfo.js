const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { services } = require("@/services/services");

const tryToUpdatePersonalInfo = async (currentUser, firstName, lastName) => {
  await services.updatePersonalInfo(currentUser, {
    firstName,
    lastName,
  });
};

const responseToUpdatePersonalInfo = (_, res, firstName, lastName) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    user: {
      firstName,
      lastName,
    },
  });
};

const catchUpdatePersonalInfo = commonFunctionalities.controllerCatchResponse;

const updatePersonalInfoController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const {
    body: { firstName, lastName },
    currentUser,
  } = req;

  (
    await trier(updatePersonalInfoController.name).tryAsync(
      tryToUpdatePersonalInfo,
      currentUser,
      firstName,
      lastName
    )
  )
    .executeIfNoError(responseToUpdatePersonalInfo, res, firstName, lastName)
    .catch(catchUpdatePersonalInfo, res);
};

module.exports = {
  updatePersonalInfo: updatePersonalInfoController,
};
