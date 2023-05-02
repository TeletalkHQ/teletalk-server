import { commonServices } from "@/services/common";
import { HydratedUserMongo } from "@/types";

import { errors } from "@/variables";

const addNewSession = async (data: { userId: string; session: string }) => {
  const currentUser = await findCurrentUser(data.userId);
  if (!currentUser) throw errors.currentUserNotExist;

  await addAndSaveNew(currentUser, data.session);
};

const findCurrentUser = async (userId: string) => {
  return await commonServices.findOneUserById(
    userId,
    errors.currentUserNotExist
  );
};

const addAndSaveNew = async (
  currentUser: HydratedUserMongo,
  session: string
) => {
  currentUser.sessions.push({ session });

  await currentUser.save();
};

export { addNewSession };
