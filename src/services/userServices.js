const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utilities");

const { UserMongoModel } = require("@/models/dataModels/userMongoModel");

const {
  initialOptions: { userInitialOptions },
} = require("@/variables/others/initialOptions");
const {
  userErrors: {
    BLACKLIST_ITEM_EXIST,
    BLACKLIST_ITEM_NOT_EXIST,
    CONTACT_ITEM_EXIST,
    CONTACT_ITEM_NOT_EXIST,
    TARGET_USER_NOT_EXIST,
    USER_NOT_EXIST,
  },
} = require("@/variables/errors/userErrors");

const tryToFindUser = async (userData, options) => {
  return await UserMongoModel.findOne(userData, undefined, options);
};
const userFinder = async (
  userData = userInitialOptions,
  options = { lean: true }
) => {
  return (
    await trier(userFinder.name).tryAsync(tryToFindUser, userData, options)
  )
    .printAndThrow()
    .result();
};

const tryToAddCellphoneToUserBlacklist = async (currentUser, cellphone) => {
  const { cellphone: existBlacklistItem } = userPropsUtilities.cellphoneFinder(
    currentUser.blacklist,
    cellphone
  );

  errorThrower(existBlacklistItem, () => ({
    ...BLACKLIST_ITEM_EXIST,
    targetUserData: cellphone,
  }));

  const targetUser = await userFinder(cellphone);
  errorThrower(customTypeof.isNull(targetUser), () => ({
    ...TARGET_USER_NOT_EXIST,
    targetUserData: cellphone,
  }));

  const blacklistItem = userPropsUtilities.extractCellphone(cellphone);
  currentUser.blacklist.push(blacklistItem);
  await currentUser.updateOne({
    blacklist: currentUser.blacklist,
  });
};

const addCellphoneToUserBlacklist = async (
  currentUser = userInitialOptions,
  cellphone
) => {
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
    ...CONTACT_ITEM_EXIST,
    targetUserData,
  }));

  const targetUser = await userFinder(
    userPropsUtilities.extractCellphone(targetUserData)
  );
  errorThrower(customTypeof.isNull(targetUser), () => ({
    ...TARGET_USER_NOT_EXIST,
    targetUserData,
  }));

  const contact = userPropsUtilities.extractContact({
    ...targetUserData,
    privateId: targetUser.privateId,
  });
  currentUser.contacts.push(contact);
  await currentUser.updateOne({
    contacts: currentUser.contacts,
  });

  return { targetUser, currentUser };
};
const addContactToUserContacts = async (
  currentUser = userInitialOptions,
  targetUserData = userInitialOptions
) => {
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
  errorThrower(!contactItem, () => CONTACT_ITEM_NOT_EXIST);

  currentUser.contacts.splice(cellphoneIndex, 1, {
    ...userPropsUtilities.extractContact(targetCellphone),
    firstName: editedValues.firstName,
    lastName: editedValues.lastName,
  });
  await currentUser.updateOne({
    contacts: currentUser.contacts,
  });

  return { currentUser };
};
const updateOneContact = async (
  currentUser = userInitialOptions,
  targetCellphone,
  editedValues
) => {
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

const getUserContacts = async (currentUser = userInitialOptions) => {
  return currentUser.contacts;
};

const deleteBlacklistItem = async (currentUser, targetUserData) => {
  const { cellphone: blacklistItem, cellphoneIndex } =
    userPropsUtilities.cellphoneFinder(currentUser.blacklist, targetUserData);
  errorThrower(!blacklistItem, () => BLACKLIST_ITEM_NOT_EXIST);

  currentUser.blacklist.splice(cellphoneIndex, 1);
  await currentUser.updateOne({
    blacklist: currentUser.blacklist,
  });
};

const tryToRemoveContactItem = async (currentUser, targetUserData) => {
  const { cellphone: contactItem, cellphoneIndex } =
    userPropsUtilities.cellphoneFinder(currentUser.contacts, targetUserData);
  errorThrower(!contactItem, () => ({
    ...CONTACT_ITEM_NOT_EXIST,
    targetUserData,
  }));

  //TODO: Remove all splice and use arrayUtilities
  currentUser.contacts.splice(cellphoneIndex, 1);
  await currentUser.updateOne({
    contacts: currentUser.contacts,
  });
};
const removeContactItem = async (
  currentUser = userInitialOptions,
  targetUserData = userInitialOptions
) => {
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
  const newUser = new UserMongoModel(userData);
  await newUser.save();

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

const tryToAddTestUser = async ({
  countryCode,
  countryName,
  firstName,
  lastName,
  mainToken,
  phoneNumber,
  privateId,
}) => {
  const user = await UserMongoModel.findOneAndUpdate(
    { countryCode, countryName, phoneNumber },
    {
      tokens: [{ mainToken }],
      privateId,
      firstName,
      lastName,
      contacts: [],
      blacklist: [],
      chats: [],
    },
    {
      upsert: true,
      lean: true,
      new: true,
    }
  );

  return user;
};
const addTestUser = async (userData = userInitialOptions) => {
  return (await trier(addTestUser.name).tryAsync(tryToAddTestUser, userData))
    .printAndThrow()
    .result();
};

const getAllChats = (currentUser) => {
  return currentUser.chats.map((chat) => ({ chatId: chat.chatId }));
};

const getAllUsers = async () => {
  const users = await UserMongoModel.find();
  return users;
};

const tryToGetUserData = async (privateId) => {
  const user = await UserMongoModel.findOne({ privateId }, undefined, {
    lean: true,
  });
  errorThrower(!user, () => ({
    ...USER_NOT_EXIST,
    searchQueries: { privateId },
  }));

  return user;
};
const getUserData = async (privateId) => {
  return (await trier(getUserData.name).tryAsync(tryToGetUserData, privateId))
    .printAndThrow()
    .result();
};

const removeTestUsers = async (length) => {
  for (let i = 0; i < length; i++) {
    await UserMongoModel.remove();
  }
};

const logoutUser = async (currentUser) => {
  currentUser.tokens = [];
  await currentUser.updateOne({ tokens: currentUser.tokens });
  return { ok: true };
};

module.exports = {
  addCellphoneToUserBlacklist,
  addContactToUserContacts,
  addTestUser,
  createNewNormalUser,
  deleteBlacklistItem,
  getAllChats,
  getAllUsers,
  getUserContacts,
  getUserData,
  logoutUser,
  removeContactItem,
  removeTestUsers,
  updateOneContact,
  updatePersonalInfo,
  userFinder,
};
