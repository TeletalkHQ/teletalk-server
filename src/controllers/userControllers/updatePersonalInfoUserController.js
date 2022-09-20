const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { updatePersonalInfo } = require("@/services/userServices");

const tryToUpdatePersonalInfo = async (currentUser, firstName, lastName) => {
  await updatePersonalInfo(currentUser, {
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

const updatePersonalInfoUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const {
    body: { firstName, lastName },
    currentUser,
  } = req;

  (
    await trier(updatePersonalInfoUserController.name).tryAsync(
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
  updatePersonalInfoUserController,
};
