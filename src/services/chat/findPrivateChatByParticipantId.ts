import { findPrivateChat } from "~/services/chat/findPrivateChat";

import { HydratedPrivateChatMongo, PrivateChatService } from "~/types";

const findPrivateChatByParticipantId: PrivateChatService<
  {
    participantId: string;
  },
  Promise<HydratedPrivateChatMongo[] | null>
> = async (data, projection, options) => {
  return await findPrivateChat(
    {
      "participants.participantId": data.participantId,
    },
    projection,
    options
  );
};

export { findPrivateChatByParticipantId };
