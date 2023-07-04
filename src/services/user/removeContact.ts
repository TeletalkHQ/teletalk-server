import { errorThrower } from "utility-store";
import { UserData, UserId } from "utility-store/lib/types";

import { UserService } from "~/types";
import { HydratedUser } from "~/types/models";
import { errors } from "~/variables";

import { findOneUser } from "./findOneUser";

export const removeContact: UserService<
  {
    currentUserId: UserId;
    targetUserId: UserId;
  },
  void
> = async (data) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.currentUserNotExist;

  const { index } = checkExistenceOfContactItem(
    currentUser.contacts,
    data.targetUserId
  );

  await removeContactAndSave(currentUser, index);
};

const findCurrentUser = (currentUserId: string) => {
  return findOneUser({
    userId: currentUserId,
  });
};

const checkExistenceOfContactItem = (
  contacts: UserData["contacts"],
  targetUserId: UserId
) => {
  const index = contacts.findIndex((c) => c.userId === targetUserId);
  errorThrower(index === -1, () => ({
    ...errors.contactItemNotExist,
    targetUserId,
  }));

  return {
    index,
  };
};

const removeContactAndSave = async (
  currentUser: HydratedUser,
  index: number
) => {
  currentUser.contacts.splice(index, 1);
  await currentUser.save();
};
