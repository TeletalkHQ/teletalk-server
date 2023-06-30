import { models } from "~/models";
import { errors } from "~/variables";

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

  if (!currentUser) throw errors.currentUserNotExist;

  //FIXME: Remove specific clientId
  currentUser.clients = currentUser.clients.filter(
    (i) => i.clientId !== clientId
  );
  await currentUser.save();
};
