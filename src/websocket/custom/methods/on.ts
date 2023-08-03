import { checkFields } from 'check-fields';
import { trier } from 'simple-trier';
import { Socket } from 'socket.io';

import {
	CustomOn,
	EventName,
	NativeError,
	ResponseCallback,
	SocketHandlerReturnValue,
	SocketOnHandler,
	SocketResponse,
	StringMap,
} from '~/types';
import { utils } from '~/utils';
import { errors } from '~/variables';
import { events } from '~/websocket/events';

export const registerCustomOn = (socket: Socket) => {
	return ((eventName, handler) => {
		socket.on(eventName, async (data, responseCallback: ResponseCallback) => {
			const returnValue = (await tryToRunHandler(
				handler,
				socket,
				data,
				eventName,
				responseCallback
			)) || { data: {} };

			//REFACTOR: Almost all events need to fix before enabling this feature
			// tryToCheckOutputFields(socket, eventName, returnValue.data, responseCallback);

			const response = utils.createSuccessResponse(eventName, returnValue.data);

			await emitReturnValue(socket, eventName, response, responseCallback);

			if (typeof responseCallback === 'function') {
				responseCallback(response);
			}
		});
	}) as CustomOn;
};

async function tryToRunHandler(
	handler: SocketOnHandler,
	socket: Socket,
	data: StringMap,
	eventName: EventName,
	responseCallback: ResponseCallback
): Promise<void | SocketHandlerReturnValue> {
	return await trier<void | SocketHandlerReturnValue>(tryToRunHandler.name)
		.async()
		.try(async () => {
			return await handler(socket, data);
		})
		.catch(catchBlock, socket, eventName, responseCallback)
		.run();
}

function _checkOutputFields(
	socket: Socket,
	eventName: string,
	outputData: StringMap,
	responseCallback: ResponseCallback
) {
	trier(_checkOutputFields.name)
		.sync()
		.try(() => {
			const foundEvent = events.find((item) => item.name === eventName)!;
			checkFields(
				outputData,
				foundEvent.outputFields,
				errors.checkField.output
			);
		})
		.catch(catchBlock, socket, responseCallback)
		.run();
}

async function emitReturnValue(
	socket: Socket,
	eventName: EventName,
	response: SocketResponse,
	responseCallback: ResponseCallback
) {
	await trier(emitReturnValue.name)
		.async()
		.try(async () => {
			socket.customEmit(eventName, response);
			socket.to(socket.userId).emit(eventName, response);
		})
		.catch(catchBlock, socket, eventName, responseCallback)
		.run();
}

const catchBlock = (
	error: NativeError | NativeError[] | undefined,
	socket: Socket,
	eventName: EventName,
	responseCallback: ResponseCallback
) => {
	const response: SocketResponse = {
		data: {},
		errors: utils.resolveResponseError(error),
		eventName,
		ok: false,
	};

	logger.error(`customOn:catchBlock:${eventName}`, error);

	if (typeof responseCallback === 'function') responseCallback(response);

	socket.emit('error', response);
};
