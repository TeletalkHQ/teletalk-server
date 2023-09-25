import { EventName, UpdatePublicDataIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";
import { utils } from "~/utils";

export const updatePublicData: SocketOnHandler<UpdatePublicDataIO> = async (
	socket,
	data
) => {
	const { bio, firstName, lastName, username } = data;

	const result = await services.user.updatePublicData({
		currentSessionId: socket.sessionId,
		updateProperties: {
			bio,
			firstName,
			lastName,
			username,
		},
	});

	const returnData = {
		userPublicData: {
			...data,
			userId: result.userId,
		},
	};

	//TODO: Change to public:id
	socket
		.to("public")
		.emit<EventName>(
			"updatePublicData",
			utils.createSuccessResponse("updatePublicData", returnData)
		);

	return {
		data: returnData,
	};
};
