import { SocketHandlerPicker } from "@/types";

import { getChatInfo } from "@/websocket/events/privateChat/handlers/getChatInfo";
import { getPrivateChat } from "@/websocket/events/privateChat/handlers/getPrivateChat";
import { getPrivateChats } from "@/websocket/events/privateChat/handlers/getPrivateChats";
import { joinRoom } from "@/websocket/events/privateChat/handlers/joinRoom";
import { sendPrivateMessage } from "@/websocket/events/privateChat/handlers/sendPrivateMessage";

type PrivateChatHandlers = SocketHandlerPicker<
  | "getChatInfo"
  | "getPrivateChat"
  | "getPrivateChats"
  | "joinRoom"
  | "sendPrivateMessage"
>;

const privateChatHandlers: PrivateChatHandlers = {
  getChatInfo,
  getPrivateChat,
  getPrivateChats,
  joinRoom,
  sendPrivateMessage,
};

export { privateChatHandlers };
