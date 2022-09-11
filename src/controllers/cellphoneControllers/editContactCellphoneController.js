const { trier } = require("utility-store/src/classes/Trier");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { updateOneContact } = require("@/services/userServices");

const tryToEditContact = async (currentUser, targetCellphone, editedValues) => {
  await updateOneContact(currentUser, targetCellphone, editedValues);
};

const responseToEditContact = (_, res, targetCellphone, editedValues) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    editedContact: { ...targetCellphone, ...editedValues },
  });
};

const catchEditContact = commonFunctionalities.controllerCatchResponse;

const editContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const {
    body,
    body: { firstName, lastName },
    currentUser,
  } = req;
  const targetCellphone = userPropsUtilities.extractCellphone(body);
  const editedValues = { firstName, lastName };

  (
    await trier(editContactCellphoneController.name).tryAsync(
      tryToEditContact,
      currentUser,
      targetCellphone,
      editedValues
    )
  )
    .executeIfNoError(responseToEditContact, res, targetCellphone, editedValues)
    .catch(catchEditContact, res);
};

module.exports = { editContactCellphoneController };
