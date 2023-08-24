import { services } from "~/services";
import { AddContactWithUserIdIO, SocketOnHandler } from "~/types";

export const addContactWithUserId: SocketOnHandler<
	AddContactWithUserIdIO
> = async (socket, data) => {
	const { userId: currentUserId } = socket;

	const { addedContact } = await services.addContactWithUserId({
		currentUserId,
		addingContact: data,
	});

	return {
		data: {
			addedContact,
		},
	};
};
