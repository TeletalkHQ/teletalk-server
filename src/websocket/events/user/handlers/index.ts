import { addBlock } from "@/websocket/events/user/handlers/addBlock";
import { addContact } from "@/websocket/events/user/handlers/addContact";
import { disconnect } from "@/websocket/events/user/handlers/disconnect";
import { editContact } from "@/websocket/events/user/handlers/editContact";
import { getContacts } from "@/websocket/events/user/handlers/getContacts";
import { getCurrentUserData } from "@/websocket/events/user/handlers/getCurrentUserData";
import { getPublicUserData } from "@/websocket/events/user/handlers/getPublicUserData";
import { removeBlock } from "@/websocket/events/user/handlers/removeBlock";
import { removeContact } from "@/websocket/events/user/handlers/removeContact";
import { updateOnlineStatus } from "@/websocket/events/user/handlers/updateOnlineStatus";
import { updatePublicUserData } from "@/websocket/events/user/handlers/updatePublicUserData";

const userHandlers = {
  addBlock,
  addContact,
  disconnect,
  editContact,
  getContacts,
  getCurrentUserData,
  getPublicUserData,
  removeBlock,
  removeContact,
  updateOnlineStatus,
  updatePublicUserData,
};

export { userHandlers };
