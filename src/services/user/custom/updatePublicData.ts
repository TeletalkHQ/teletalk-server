import { SessionId, UserId, UserPublicData } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const updatePublicData = serviceBuilder
  .create<
    {
      currentSessionId: SessionId;
      updateProperties: Partial<UserPublicData>;
    },
    {
      userId: UserId;
    },
    {
      currentUser: HydratedUser;
    }
  >()
  .setBeforeRunMiddlewares(serviceMiddlewares.findCurrentUser)
  .setBody(async (data) => {
    await data.currentUser.updateOne(data.updateProperties);

    return {
      userId: data.currentUser.userId,
    };
  })
  .build();
