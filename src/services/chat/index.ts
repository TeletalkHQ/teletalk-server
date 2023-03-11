import { createPrivateChat } from "@/services/chat/createPrivateChat";
import { findOnePrivateChat } from "@/services/chat/findOnePrivateChat";
import { findOnePrivateChatByChatId } from "@/services/chat/findOnePrivateChatByChatId";
import { findPrivateChat } from "@/services/chat/findPrivateChat";
import { findPrivateChatByParticipantId } from "@/services/chat/findPrivateChatByParticipantId";
import { sendPrivateMessage } from "@/services/chat/sendPrivateMessage";

const chatServices = {
  createPrivateChat,
  findOnePrivateChat,
  findOnePrivateChatByChatId,
  findPrivateChat,
  findPrivateChatByParticipantId,
  sendPrivateMessage,
};

export { chatServices };
