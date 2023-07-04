import { errorThrower } from "utility-store";
import {
  ContactItem,
  ContactWithEmptyCellphone,
  UserData,
} from "utility-store/lib/types";

import { UserId } from "~/types/datatypes";
import { HydratedUser } from "~/types/models";
import { errors } from "~/variables";

export const checkExistenceOfContactItem = (
  contacts: UserData["contacts"],
  targetUserId: UserId
) => {
  const index = contacts.findIndex((i) => i.userId == targetUserId);
  errorThrower(index !== -1, () => ({
    ...errors.contactItemExist,
    queryData: targetUserId,
  }));
};

export const saveContactItem = async (
  currentUser: HydratedUser,
  newContact: ContactWithEmptyCellphone | ContactItem
) => {
  currentUser.contacts.push(newContact);
  await currentUser.save();
};
