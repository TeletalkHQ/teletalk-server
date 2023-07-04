import { extractor } from "utility-store";
import { ContactItem, UserId } from "utility-store/lib/types";

import { UserService } from "~/types";
import { ContactItemWithCellphone } from "~/types/datatypes";
import { errors } from "~/variables";

import { findOneUser } from "./findOneUser";
import { checkExistenceOfContactItem, saveContactItem } from "./utils";

export const addContactWithCellphone: UserService<
  {
    addingContact: ContactItemWithCellphone;
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

  const targetUser = await findOneUser(extractor.cellphone(data.addingContact));
  if (!targetUser) throw errors.targetUserNotExist;

  checkExistenceOfContactItem(currentUser.contacts, targetUser.userId);

  const contact: ContactItem = {
    ...data.addingContact,
    userId: targetUser.userId,
  };

  await saveContactItem(currentUser, contact);

  return {
    addedContact: contact,
  };
};
