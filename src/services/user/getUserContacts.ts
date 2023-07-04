import { Contacts } from "utility-store/lib/types";

import { UserService } from "~/types";
import { errors } from "~/variables";

import { findOneUser } from "./findOneUser";

export const getUserContacts: UserService<
  {
    currentUserId: string;
  },
  Contacts
> = async (data) => {
  const currentUser = await findOneUser({
    userId: data.currentUserId,
  });
  if (!currentUser) throw errors.currentUserNotExist;

  return currentUser.contacts;
};
