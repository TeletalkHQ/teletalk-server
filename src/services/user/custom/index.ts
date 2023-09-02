import { addBlock } from "./addBlock";
import { addClient } from "./addClient";
import { addContactWithCellphone } from "./addContactWithCellphone";
import { addContactWithUserId } from "./addContactWithUserId";
import { createNewUser } from "./createNewUser";
import { findByCellphone } from "./findByCellphone";
import { findByUserId } from "./findByUserId";
import { getContacts } from "./getContacts";
import { getPublicData } from "./getPublicData";
import { isUserExist } from "./isUserExist";
import { logout } from "./logout";
import { removeBlock } from "./removeBlock";
import { removeContact } from "./removeContact";
import { updateContact } from "./updateContact";
import { updatePublicData } from "./updatePublicData";

export const userServices = {
	addBlock,
	addClient,
	addContactWithCellphone,
	addContactWithUserId,
	createNewUser,
	findByCellphone,
	findByUserId,
	getContacts,
	getPublicData,
	isUserExist,
	logout,
	removeBlock,
	removeContact,
	updateContact,
	updatePublicData,
};
