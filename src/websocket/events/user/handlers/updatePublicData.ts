import { EventName, UpdatePublicDataIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";
import { utils } from "~/utils";

export const updatePublicData: SocketOnHandler<UpdatePublicDataIO> = async (
	socket,
	data
) => {
	const { userId: currentUserId } = socket;
	const { bio, firstName, lastName, username } = data;

	await services.user.updatePublicData({
		currentUserId,
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
			userId: currentUserId,
		},
	};

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
