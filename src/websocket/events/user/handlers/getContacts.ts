import { GetContactsIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const getContacts: SocketOnHandler<GetContactsIO> = async (socket) => {
	const { userId: currentUserId } = socket;

	const { contacts } = await services.user.getContacts({
		currentUserId,
	});

	return {
		data: { contacts },
	};
};
