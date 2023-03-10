import { findPrivateChat } from "@/services/chat/findPrivateChat";

import { PrivateChatMongo } from "@/types";

const findPrivateChatByParticipantId = async (data: {
  participantId: string;
}) => {
  const key = "participants.participantId" as keyof PrivateChatMongo;
  return await findPrivateChat({
    [key]: data.participantId,
  });
};

export { findPrivateChatByParticipantId };
