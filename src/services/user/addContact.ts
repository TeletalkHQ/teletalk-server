import { ContactItem, UserId } from "utility-store/lib/types";

import { UserService } from "~/types";
import { errors } from "~/variables";

import { findOneUser } from "./findOneUser";
import { checkExistenceOfContactItem, saveContactItem } from "./utils";

export const addContact: UserService<
  {
    addingContact: ContactItem;
    currentUserId: UserId;
  },
  {
    addedContact: ContactItem;
  }
> = async (data) => {
  const currentUser = await findOneUser({
    userId: data.currentUserId,
  });
  if (!currentUser) throw errors.currentUserNotExist;

  const targetUser = await findOneUser({
    userId: data.addingContact.userId,
  });
  if (!targetUser) throw errors.targetUserNotExist;

  checkExistenceOfContactItem(currentUser.contacts, targetUser.userId);

  await saveContactItem(currentUser, data.addingContact);

  return {
    addedContact: data.addingContact,
  };
};
