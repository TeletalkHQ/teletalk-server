import { services } from "~/services";
import { AddContactWithUserIdIO, SocketOnHandler } from "~/types";

export const addContactWithUserId: SocketOnHandler<
	AddContactWithUserIdIO
> = async (socket, data) => {
	const { userId: currentUserId } = socket;

	const { newContact } = await services.user.addContactWithUserId({
		currentUserId,
		fullName: data,
		targetUserId: data.userId,
	});

	return {
		data: {
			newContact,
		},
	};
};
