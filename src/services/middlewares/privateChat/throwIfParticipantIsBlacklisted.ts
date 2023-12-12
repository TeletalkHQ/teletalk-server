import { errorStore } from "~/classes/ErrorStore";
import { HydratedUser, ServiceMiddleware } from "~/types";

export const throwIfParticipantIsBlacklisted: ServiceMiddleware<
  {
    currentParticipant: HydratedUser;
    targetParticipant: HydratedUser;
  },
  void
> = (data) => {
  const isBlockedFromCurrent = data.currentParticipant.blacklist.some(
    (i) => i.userId === data.targetParticipant.userId
  );
  if (isBlockedFromCurrent) throw errorStore.find("TARGET_USER_IS_BLACKLISTED");

  const isBlockedFromTarget = data.targetParticipant.blacklist.some(
    (i) => i.userId === data.currentParticipant.userId
  );
  if (isBlockedFromTarget) throw errorStore.find("CURRENT_USER_IS_BLACKLISTED");
};
