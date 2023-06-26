import { addBlock } from "~/websocket/events/user/handlers/addBlock";
import { addContact } from "~/websocket/events/user/handlers/addContact";
import { editContact } from "~/websocket/events/user/handlers/editContact";
import { getContacts } from "~/websocket/events/user/handlers/getContacts";
import { getPublicUserData } from "~/websocket/events/user/handlers/getPublicUserData";
import { getUserData } from "~/websocket/events/user/handlers/getUserData";
import { removeBlock } from "~/websocket/events/user/handlers/removeBlock";
import { removeContact } from "~/websocket/events/user/handlers/removeContact";
import { updatePublicUserData } from "~/websocket/events/user/handlers/updatePublicUserData";

const userHandlers = {
  addBlock,
  addContact,
  editContact,
  getContacts,
  getUserData,
  getPublicUserData,
  removeBlock,
  removeContact,
  updatePublicUserData,
};

export { userHandlers };
