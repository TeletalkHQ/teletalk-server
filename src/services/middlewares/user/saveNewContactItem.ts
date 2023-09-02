import { ContactItem } from "utility-store/lib/types";

import { ServiceMiddleware } from "~/types";
import { HydratedUser } from "~/types/model";

export const saveNewContactItem: ServiceMiddleware<{
	currentUser: HydratedUser;
	newContact: ContactItem;
}> = async (data) => {
	data.currentUser.contacts.push(data.newContact);
	await data.currentUser.save();
};
