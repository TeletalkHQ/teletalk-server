import { errorStore } from "~/classes/ErrorStore";
import { models } from "~/models";

export const logout = async ({
  userId,
  clientId,
}: {
  userId: string;
  clientId: string;
}) => {
  const currentUser = await models.database.User.findOne({
    userId,
  });

  if (!currentUser) throw errorStore.find("CURRENT_USER_NOT_EXIST");

  //FIXME: Remove specific clientId
  currentUser.clients = currentUser.clients.filter(
    (i) => i.clientId !== clientId
  );
  await currentUser.save();
};
