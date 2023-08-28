import { addBlock } from "./addBlock";
import { addClient } from "./addClient";
import { addContactWithCellphone } from "./addContactWithCellphone";
import { addContactWithUserId } from "./addContactWithUserId";
import { createNewUser } from "./createNewUser";
import { findOneUser } from "./findOneUser";
import { getContacts } from "./getContacts";
import { logout } from "./logout";
import { removeBlock } from "./removeBlock";
import { removeContact } from "./removeContact";
import { updateContact } from "./updateContact";
import { updateUserPublicData } from "./updateUserPublicData";

export const userServices = {
	addBlock,
	addClient,
	addContactWithCellphone,
	addContactWithUserId,
	createNewUser,
	findOneUser,
	getContacts,
	logout,
	removeBlock,
	removeContact,
	updateContact,
	updateUserPublicData,
};
