import { services } from "~/services";
import { AddContactIO, SocketOnHandler } from "~/types";

export const addContact: SocketOnHandler<AddContactIO> = async (
	socket,
	data
) => {
	const { userId: currentUserId } = socket;

	const { addedContact } = await services.addContact({
		currentUserId,
		addingContact: data,
	});

	return {
		data: {
			addedContact,
		},
	};
};
