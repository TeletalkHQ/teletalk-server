import { addBlock } from "./addBlock";
import { addContactWithCellphone } from "./addContactWithCellphone";
import { addContactWithUserId } from "./addContactWithUserId";
import { disconnect } from "./disconnect";
import { getClientStatus } from "./getClientStatus";
import { getContacts } from "./getContacts";
import { getOnlineClients } from "./getOnlineClients";
import { getPublicData } from "./getPublicData";
import { getUserData } from "./getUserData";
import { removeBlock } from "./removeBlock";
import { removeContact } from "./removeContact";
import { updateContact } from "./updateContact";
import { updatePublicData } from "./updatePublicData";

export const handlers = {
	addBlock,
	addContactWithCellphone,
	addContactWithUserId,
	getContacts,
	getPublicData,
	getUserData,
	getClientStatus,
	removeBlock,
	removeContact,
	updateContact,
	updatePublicData,
	disconnect,
	getOnlineClients,
};
