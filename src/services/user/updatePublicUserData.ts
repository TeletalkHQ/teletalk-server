import { extractor } from "utility-store";
import { PublicUserData, UserId } from "utility-store/lib/types";

import { UserService } from "~/types";
import { errors } from "~/variables";

import { findOneUser } from "./findOneUser";

export const updatePublicUserData: UserService<
  {
    currentUserId: UserId;
    updateProperties: Partial<PublicUserData>;
  },
  PublicUserData
> = async (data) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.currentUserNotExist;

  const oldPublicData = extractor.publicUserData(currentUser);

  await currentUser.updateOne(data.updateProperties);

  return extractor.publicUserData({
    ...oldPublicData,
    ...data.updateProperties,
  });
};

const findCurrentUser = async (currentUserId: UserId) => {
  return await findOneUser({
    userId: currentUserId,
  });
};
