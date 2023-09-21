import { CreateNewUserIO } from "teletalk-type-store";
import { errorThrower, extractor, randomMaker } from "utility-store";

import { authClientStore } from "~/classes/AuthClientStore";
import { errorStore } from "~/classes/ErrorStore";
import { userUtils } from "~/classes/UserUtils";
import { models } from "~/models";
import { services } from "~/services";
import { SocketOnHandler, StoredClient } from "~/types";

export const createNewUser: SocketOnHandler<CreateNewUserIO> = async (
	socket,
	{ firstName, lastName }
) => {
	const client = await authClientStore.find(socket.clientId);
	if (!client) throw errorStore.find("CLIENT_NOT_FOUND");
	checkClientVerification(client);

	const cellphone = extractor.cellphone(client);

	const userId = getRandomId();

	await services.user.createNewUser({
		userData: {
			...userUtils.getDefaultUserData(),
			...cellphone,
			firstName,
			lastName,
			createdAt: Date.now(),
			userId,
			clients: [{ clientId: socket.clientId }],
			status: {
				isActive: true,
			},
		},
	});

	await authClientStore.update(socket.clientId, { ...client, userId });

	return { data: {} };
};

const checkClientVerification = (client: StoredClient) => {
	errorThrower(!client.isVerified, {
		...errorStore.find("CLIENT_NOT_VERIFIED"),
		createNewUser: "failed",
	});
};

const getRandomId = () => randomMaker.id(models.native.userId.maxLength);
