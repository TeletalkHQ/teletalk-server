import { errorThrower, extractor, randomMaker } from "utility-store";
import { Cellphone, UserData } from "utility-store/lib/types";

import { clientStore } from "~/classes/ClientStore";
import { errorStore } from "~/classes/ErrorStore";
import { userUtils } from "~/classes/UserUtils";
import { models } from "~/models";
import { services } from "~/services";
import { CreateNewUserIO, SocketOnHandler, StoredClient } from "~/types";
import { ClientId } from "~/types/datatypes";

export const createNewUser: SocketOnHandler<CreateNewUserIO> = async (
	socket,
	{ firstName, lastName }
) => {
	const client = await findClient(socket.clientId);
	checkClientVerification(client);

	const cellphone = extractor.cellphone(client);
	await checkExistenceOfUser(cellphone);

	const userId = getRandomId();

	await saveNewUser({
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
	});

	await clientStore.update(socket.clientId, { ...client, userId });

	return { data: {} };
};

const findClient = async (clientId: ClientId) => {
	const client = await clientStore.find(clientId);
	if (!client) throw errorStore.find("CLIENT_NOT_FOUND");
	return client;
};

const checkClientVerification = (client: StoredClient) => {
	errorThrower(!client.isVerified, {
		...errorStore.find("CLIENT_NOT_VERIFIED"),
		createNewUser: "failed",
	});
};

const checkExistenceOfUser = async (cellphone: Cellphone) => {
	const foundUser = await services.findOneUser(cellphone);
	if (foundUser) throw errorStore.find("USER_EXIST");
};

const getRandomId = () => randomMaker.id(models.native.userId.maxLength);

const saveNewUser = async (data: UserData) => {
	await services.createNewUser(data);
};
