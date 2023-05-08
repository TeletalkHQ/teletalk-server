import { models } from "@/models";

import { errors } from "@/variables";

const logout = async ({
  currentUserId,
  current,
}: {
  currentUserId: string;
  current: string;
}) => {
  const currentUser = await models.database.mongoDb.User.findOne({
    userId: currentUserId,
  });

  if (!currentUser) throw errors.currentUserNotExist;

  //FIXME: Remove specific session
  currentUser.sessions = currentUser.sessions.filter(
    (i) => i.session !== current
  );
  await currentUser.save();
};

export { logout };
