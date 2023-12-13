import { UserId, UserPublicData } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const getPublicData = serviceBuilder
  .create<
    {
      targetUserId: UserId;
    },
    {
      publicData: UserPublicData;
    },
    {
      targetUser: HydratedUser;
    }
  >()
  .setBeforeRunMiddlewares(serviceMiddlewares.findTargetUser)
  .setBody(async (data) => {
    return {
      publicData: extractor.userPublicData(data.targetUser),
    };
  })
  .build();
