import { trier } from 'simple-trier';
import { Socket } from 'socket.io';

import { errorStore } from '~/classes/ErrorStore';
import {
	SocketMiddleware,
	SocketMiddlewareReturnValue,
	SocketNext,
} from '~/types';
import { utils } from '~/utils';

export const attachClientStr: SocketMiddleware = async (
	socket,
	next,
	[_name]
) => {
	return await trier<SocketMiddlewareReturnValue>(attachClientStr.name)
		.async()
		.try(tryBlock, socket)
		.executeIfNoError(executeIfNoError, next)
		.throw()
		.run();
};

const tryBlock = async (socket: Socket) => {
	const { cookie } = socket.handshake.headers;
	if (!cookie) throw errorStore.find('CLIENT_COOKIE_REQUIRED');

	socket.clientStr = utils.extractClientFromCookie(cookie);

	return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
	next();
};
