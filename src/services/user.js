const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

//TODO: services need test

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/utilities/utilities");

const { models } = require("@/models");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");
const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const User = models.database.mongoDb.User;

const addCellphoneToUserBlacklist = serviceBuilder
  .create()
  .body(async ({ currentUserId, blockingCellphone }) => {
    const tryToAddCellphoneToUserBlacklist = async () => {
      const currentUser = await commonServices.userFinder({
        userId: currentUserId,
      });

      const { cellphone: existBlacklistItem } =
        userPropsUtilities.cellphoneFinder(
          currentUser.blacklist,
          blockingCellphone
        );

      errorThrower(existBlacklistItem, () => ({
        ...errors.BLACKLIST_ITEM_EXIST,
        targetUserData: blockingCellphone,
      }));

      const targetUser = await commonServices.userFinder(blockingCellphone);
      errorThrower(customTypeof.isNull(targetUser), () => ({
        ...errors.TARGET_USER_NOT_EXIST,
        targetUserData: blockingCellphone,
      }));

      const blacklistItem =
        userPropsUtilities.extractCellphone(blockingCellphone);
      currentUser.blacklist.push(blacklistItem);
      await currentUser.save();
    };

    return (
      await trier(addCellphoneToUserBlacklist.name).tryAsync(
        tryToAddCellphoneToUserBlacklist
      )
    )
      .printAndThrow()
      .result();
  })
  .build();

const addContactToUserContacts = async ({ currentUserId, contact }) => {
  const tryToAddContactToUserContacts = async () => {
    const currentUser = await commonServices.userFinder({
      userId: currentUserId,
    });

    const { cellphone: isContactExist } = userPropsUtilities.cellphoneFinder(
      currentUser.contacts,
      contact
    );
    errorThrower(isContactExist, () => ({
      ...errors.CONTACT_ITEM_EXIST,
      targetUserData: contact,
    }));

    const targetUser = await commonServices.userFinder(
      userPropsUtilities.extractCellphone(contact)
    );
    errorThrower(customTypeof.isNull(targetUser), () => ({
      ...errors.TARGET_USER_NOT_EXIST,
      targetUserData: contact,
    }));

    const newContact = userPropsUtilities.extractContact({
      ...contact,
      userId: targetUser.userId,
    });
    currentUser.contacts.push(newContact);
    await currentUser.save();

    return { newContact };
  };

  return (
    await trier(addContactToUserContacts.name).tryAsync(
      tryToAddContactToUserContacts
    )
  )
    .printAndThrow()
    .result();
};

const updateOneContact = async ({
  currentUserId,
  editedValues,
  targetCellphone,
}) => {
  const tryToUpdateOneContact = async () => {
    const currentUser = await commonServices.userFinder({
      userId: currentUserId,
    });

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

  return (await trier().tryAsync(tryToUpdateOneContact))
    .printAndThrow()
    .result();
};

const getUserContacts = async ({ currentUserId }) => {
  const currentUser = await commonServices.userFinder({
    userId: currentUserId,
  });

  return currentUser.contacts;
};

const removeBlock = async ({ currentUserId, targetUserData }) => {
  const currentUser = await commonServices.userFinder({
    userId: currentUserId,
  });

  const { cellphone: blacklistItem, cellphoneIndex } =
    userPropsUtilities.cellphoneFinder(currentUser.blacklist, targetUserData);
  errorThrower(!blacklistItem, () => errors.BLACKLIST_ITEM_NOT_EXIST);

  currentUser.blacklist.splice(cellphoneIndex, 1);
  await currentUser.save();
};

const removeContactItem = async ({ currentUserId, targetUserData }) => {
  const tryToRemoveContactItem = async () => {
    const currentUser = await commonServices.userFinder({
      userId: currentUserId,
    });

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

const updatePersonalInfo = async ({ currentUserId, ...updateProperties }) => {
  const tryToUpdatePersonalInfo = async () => {
    const currentUser = await commonServices.userFinder({
      userId: currentUserId,
    });

    return await currentUser.updateOne(updateProperties);
  };

  return (
    await trier(updatePersonalInfo.name).tryAsync(tryToUpdatePersonalInfo)
  )
    .printAndThrow()
    .result();
};

const createNewNormalUser = async (userData) => {
  const tryToCreateNewNormalUser = async (userData) => {
    await User.create(userData);
    return { ok: true };
  };

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

const getUserData = async (currentUserId) => {
  const tryToGetUserData = async () => {
    //CLEANME: Update with userFinder
    const user = await User.findOne({ userId: currentUserId }, undefined, {});

    errorThrower(!user, errors.CURRENT_USER_NOT_EXIST);

    return user;
  };

  return (await trier(getUserData.name).tryAsync(tryToGetUserData))
    .printAndThrow()
    .result();
};

const logoutUser = async ({ currentUserId }) => {
  //FIXME: Remove current session
  const currentUser = await commonServices.userFinder({
    userId: currentUserId,
  });
  currentUser.sessions = [];
  await currentUser.save();
  return { ok: true };
};

const saveNewToken = async (cellphone, newToken) => {
  //FIXME: Use id instead
  const user = await commonServices.userFinder(cellphone);
  user.sessions.push({ token: newToken });
  await user.save();
};

const userServices = {
  addCellphoneToUserBlacklist,
  addContactToUserContacts,
  createNewNormalUser,
  removeBlock,
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
