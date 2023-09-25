import { addBlock } from "./addBlock";
import { addContactWithCellphone } from "./addContactWithCellphone";
import { addContactWithUserId } from "./addContactWithUserId";
import { addSession } from "./addSession";
import { createNewUser } from "./createNewUser";
import { findByCellphone } from "./findByCellphone";
import { findBySessionId } from "./findBySessionId";
import { findByUserId } from "./findByUserId";
import { getAvatar } from "./getAvatar";
import { getContacts } from "./getContacts";
import { getPublicData } from "./getPublicData";
import { isUserExist } from "./isUserExist";
import { logout } from "./logout";
import { removeBlock } from "./removeBlock";
import { removeContact } from "./removeContact";
import { updateAvatar } from "./updateAvatar";
import { updateContact } from "./updateContact";
import { updatePublicData } from "./updatePublicData";

export const userServices = {
	addBlock,
	addSession,
	addContactWithCellphone,
	addContactWithUserId,
	createNewUser,
	findByCellphone,
	findBySessionId,
	findByUserId,
	getAvatar,
	getContacts,
	getPublicData,
	isUserExist,
	logout,
	removeBlock,
	removeContact,
	updateAvatar,
	updateContact,
	updatePublicData,
};
