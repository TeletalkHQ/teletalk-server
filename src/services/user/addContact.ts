import { errorThrower, userUtils } from "utility-store";
import { ContactItem, UserData, UserId } from "utility-store/lib/types";

import { UserService } from "~/types";
import { HydratedUser } from "~/types/models";
import { errors } from "~/variables";

import { findOneUser } from "./findOneUser";
import { findOneUserById } from "./findOneUserById";

export const addContact: UserService<
  {
    addingContact: ContactItem;
    currentUserId: UserId;
  },
  {
    addedContact: ContactItem;
  }
> = async (data) => {
  const currentUser = await findOneUserById({
    userId: data.currentUserId,
  });

  if (!currentUser) throw errors.currentUserNotExist;

  const searchQuery = data.addingContact.userId
    ? { userId: data.addingContact.userId }
    : userUtils.extractCellphone(data.addingContact);
  const targetUser = await findOneUser(searchQuery);
  if (!targetUser) throw errors.targetUserNotExist;

  checkExistenceOfContactItem(currentUser.contacts, targetUser.userId);

  const contact: ContactItem = {
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
