import { addBlock } from "~/websocket/events/user/handlers/addBlock";
import { addContactWithCellphone } from "~/websocket/events/user/handlers/addContactWithCellphone";
import { addContactWithUserId } from "~/websocket/events/user/handlers/addContactWithUserId";
import { editContact } from "~/websocket/events/user/handlers/editContact";
import { getContacts } from "~/websocket/events/user/handlers/getContacts";
import { getUserData } from "~/websocket/events/user/handlers/getUserData";
import { getUserPublicData } from "~/websocket/events/user/handlers/getUserPublicData";
import { removeBlock } from "~/websocket/events/user/handlers/removeBlock";
import { removeContact } from "~/websocket/events/user/handlers/removeContact";
import { updateUserPublicData } from "~/websocket/events/user/handlers/updateUserPublicData";

export const userHandlers = {
	addBlock,
	addContactWithCellphone,
	addContactWithUserId,
	editContact,
	getContacts,
	getUserData,
	getUserPublicData,
	removeBlock,
	removeContact,
	updateUserPublicData,
};
