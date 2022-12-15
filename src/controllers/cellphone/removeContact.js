const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const tryToRemoveContact = async (data) => {
  await services.removeContactItem(data);
};

const responseToRemoveContact = (_, res, targetUserData) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    removedContact: targetUserData,
  });
};

const catchRemoveContact = commonFunctionalities.controllerErrorResponse;

const removeContact = async (req = expressRequest, res = expressResponse) => {
  const { currentUserId, body } = req;
  const targetUserData = userPropsUtilities.extractCellphone(body);
  (
    await trier(removeContact.name).tryAsync(tryToRemoveContact, {
      currentUserId,
      targetUserData,
    })
  )
    .executeIfNoError(responseToRemoveContact, res, targetUserData)
    .catch(catchRemoveContact, res);
};

module.exports = { removeContact };
