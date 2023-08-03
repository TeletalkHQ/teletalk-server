import { trier } from 'simple-trier';
import { Socket } from 'socket.io';
import { errorThrower } from 'utility-store';

import { errorStore } from '~/classes/ErrorStore';
import { services } from '~/services';
import { SocketMiddleware, SocketNext } from '~/types';

export const checkCurrentUser: SocketMiddleware = async (socket, next) => {
	await trier<void>(checkCurrentUser.name)
		.async()
		.try(tryBlock, socket)
		.executeIfNoError(executeIfNoError, next)
		.throw()
		.run();
};

const tryBlock = async (socket: Socket) => {
	const currentUser = await services.findOneUser({ userId: socket.userId });
	errorThrower(!currentUser, errorStore.find('CURRENT_USER_NOT_EXIST'));
};

const executeIfNoError = (_: void, next: SocketNext) => {
	next();
};
