const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToGetContacts = async (currentUser) => {
  return await services.getUserContacts(currentUser);
};

const responseToGetContacts = (contacts, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    contacts,
  });
};

const catchGetContacts = commonFunctionalities.controllerErrorResponse;

const getContacts = async (req = expressRequest, res = expressResponse) => {
  const { currentUser } = req;

  (await trier(getContacts.name).tryAsync(tryToGetContacts, currentUser))
    .executeIfNoError(responseToGetContacts, res)
    .catch(catchGetContacts, res);
};

module.exports = { getContacts };
