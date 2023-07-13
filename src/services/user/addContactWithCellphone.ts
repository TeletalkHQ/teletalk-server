import { extractor } from "utility-store";
import { ContactItem, UserId } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { UserService } from "~/types";
import { ContactItemWithCellphone } from "~/types/datatypes";

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
  if (!currentUser) throw errorStore.find("CURRENT_USER_NOT_EXIST");

  const targetUser = await findOneUser(extractor.cellphone(data.addingContact));
  if (!targetUser) throw errorStore.find("TARGET_USER_NOT_EXIST");

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
