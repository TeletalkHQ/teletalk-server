import { commonServices } from "~/services/common";
import { HydratedUserMongo } from "~/types";
import { errors } from "~/variables";

export const addNewClient = async (data: {
  userId: string;
  clientId: string;
}) => {
  const currentUser = await findCurrentUser(data.userId);
  if (!currentUser) throw errors.currentUserNotExist;

  await addAndSaveNew(currentUser, data.clientId);
};

const findCurrentUser = async (userId: string) => {
  return await commonServices.findOneUserById(
    userId,
    errors.currentUserNotExist
  );
};

const addAndSaveNew = async (
  currentUser: HydratedUserMongo,
  clientId: string
) => {
  currentUser.clients.push({ clientId });

  await currentUser.save();
};
