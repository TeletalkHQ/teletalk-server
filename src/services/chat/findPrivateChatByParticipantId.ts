import { findPrivateChat } from "@/services/chat/findPrivateChat";

import { PrivateChatMongo } from "@/types";
import { ProjectionType, QueryOptions } from "mongoose";

const findPrivateChatByParticipantId = async (
  data: {
    participantId: string;
  },
  projection?: ProjectionType<PrivateChatMongo>,
  options?: QueryOptions
) => {
  const key = "participants.participantId" as keyof PrivateChatMongo;
  return await findPrivateChat(
    {
      [key]: data.participantId,
    },
    projection,
    options
  );
};

export { findPrivateChatByParticipantId };
