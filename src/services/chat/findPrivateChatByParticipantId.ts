import { serviceBuilder } from "@/classes/service/ServiceBuilder";

import { findPrivateChat } from "@/services/chat/findPrivateChat";

const findPrivateChatByParticipantId = serviceBuilder
  .create()
  .body(async ({ participantId }) => {
    return await findPrivateChat().run({
      "participants.participantId": participantId,
    });
  })
  .build();

export { findPrivateChatByParticipantId };
