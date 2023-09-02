import { addBlock } from "~/websocket/events/user/handlers/addBlock";
import { addContactWithCellphone } from "~/websocket/events/user/handlers/addContactWithCellphone";
import { addContactWithUserId } from "~/websocket/events/user/handlers/addContactWithUserId";
import { getContacts } from "~/websocket/events/user/handlers/getContacts";
import { getPublicData } from "~/websocket/events/user/handlers/getPublicData";
import { getUserData } from "~/websocket/events/user/handlers/getUserData";
import { removeBlock } from "~/websocket/events/user/handlers/removeBlock";
import { removeContact } from "~/websocket/events/user/handlers/removeContact";
import { updateContact } from "~/websocket/events/user/handlers/updateContact";
import { updatePublicData } from "~/websocket/events/user/handlers/updatePublicData";

export const userHandlers = {
	addBlock,
	addContactWithCellphone,
	addContactWithUserId,
	updateContact,
	getContacts,
	getUserData,
	getPublicData,
	removeBlock,
	removeContact,
	updatePublicData,
};
