import { checkFields } from "check-fields";
import { trier } from "simple-trier";
import { Socket } from "socket.io";
import { EventName } from "teletalk-type-store";

//REFACTOR: To class
import { services } from "~/services";
import {
	CustomOn,
	ResponseCallback,
	SocketHandlerReturnValue,
	SocketOnHandler,
	SocketResponse,
	StringMap,
	UnknownError,
} from "~/types";
import { utils } from "~/utils";
import { errors } from "~/variables";
import { events } from "~/websocket/events";

export const registerCustomOn = (socket: Socket) => {
	return ((eventName, handler) => {
		socket.on(
			eventName,
			async (data: any, responseCallback?: ResponseCallback): Promise<void> => {
				const cb =
					typeof responseCallback === "function"
						? responseCallback
						: () => undefined;

				await tryToRunHandler(handler, socket, data, eventName, cb);
			}
		);
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
			const returnValue = await handler(socket, data);
			const resolvedReturnValue = resolveReturnValue(returnValue);

			//CLEANME
			if (eventName !== "getStuff") {
				checkOutputFields(
					socket,
					eventName,
					resolvedReturnValue.data,
					responseCallback
				);
			}

			const response = utils.createSuccessResponse(
				eventName,
				resolvedReturnValue.data
			);

			if (resolvedReturnValue.options.shouldEmitReturnValue)
				await emitReturnValue(socket, eventName, response, responseCallback);

			if (resolvedReturnValue.options.shouldCallResponseCallback)
				await responseCallback(response);

			if (resolvedReturnValue.options.shouldEmitToUserRooms) {
				await emitToUserRooms(socket, eventName, response, responseCallback);
			}

			resolvedReturnValue.options.cbAfterEmit();
		})
		.catch(catchBlock, socket, eventName, responseCallback)
		.run();
}

function resolveReturnValue(returnValue: void | SocketHandlerReturnValue) {
	return {
		data: returnValue?.data || {},
		options: {
			shouldEmitReturnValue:
				returnValue?.options?.shouldEmitReturnValue ?? true,
			shouldCallResponseCallback:
				returnValue?.options?.shouldCallResponseCallback ?? true,
			shouldEmitToUserRooms:
				returnValue?.options?.shouldEmitToUserRooms ?? true,
			cbAfterEmit: returnValue?.options?.cbAfterEmit ?? (() => undefined),
		},
	};
}

function checkOutputFields(
	socket: Socket,
	eventName: string,
	outputData: StringMap,
	responseCallback: ResponseCallback
) {
	trier(checkOutputFields.name)
		.sync()
		.try(() => {
			const foundEvent = events.find((item) => item.name === eventName)!;
			checkFields(
				outputData,
				foundEvent.outputFields,
				errors.checkField.output
			);
		})
		.catch(catchBlock, socket, eventName, responseCallback)
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
		})
		.catch(catchBlock, socket, eventName, responseCallback)
		.run();
}

async function emitToUserRooms(
	socket: Socket,
	eventName: EventName,
	response: SocketResponse,
	responseCallback: ResponseCallback
) {
	await trier(emitToUserRooms.name)
		.async()
		.try(async () => {
			const {
				user: { userId },
			} = await services.user.findBySessionId({
				currentSessionId: socket.sessionId,
			});

			socket.to(userId).emit(eventName, response);
		})
		.catch(catchBlock, socket, eventName, responseCallback)
		.run();
}

const catchBlock = (
	error: UnknownError,
	socket: Socket,
	eventName: EventName,
	responseCallback: ResponseCallback
) => {
	const response: SocketResponse = utils.createFailureResponse(
		eventName,
		error
	);

	logger.error(`customOn:catchBlock:${eventName}`, error);

	responseCallback(response);

	socket.emit("error", response);
};
