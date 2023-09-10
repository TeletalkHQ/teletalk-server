import { extractor } from "~/classes/Extractor";
import { services } from "~/services";
import { AddContactWithCellphoneIO, SocketOnHandler } from "~/types";

export const addContactWithCellphone: SocketOnHandler<
	AddContactWithCellphoneIO
> = async (socket, data) => {
	const { userId: currentUserId } = socket;

	const { newContact } = await services.user.addContactWithCellphone({
		currentUserId,
		addingContact: data,
		targetUserCellphone: extractor.cellphone(data),
	});

	return {
		data: {
			newContact,
		},
	};
};
