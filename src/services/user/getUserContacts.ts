import { Contacts } from "utility-store/lib/types";

import { UserService } from "~/types";
import { errors } from "~/variables";

import { findOneUserById } from "./findOneUserById";

export const getUserContacts: UserService<
  {
    currentUserId: string;
  },
  Contacts
> = async (data) => {
  const currentUser = await findOneUserById({
    userId: data.currentUserId,
  });
  if (!currentUser) throw errors.currentUserNotExist;

  return currentUser.contacts;
};
