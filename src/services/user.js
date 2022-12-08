const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

//TODO: Some services need tests

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/utilities/utilities");

const { models } = require("@/models");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const User = models.database.mongoDb.User;

const tryToAddCellphoneToUserBlacklist = async (currentUser, cellphone) => {
  const { cellphone: existBlacklistItem } = userPropsUtilities.cellphoneFinder(
    currentUser.blacklist,
    cellphone
  );

  errorThrower(existBlacklistItem, () => ({
    ...errors.BLACKLIST_ITEM_EXIST,
    targetUserData: cellphone,
  }));

  const targetUser = await commonServices.userFinder(cellphone);
  errorThrower(customTypeof.isNull(targetUser), () => ({
    ...errors.TARGET_USER_NOT_EXIST,
    targetUserData: cellphone,
  }));

  const blacklistItem = userPropsUtilities.extractCellphone(cellphone);
  currentUser.blacklist.push(blacklistItem);
  await currentUser.save();
};

const addCellphoneToUserBlacklist = async (currentUser, cellphone) => {
  return (
    await trier(addCellphoneToUserBlacklist.name).tryAsync(
      tryToAddCellphoneToUserBlacklist,
      currentUser,
      cellphone
    )
  )
    .printAndThrow()
    .result();
};

const tryToAddContactToUserContacts = async (currentUser, targetUserData) => {
  const { cellphone: isContactExist } = userPropsUtilities.cellphoneFinder(
    currentUser.contacts,
    targetUserData
  );
  errorThrower(isContactExist, () => ({
    ...errors.CONTACT_ITEM_EXIST,
    targetUserData,
  }));

  const targetUser = await commonServices.userFinder(
    userPropsUtilities.extractCellphone(targetUserData)
  );
  errorThrower(customTypeof.isNull(targetUser), () => ({
    ...errors.TARGET_USER_NOT_EXIST,
    targetUserData,
  }));

  const contact = userPropsUtilities.extractContact({
    ...targetUserData,
    userId: targetUser.userId,
  });
  currentUser.contacts.push(contact);
  await currentUser.save();

  return { targetUser, currentUser };
};
const addContactToUserContacts = async (currentUser, targetUserData) => {
  return (
    await trier(addContactToUserContacts.name).tryAsync(
      tryToAddContactToUserContacts,
      currentUser,
      targetUserData
    )
  )
    .printAndThrow()
    .result();
};

const tryToUpdateOneContact = async ({
  currentUser,
  editedValues,
  targetCellphone,
}) => {
  const { cellphone: contactItem, cellphoneIndex } =
    userPropsUtilities.cellphoneFinder(currentUser.contacts, targetCellphone);
  errorThrower(!contactItem, () => errors.CONTACT_ITEM_NOT_EXIST);

  const newContact = {
    ...userPropsUtilities.extractContact(targetCellphone),
    firstName: editedValues.firstName,
    lastName: editedValues.lastName,
  };
  currentUser.contacts.splice(cellphoneIndex, 1, newContact);
  await currentUser.save();

  return { currentUser };
};
const updateOneContact = async (currentUser, targetCellphone, editedValues) => {
  return (
    await trier().tryAsync(tryToUpdateOneContact, {
      currentUser,
      editedValues,
      targetCellphone,
    })
  )
    .printAndThrow()
    .result();
};

const getUserContacts = async (currentUser) => {
  return currentUser.contacts;
};

const deleteBlacklistItem = async (currentUser, targetUserData) => {
  const { cellphone: blacklistItem, cellphoneIndex } =
    userPropsUtilities.cellphoneFinder(currentUser.blacklist, targetUserData);
  errorThrower(!blacklistItem, () => errors.BLACKLIST_ITEM_NOT_EXIST);

  currentUser.blacklist.splice(cellphoneIndex, 1);
  await currentUser.save();
};

const tryToRemoveContactItem = async (currentUser, targetUserData) => {
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
const removeContactItem = async (currentUser, targetUserData) => {
  return (
    await trier(removeContactItem.name).tryAsync(
      tryToRemoveContactItem,
      currentUser,
      targetUserData
    )
  )
    .printAndThrow()
    .result();
};

const tryToUpdatePersonalInfo = async (currentUser, updateProperties) => {
  return await currentUser.updateOne(updateProperties);
};
const updatePersonalInfo = async (currentUser, updateProperties) => {
  return (
    await trier(updatePersonalInfo.name).tryAsync(
      tryToUpdatePersonalInfo,
      currentUser,
      updateProperties
    )
  )
    .printAndThrow()
    .result();
};

const tryToCreateNewNormalUser = async (userData) => {
  await User.create(userData);
  return { ok: true };
};
const createNewNormalUser = async (userData) => {
  return (
    await trier(createNewNormalUser.name).tryAsync(
      tryToCreateNewNormalUser,
      userData
    )
  )
    .printAndThrow()
    .result();
};

const getAllUsers = async () => {
  return await User.find();
};

const tryToGetUserData = async (userId) => {
  const user = await User.findOne({ userId }, undefined, {
    lean: true,
  });
  errorThrower(!user, errors.CURRENT_USER_NOT_EXIST);

  return user;
};
const getUserData = async (userId) => {
  return (await trier(getUserData.name).tryAsync(tryToGetUserData, userId))
    .printAndThrow()
    .result();
};

const logoutUser = async (currentUser) => {
  currentUser.sessions = [];
  await currentUser.save();
  return { ok: true };
};

const saveNewToken = async (cellphone, newToken) => {
  const user = await commonServices.userFinder(cellphone);
  user.sessions.push({ token: newToken });
  await user.save();
};

const userServices = {
  addCellphoneToUserBlacklist,
  addContactToUserContacts,
  createNewNormalUser,
  deleteBlacklistItem,
  getAllUsers,
  getUserContacts,
  getUserData,
  logoutUser,
  removeContactItem,
  saveNewToken,
  updateOneContact,
  updatePersonalInfo,
};

module.exports = {
  userServices,
};
