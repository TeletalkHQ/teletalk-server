import { commonServices } from "@/services/common";
import { HydratedUserMongo } from "@/types";

import { ERRORS } from "@/variables";

const addNewSession = async (data: { userId: string; session: string }) => {
  const currentUser = await findCurrentUser(data.userId);
  if (!currentUser) throw ERRORS.CURRENT_USER_NOT_EXIST;

  await addAndSaveNew(currentUser, data.session);
};

const findCurrentUser = async (userId: string) => {
  return await commonServices.findOneUserById(
    userId,
    ERRORS.CURRENT_USER_NOT_EXIST
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
