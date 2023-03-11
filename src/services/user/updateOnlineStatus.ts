import { commonServices } from "@/services/common";

import { errors } from "@/variables/errors";

const updateOnlineStatus = async (data: {
  currentUserId: string;
  isOnline: boolean;
}) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.CURRENT_USER_NOT_EXIST;

  await currentUser.updateOne({
    $set: {
      status: { ...currentUser.status, isOnline: data.isOnline },
    },
  });

  return await findCurrentUser(data.currentUserId);
};

const findCurrentUser = async (currentUserId: string) => {
  return await commonServices.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

export { updateOnlineStatus };
