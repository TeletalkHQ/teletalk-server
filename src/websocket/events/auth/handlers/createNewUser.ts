import { CreateNewUserIO } from "teletalk-type-store";
import { extractor, randomMaker } from "utility-store";

import { authSessionStore } from "~/classes/AuthSessionStore";
import { errorStore } from "~/classes/ErrorStore";
import { sessionManager } from "~/classes/SessionManager";
import { userUtils } from "~/classes/UserUtils";
import { models } from "~/models";
import { services } from "~/services";
import { SocketOnHandler, StoredAuthSession } from "~/types";

export const createNewUser: SocketOnHandler<CreateNewUserIO> = async (
	socket,
	{ firstName, lastName }
) => {
	const authSession = await authSessionStore.find(socket.sessionId);
	if (!authSession) throw errorStore.find("SESSION_NOT_FOUND");
	checkClientVerification(authSession);

	const cellphone = extractor.cellphone(authSession);
	const userId = getRandomId();
	const sessionId = sessionManager.generateSessionId();
	const session = await sessionManager.sign(sessionId);

	await services.user.createNewUser({
		...userUtils.getDBDefaultUserData(),
		...cellphone,
		firstName,
		lastName,
		createdAt: Date.now(),
		userId,
		sessions: [{ sessionId }],
		status: {
			isActive: true,
		},
	});

	await authSessionStore.remove(socket.sessionId);

	return {
		data: {
			session,
		},
		options: {
			shouldEmitToUserRooms: false,
		},
	};
};

const checkClientVerification = (authSession: StoredAuthSession) => {
	if (!authSession.isVerified)
		throw {
			...errorStore.find("SESSION_NOT_VERIFIED"),
			createNewUser: "failed",
		};
};

const getRandomId = () => randomMaker.id(models.native.userId.maxLength);
