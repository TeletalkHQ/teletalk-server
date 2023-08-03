import { FilterQuery } from 'mongoose';

import { models } from '~/models';
import { PrivateChatService } from '~/types';
import { HydratedPrivateChat, IPrivateChatDoc } from '~/types/models';

export const findOnePrivateChat: PrivateChatService<
	FilterQuery<IPrivateChatDoc>,
	HydratedPrivateChat | null
> = (data) => {
	return models.database.PrivateChat.findOne(data);
};
