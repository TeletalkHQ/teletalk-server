import { PrivateChatService } from '~/types';
import { HydratedPrivateChat } from '~/types/models';

import { findOnePrivateChat } from './findOnePrivateChat';

export const findOnePrivateChatByChatId: PrivateChatService<
	{
		chatId: string;
	},
	HydratedPrivateChat | null
> = (data, projection, options) => {
	return findOnePrivateChat(data, projection, options);
};
