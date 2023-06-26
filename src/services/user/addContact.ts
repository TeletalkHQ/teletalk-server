import { errorThrower, userUtils } from "utility-store";
import { ContactItem, UserData, UserId } from "utility-store/lib/types";

import { commonServices } from "~/services/common";
import { HydratedUser } from "~/types/models";
import { errors } from "~/variables";

const addContact = async (data: {
  currentUserId: UserId;
  addingContact: ContactItem;
}) => {
  const currentUser = await commonServices.findOneUserById(data.currentUserId);

  if (!currentUser) throw errors.currentUserNotExist;

  const searchQuery = data.addingContact.userId
    ? { userId: data.addingContact.userId }
    : userUtils.extractCellphone(data.addingContact);
  const targetUser = await commonServices.findOneUser(searchQuery);
  if (!targetUser) throw errors.targetUserNotExist;

  checkExistenceOfContactItem(currentUser.contacts, targetUser.userId);

  const contact = {
    ...data.addingContact,
    userId: targetUser.userId,
  };

  await saveNewContactItem(currentUser, contact);

  return {
    addedContact: contact,
  };
};

const checkExistenceOfContactItem = (
  contacts: UserData["contacts"],
  targetUserId: UserId
) => {
  const index = contacts.findIndex((i) => i.userId == targetUserId);
  errorThrower(index !== -1, () => ({
    ...errors.contactItemExist,
    queryData: targetUserId,
  }));
};

const saveNewContactItem = async (
  currentUser: HydratedUser,
  newContact: ContactItem
) => {
  currentUser.contacts.push(newContact);
  await currentUser.save();
};

export { addContact };
