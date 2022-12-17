const { errorThrower } = require("utility-store/src/functions/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const removeContactItem = async ({ currentUserId, targetUserData }) => {
  const tryToRemoveContactItem = async () => {
    const currentUser = await commonServices.findUserById(currentUserId);

    const { cellphone: contactItem, cellphoneIndex } =
      userPropsUtilities.cellphoneFinder(currentUser.contacts, targetUserData);
    errorThrower(!contactItem, () => ({
      ...errors.CONTACT_ITEM_NOT_EXIST,
      targetUserData,
    }));

    //TODO: Remove all splice and use arrayUtilities
    currentUser.contacts.splice(cellphoneIndex, 1);
    await currentUser.save();
  };

  return (await trier(removeContactItem.name).tryAsync(tryToRemoveContactItem))
    .printAndThrow()
    .result();
};

module.exports = { removeContactItem };
