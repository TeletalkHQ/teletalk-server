import {
  ContactWithEmptyCellphone,
  FullNameWithUserId,
  UserId,
} from "utility-store/lib/types";

import { userUtils } from "~/classes/UserUtils";
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
    addedContact: ContactWithEmptyCellphone;
  }
> = async (data) => {
  const currentUser = await findOneUser({
    userId: data.currentUserId,
  });
  if (!currentUser) throw errors.currentUserNotExist;

  const targetUser = await findOneUser({ userId: data.addingContact.userId });
  if (!targetUser) throw errors.targetUserNotExist;

  checkExistenceOfContactItem(currentUser.contacts, targetUser.userId);

  const contact: ContactWithEmptyCellphone = {
    ...data.addingContact,
    ...userUtils.makeEmptyCellphone(),
  };

  await saveContactItem(currentUser, contact);

  return {
    addedContact: contact,
  };
};
