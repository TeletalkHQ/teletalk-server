import { commonServices } from "@/services/common";

import { ERRORS } from "@/variables";

const updateActiveStatus = async (data: {
  currentUserId: string;
  isActive: boolean;
}) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw ERRORS.CURRENT_USER_NOT_EXIST;

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
    ERRORS.CURRENT_USER_NOT_EXIST
  );
};

export { updateActiveStatus };
