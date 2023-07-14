import { errorThrower } from "utility-store";
import { UserData, UserId } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { UserService } from "~/types";
import { HydratedUser } from "~/types/models";

import { findOneUser } from "./findOneUser";

export const removeContact: UserService<
  {
    currentUserId: UserId;
    targetUserId: UserId;
  },
  void
> = async (data) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errorStore.find("CURRENT_USER_NOT_EXIST");

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
    ...errorStore.find("CONTACT_ITEM_NOT_EXIST"),
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
