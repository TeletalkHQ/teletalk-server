const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToGetContacts = async (data) => {
  return await services.getUserContacts(data);
};

const responseToGetContacts = ({ contacts }, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    contacts,
  });
};

const catchGetContacts = commonFunctionalities.controllerErrorResponse;

const getContacts = async (req = expressRequest, res = expressResponse) => {
  const { currentUserId } = req;

  (await trier(getContacts.name).tryAsync(tryToGetContacts, { currentUserId }))
    .executeIfNoError(responseToGetContacts, res)
    .catch(catchGetContacts, res);
};

module.exports = { getContacts };
