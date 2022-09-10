const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { getUserContacts } = require("@/models/userModels/userModelFunctions");

const tryToGetContacts = async (currentUser) => {
  const contacts = await getUserContacts(currentUser);
  return contacts;
};

const responseToGetContacts = (contacts, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    contacts,
  });
};

const catchGetContacts = commonFunctionalities.controllerCatchResponse;

const getContactsCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const { currentUser } = req;

  (
    await trier(getContactsCellphoneController.name).tryAsync(
      tryToGetContacts,
      currentUser
    )
  )
    .executeIfNoError(responseToGetContacts, res)
    .catch(catchGetContacts, res);
};

module.exports = { getContactsCellphoneController };
