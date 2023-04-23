import { SocketHandlerPicker } from "@/types";

import { addBlock } from "@/websocket/events/user/handlers/addBlock";
import { addContact } from "@/websocket/events/user/handlers/addContact";
import { addContactWithCellphone } from "@/websocket/events/user/handlers/addContactWithCellphone";
import { editContact } from "@/websocket/events/user/handlers/editContact";
import { getContacts } from "@/websocket/events/user/handlers/getContacts";
import { getUserData } from "@/websocket/events/user/handlers/getUserData";
import { getPublicUserData } from "@/websocket/events/user/handlers/getPublicUserData";
import { removeBlock } from "@/websocket/events/user/handlers/removeBlock";
import { removeContact } from "@/websocket/events/user/handlers/removeContact";
import { updatePublicUserData } from "@/websocket/events/user/handlers/updatePublicUserData";

type UserHandlers = SocketHandlerPicker<
  | "addBlock"
  | "addContact"
  | "addContactWithCellphone"
  | "editContact"
  | "getContacts"
  | "getUserData"
  | "getPublicUserData"
  | "removeBlock"
  | "removeContact"
  | "updatePublicUserData"
>;

const userHandlers: UserHandlers = {
  addBlock,
  addContact,
  addContactWithCellphone,
  editContact,
  getContacts,
  getUserData,
  getPublicUserData,
  removeBlock,
  removeContact,
  updatePublicUserData,
};

export { userHandlers };
