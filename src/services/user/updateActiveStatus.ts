import { commonServices } from "@/services/common";

import { errors } from "@/variables/errors";

const updateActiveStatus = async (data: {
  currentUserId: string;
  isActive: boolean;
}) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.CURRENT_USER_NOT_EXIST;

  await currentUser.updateOne({
    $set: {
      status: { ...currentUser.status, isActive: data.isActive },
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

export { updateActiveStatus };
