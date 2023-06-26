import { commonServices } from "~/services/common";
import { HydratedUser } from "~/types/models";
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

const addAndSaveNew = async (currentUser: HydratedUser, clientId: string) => {
  currentUser.clients.push({ clientId });

  await currentUser.save();
};
