const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const tryToRemoveContact = async (currentUser, cellphone) => {
  await services.removeContactItem(currentUser, cellphone);
};

const responseToRemoveContact = (_, res, cellphone) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    removedContact: cellphone,
  });
};

const catchRemoveContact = commonFunctionalities.controllerCatchResponse;

const removeContact = async (req = expressRequest, res = expressResponse) => {
  const { currentUser, body } = req;
  const cellphone = userPropsUtilities.extractCellphone(body);
  (
    await trier(removeContact.name).tryAsync(
      tryToRemoveContact,
      currentUser,
      cellphone
    )
  )
    .executeIfNoError(responseToRemoveContact, res, cellphone)
    .catch(catchRemoveContact, res);
};

module.exports = { removeContact };
