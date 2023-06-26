import { PublicUserData, UserId } from "utility-store/lib/types";

import { commonServices } from "~/services/common";
import { errors } from "~/variables";

const updatePublicUserData = async (data: {
  currentUserId: UserId;
  updateProperties: Partial<PublicUserData>;
}) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.currentUserNotExist;

  await currentUser.updateOne(data.updateProperties);
  return await findCurrentUser(data.currentUserId);
};

const findCurrentUser = async (currentUserId: string) => {
  return await commonServices.findOneUserById(currentUserId);
};

export { updatePublicUserData };
