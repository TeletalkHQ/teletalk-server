import { addBlock } from "~/services/user/addBlock";
import { addClient } from "~/services/user/addClient";
import { addContactWithCellphone } from "~/services/user/addContactWithCellphone";
import { addContactWithUserId } from "~/services/user/addContactWithUserId";
import { findOneUser } from "~/services/user/findOneUser";
import { getContacts } from "~/services/user/getContacts";
import { removeBlock } from "~/services/user/removeBlock";
import { removeContact } from "~/services/user/removeContact";
import { updateContact } from "~/services/user/updateContact";
import { updateUserPublicData } from "~/services/user/updateUserPublicData";

export const userServices = {
	addBlock,
	addClient,
	addContactWithCellphone,
	addContactWithUserId,
	findOneUser,
	getContacts,
	removeBlock,
	removeContact,
	updateContact,
	updateUserPublicData,
};
