const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services/services");

const tryToGetContacts = async (currentUser) => {
  const contacts = await services.getUserContacts(currentUser);
  return contacts;
};

const responseToGetContacts = (contacts, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    contacts,
  });
};

const catchGetContacts = commonFunctionalities.controllerCatchResponse;

const getContacts = async (req = expressRequest, res = expressResponse) => {
  const { currentUser } = req;

  (await trier(getContacts.name).tryAsync(tryToGetContacts, currentUser))
    .executeIfNoError(responseToGetContacts, res)
    .catch(catchGetContacts, res);
};

module.exports = { getContacts };
