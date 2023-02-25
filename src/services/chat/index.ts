import { createPrivateChat } from "@/services/chat/createPrivateChat";
import { findPrivateChat } from "@/services/chat/findPrivateChat";
import { findOnePrivateChat } from "@/services/chat/findOnePrivateChat";
import { findPrivateChatByParticipantId } from "@/services/chat/findPrivateChatByParticipantId";
import { findOnePrivateChatByChatId } from "@/services/chat/findOnePrivateChatByChatId";
import { sendPrivateMessage } from "@/services/chat/sendPrivateMessage";

const chatServices = {
  createPrivateChat,
  findOnePrivateChat,
  findPrivateChat,
  findOnePrivateChatByChatId,
  findPrivateChatByParticipantId,
  sendPrivateMessage,
};

export { chatServices };
