const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { addContactToUserContacts } = require("@/services/userServices");

const tryToAddContact = async (currentUser, contact) => {
  const { targetUser } = await addContactToUserContacts(currentUser, contact);
  return targetUser;
};

const responseToAddContact = (targetUser, res, contact) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    addedContact: {
      ...contact,
      privateId: targetUser.privateId,
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
