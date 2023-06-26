import { findPrivateChat } from "~/services/chat/findPrivateChat";
import { HydratedPrivateChat, PrivateChatService } from "~/types/models";

const findPrivateChatByParticipantId: PrivateChatService<
  {
    participantId: string;
  },
  Promise<HydratedPrivateChat[] | null>
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
