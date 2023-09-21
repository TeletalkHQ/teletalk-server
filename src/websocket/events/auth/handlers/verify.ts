import { VerifyIO } from "teletalk-type-store";

import { authClientStore } from "~/classes/AuthClientStore";
import { extractor } from "~/classes/Extractor";
import { services } from "~/services";
import { SocketOnHandler, StoredClient } from "~/types";

export const verify: SocketOnHandler<VerifyIO> = async (socket) => {
	const client = (await authClientStore.find(socket.clientId)) as StoredClient;

	const cellphone = extractor.cellphone(client);
	const { isUserExist } = await services.user.isUserExist({
		cellphone,
	});

	if (isUserExist) {
		const foundUser = await services.user.findByCellphone({
			cellphone,
		});

		await services.user.addClient({
			clientId: socket.clientId,
			currentUserId: foundUser.userId,
		});

		authClientStore.update(socket.clientId, {
			...client,
			userId: foundUser.userId,
		});

		return {
			data: {
				newUser: false,
			},
		};
	}

	return {
		data: {
			newUser: true,
		},
	};
};
