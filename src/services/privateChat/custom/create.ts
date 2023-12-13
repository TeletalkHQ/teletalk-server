import { UserId } from "teletalk-type-store";
import { randomMaker } from "utility-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { models } from "~/models";
import { serviceMiddlewares } from "~/services/middlewares";

import { coreServices } from "../core";

export const create = serviceBuilder
  .create<
    {
      currentParticipantId: UserId;
      targetParticipantId: UserId;
    },
    void
  >()
  .setBeforeRunMiddlewares(serviceMiddlewares.throwIfPrivateChatExist)
  .setBody(async (data) => {
    await coreServices.create({
      chatId: randomMaker.id(models.native.chatId.maxLength),
      createdAt: Date.now(),
      currentParticipantId: data.currentParticipantId,
      targetParticipantId: data.targetParticipantId,
    });
  })
  .build();
