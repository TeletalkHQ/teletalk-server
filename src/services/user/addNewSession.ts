import { commonServices } from "@/services/common";
import { HydratedUserMongo } from "@/types";

import { errors } from "@/variables/errors";

const addNewSession = async (data: { userId: string; newToken: string }) => {
  const currentUser = await findCurrentUser(data.userId);
  if (!currentUser) throw errors.CURRENT_USER_NOT_EXIST;

  await addAndSaveNewToken(currentUser, data.newToken);
};

const findCurrentUser = async (userId: string) => {
  return await commonServices.findOneUserById(
    userId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

const addAndSaveNewToken = async (
  currentUser: HydratedUserMongo,
  newToken: string
) => {
  currentUser.sessions.push({ token: newToken });

  await currentUser.save();
};

export { addNewSession };
