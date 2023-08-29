import { trier } from "simple-trier";
import { Socket } from "socket.io";
import {
	errorThrower,
	extractor,
	isDataHasEqualityWithTargetCellphone,
} from "utility-store";
import { Cellphone, FullNameWithUserId } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { services } from "~/services";
import {
	SocketMiddleware,
	SocketMiddlewareReturnValue,
	SocketNext,
} from "~/types";

export const selfStuffCheck: SocketMiddleware = async (
	socket,
	next,
	[_name, data]
) => {
	return await trier<SocketMiddlewareReturnValue>(selfStuffCheck.name)
		.async()
		.try(tryBlock, socket, data)
		.executeIfNoError(executeIfNoError, next)
		.throw()
		.run();
};

const tryBlock = async (
	socket: Socket,
	data: Cellphone & FullNameWithUserId
) => {
	if (data.userId) {
		errorThrower(socket.userId === data.userId, {
			...errorStore.find("SELF_STUFF"),
			targetUserId: data.userId,
		});
	} else {
		const currentUser = (await services.findOneUser({
			userId: socket.userId,
		}))!;

		errorThrower(
			isDataHasEqualityWithTargetCellphone(
				data,
				extractor.cellphone(currentUser)
			),
			{
				...errorStore.find("SELF_STUFF"),
				targetUserCellphone: extractor.cellphone(data),
			}
		);
	}

	return {
		ok: true,
	};
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
	next();
};
