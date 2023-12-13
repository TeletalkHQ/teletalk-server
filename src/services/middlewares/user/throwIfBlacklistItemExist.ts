import { UserId } from "teletalk-type-store";

import { errorStore } from "~/classes/ErrorStore";
import { ServiceMiddleware } from "~/types";
import { HydratedUser } from "~/types/model";

export const throwIfBlacklistItemExist: ServiceMiddleware<
  {
    currentUser: HydratedUser;
    targetUserId: UserId;
  },
  void
> = (data) => {
  const index = data.currentUser.blacklist.findIndex(
    (i) => i.userId === data.targetUserId
  );
  if (index !== -1)
    throw {
      ...errorStore.find("BLACKLIST_ITEM_EXIST"),
      targetUserData: data.targetUserId,
    };
};
