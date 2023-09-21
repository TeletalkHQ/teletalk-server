import { trier } from "simple-trier";
import { Socket } from "socket.io";
import { VerifyIO } from "teletalk-type-store";
import { errorThrower } from "utility-store";

import { authClientStore } from "~/classes/AuthClientStore";
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

	const client = await findClient(socket.clientId);
	const { verificationCode: actualVerificationCode } = client;

	errorThrower(sentVerificationCode !== actualVerificationCode, {
		...errorStore.find("VERIFICATION_CODE_INVALID"),
		sentVerificationCode,
	});

	await authClientStore.update(socket.clientId, {
		...client,
		isVerified: true,
	});
};

const findClient = async (clientId: string) => {
	const client = await authClientStore.find(clientId);
	if (!client) throw errorStore.find("CLIENT_NOT_FOUND");
	return client;
};

const executeIfNoError = (_: void, next: SocketNext) => {
	next();
};
