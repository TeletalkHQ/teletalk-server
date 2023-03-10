import { models } from "@/models";

import { errors } from "@/variables/errors";

const logout = async ({
  currentUserId,
  currentToken,
}: {
  currentUserId: string;
  currentToken: string;
}) => {
  const currentUser = await models.database.mongoDb.User.findOne({
    userId: currentUserId,
  });

  if (!currentUser) throw errors.CURRENT_USER_NOT_EXIST;

  //FIXME: Remove specific session
  currentUser.sessions = currentUser.sessions.filter(
    (i) => i.token !== currentToken
  );
  await currentUser.save();
};

export { logout };
