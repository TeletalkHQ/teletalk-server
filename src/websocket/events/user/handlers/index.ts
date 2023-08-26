import { addBlock } from "~/websocket/events/user/handlers/addBlock";
import { addContactWithCellphone } from "~/websocket/events/user/handlers/addContactWithCellphone";
import { addContactWithUserId } from "~/websocket/events/user/handlers/addContactWithUserId";
import { editContact } from "~/websocket/events/user/handlers/editContact";
import { getContacts } from "~/websocket/events/user/handlers/getContacts";
import { getPublicUserData } from "~/websocket/events/user/handlers/getPublicUserData";
import { getUserData } from "~/websocket/events/user/handlers/getUserData";
import { removeBlock } from "~/websocket/events/user/handlers/removeBlock";
import { removeContact } from "~/websocket/events/user/handlers/removeContact";
import { updatePublicUserData } from "~/websocket/events/user/handlers/updatePublicUserData";

export const userHandlers = {
	addBlock,
	addContactWithCellphone,
	addContactWithUserId,
	editContact,
	getContacts,
	getPublicUserData,
	getUserData,
	removeBlock,
	removeContact,
	updatePublicUserData,
};
