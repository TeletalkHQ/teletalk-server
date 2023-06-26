import { errorThrower } from "utility-store";
import { UserData, UserId } from "utility-store/lib/types";

import { commonServices } from "~/services/common";
import { HydratedUser } from "~/types/models";
import { errors } from "~/variables";

const removeContact = async (data: {
  currentUserId: UserId;
  targetUserId: UserId;
}) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.currentUserNotExist;

  const { index } = checkExistenceOfContactItem(
    currentUser.contacts,
    data.targetUserId
  );

  await removeContactAndSave(currentUser, index);
};

const findCurrentUser = async (currentUserId: string) => {
  return await commonServices.findOneUserById(
    currentUserId,
    errors.currentUserNotExist
  );
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

  return { index };
};

const removeContactAndSave = async (
  currentUser: HydratedUser,
  index: number
) => {
  currentUser.contacts.splice(index, 1);
  await currentUser.save();
};

export { removeContact };
