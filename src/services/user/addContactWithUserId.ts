import { maker } from "utility-store";
import {
  ContactItem,
  FullNameWithUserId,
  UserId,
} from "utility-store/lib/types";

import { UserService } from "~/types";
import { errors } from "~/variables";

import { findOneUser } from "./findOneUser";
import { checkExistenceOfContactItem, saveContactItem } from "./utils";

export const addContactWithUserId: UserService<
  {
    addingContact: FullNameWithUserId;
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

  const targetUser = await findOneUser({ userId: data.addingContact.userId });
  if (!targetUser) throw errors.targetUserNotExist;

  checkExistenceOfContactItem(currentUser.contacts, targetUser.userId);

  const contact: ContactItem = {
    ...data.addingContact,
    ...maker.emptyCellphone(),
  };

  await saveContactItem(currentUser, contact);

  return {
    addedContact: contact,
  };
};
