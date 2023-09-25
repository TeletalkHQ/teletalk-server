import { Socket } from "socket.io";

import { utils } from "~/utils";
import { ignoreMiddlewares } from "~/utils/ignoreMiddlewares";

import { attachSessionId } from "./auth/attachSessionId";
import { verifyVerificationCode } from "./auth/verifyVerificationCode";
import { checkEventAvailability } from "./checkEventAvailability";
import { checkDataFields } from "./dataValidation/checkDataFields";
import { dynamicValidator } from "./dataValidation/dynamicValidator";

export const middlewares = {
	attachSessionId,
	checkDataFields,
	checkEventAvailability,
	dynamicValidator,
	verifyVerificationCode,
};

export const registerMiddlewares = (socket: Socket) => {
	socket.customUse((socket, next, [eventName, data]) => {
		logger.info(
			`new event(${eventName}) from session:${
				socket.sessionId || "not initialized"
			}\n`,
			"data:\n",
			data
		);

		next();
	});

	socket.customUse(ignoreMiddlewares(["signIn", "getStuff"], attachSessionId));

	socket.customUse(checkEventAvailability);

	socket.customUse(checkDataFields);
	socket.customUse(dynamicValidator);

	socket.customUse(utils.applyMiddlewares("verify", verifyVerificationCode));
};
