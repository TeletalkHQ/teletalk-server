import { trier } from "simple-trier";
import { Socket } from "socket.io";
import { SessionId, VerifyIO } from "teletalk-type-store";

import { authSessionStore } from "~/classes/AuthSessionStore";
import { errorStore } from "~/classes/ErrorStore";
import { SocketMiddleware, SocketNext } from "~/types";

export const verifyVerificationCode: SocketMiddleware<VerifyIO> = async (
	socket,
	next,
	[_name, data]
) => {
	await trier<void>(verifyVerificationCode.name)
		.async()
		.try(tryBlock, socket, data)
		.executeIfNoError(executeIfNoError, next)
		.throw()
		.run();
};

const tryBlock = async (socket: Socket, data: VerifyIO["input"]) => {
	const { verificationCode: sentVerificationCode } = data;

	const authSession = await findAuthSession(socket.sessionId);
	const { verificationCode: actualVerificationCode } = authSession;

	if (sentVerificationCode !== actualVerificationCode)
		throw {
			...errorStore.find("VERIFICATION_CODE_INVALID"),
			sentVerificationCode,
		};

	await authSessionStore.update(socket.sessionId, {
		...authSession,
		isVerified: true,
	});
};

const findAuthSession = async (sessionId: SessionId) => {
	const authSession = await authSessionStore.find(sessionId);

	if (!authSession) throw errorStore.find("SESSION_NOT_FOUND");
	return authSession;
};

const executeIfNoError = (_: void, next: SocketNext) => {
	next();
};
