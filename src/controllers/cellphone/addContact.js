const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const tryToAddContact = async (currentUser, contact) => {
  const { targetUser } = await services.addContactToUserContacts(
    currentUser,
    contact
  );
  return targetUser;
};

const responseToAddContact = (targetUser, res, contact) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    addedContact: {
      ...contact,
      userId: targetUser.userId,
    },
  });
};

const catchAddContact = commonFunctionalities.controllerCatchResponse;

const addContact = async (req = expressRequest, res = expressResponse) => {
  const { body, currentUser } = req;
  const contact = userPropsUtilities.extractContact(body);

  (await trier(addContact.name).tryAsync(tryToAddContact, currentUser, contact))
    .executeIfNoError(responseToAddContact, res, contact)
    .catch(catchAddContact, res);
};

module.exports = { addContact };
