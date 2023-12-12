import { checkFields } from "check-fields";
import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { services } from "~/services";
import { events } from "~/socket/events";
import {
  CustomOn,
  ResponseCallback,
  SocketHandlerReturnValue,
  SocketResponse,
  StringMap,
  UnknownError,
} from "~/types";
import { utils } from "~/utils";
import { errors } from "~/variables";

export const registerCustomOn = (socket: Socket) => {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  return function (eventName, handler) {
    socket.on(
      eventName,
      async (data: StringMap, cb?: ResponseCallback): Promise<void> => {
        const responseCallback =
          typeof cb === "function" ? cb : () => undefined;

        async function tryToRunHandler(): Promise<void | SocketHandlerReturnValue> {
          return await trier<void | SocketHandlerReturnValue>(
            tryToRunHandler.name
          )
            .async()
            .try(async () => {
              const returnValue = await handler(socket, data);
              const resolvedReturnValue = resolveReturnValue(returnValue);

              if (eventName !== "getStuff") {
                checkOutputFields(resolvedReturnValue.data);
              }

              const response = utils.createSuccessResponse(
                eventName,
                resolvedReturnValue.data
              );

              if (resolvedReturnValue.options.shouldEmitReturnValue)
                await emitReturnValue(response);

              if (resolvedReturnValue.options.shouldCallResponseCallback)
                await responseCallback(response);

              if (resolvedReturnValue.options.shouldEmitToUserRooms) {
                await emitToUserRooms(response);
              }

              resolvedReturnValue.options.cbAfterEmit();
            })
            .catch(catchBlock, socket, eventName, responseCallback)
            .run();
        }

        function resolveReturnValue(
          returnValue: void | SocketHandlerReturnValue
        ) {
          return {
            data: returnValue?.data || {},
            options: {
              shouldEmitReturnValue:
                returnValue?.options?.shouldEmitReturnValue ?? true,
              shouldCallResponseCallback:
                returnValue?.options?.shouldCallResponseCallback ?? true,
              shouldEmitToUserRooms:
                returnValue?.options?.shouldEmitToUserRooms ?? true,
              cbAfterEmit:
                returnValue?.options?.cbAfterEmit ?? (() => undefined),
            },
          };
        }

        function checkOutputFields(outputData: StringMap) {
          const foundEvent = events.find((item) => item.name === eventName)!;
          checkFields(
            outputData,
            foundEvent.outputFields,
            errors.checkField.output
          );
        }

        async function emitReturnValue(response: SocketResponse) {
          socket.emit(eventName, response);
        }

        async function emitToUserRooms(response: SocketResponse) {
          const {
            user: { userId },
          } = await services.user.findBySessionId({
            currentSessionId: socket.sessionId,
          });
          socket.to(userId).emit(eventName, response);
        }

        const catchBlock = (error: UnknownError) => {
          const response: SocketResponse = utils.createFailureResponse(
            eventName,
            error
          );
          logger.error(`customOn:catchBlock:${eventName}`, error);
          responseCallback(response);
          socket.emit("error", response);
        };

        await tryToRunHandler();
      }
    );
  } as CustomOn;
};
