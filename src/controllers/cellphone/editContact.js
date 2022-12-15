const { trier } = require("utility-store/src/classes/Trier");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToEditContact = async (data) => {
  await services.updateOneContact(data);
};

const responseToEditContact = (_, res, targetCellphone, editedValues) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    editedContact: { ...targetCellphone, ...editedValues },
  });
};

const catchEditContact = commonFunctionalities.controllerErrorResponse;

const editContact = async (req = expressRequest, res = expressResponse) => {
  const {
    body,
    body: { firstName, lastName },
    currentUserId,
  } = req;
  const targetCellphone = userPropsUtilities.extractCellphone(body);
  const editedValues = { firstName, lastName };

  (
    await trier(editContact.name).tryAsync(tryToEditContact, {
      currentUserId,
      editedValues,
      targetCellphone,
    })
  )
    .executeIfNoError(responseToEditContact, res, targetCellphone, editedValues)
    .catch(catchEditContact, res);
};

module.exports = { editContact };
