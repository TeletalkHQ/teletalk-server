import {
  DBContactItem,
  FullName,
  SessionId,
  UserId,
} from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const addContactWithUserId = serviceBuilder
  .create<
    {
      currentSessionId: SessionId;
      fullName: FullName;
      targetUserId: UserId;
    },
    {
      newContact: DBContactItem;
    },
    {
      currentUser: HydratedUser;
      targetUser: HydratedUser;
    }
  >()
  .setBeforeRunMiddlewares(
    serviceMiddlewares.findCurrentUser,
    serviceMiddlewares.throwIfSelfDataRequested,
    serviceMiddlewares.findTargetUser,
    serviceMiddlewares.throwIfContactExist
  )
  .setBody(async (data) => {
    const contact: DBContactItem = {
      ...data.fullName,
      isCellphoneAccessible: false,
      userId: data.targetUser.userId,
    };

    return {
      newContact: contact,
    };
  })
  .setAfterRunMiddlewares(serviceMiddlewares.saveNewContactItem)
  .build();
