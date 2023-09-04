import { errorStore } from "~/classes/ErrorStore";
import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { PrivateChatItem } from "~/types/datatypes";

import { coreServices } from "../core";

export const findByChatId = serviceBuilder
	.create<
		{
			chatId: string;
		},
		PrivateChatItem
	>()
	.setBody((data) => {
		const item = coreServices.find({ chatId: data.chatId });
		if (!item) throw errorStore.find("CHAT_NOT_EXIST");
		return item as PrivateChatItem;
	})
	.build();
