import { userUtils } from "utility-store";
import { PublicUserData, UserId } from "utility-store/lib/types";

import { UserService } from "~/types";
import { errors } from "~/variables";

import { findOneUserById } from "./findOneUserById";

export const updatePublicUserData: UserService<
  {
    currentUserId: UserId;
    updateProperties: Partial<PublicUserData>;
  },
  PublicUserData
> = async (data) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.currentUserNotExist;

  const oldPublicData = userUtils.extractPublicUserData(currentUser);

  await currentUser.updateOne(data.updateProperties);

  return userUtils.extractPublicUserData({
    ...oldPublicData,
    ...data.updateProperties,
  });
};

const findCurrentUser = async (currentUserId: UserId) => {
  return await findOneUserById({
    userId: currentUserId,
  });
};
