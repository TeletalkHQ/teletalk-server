import { models } from '~/models';
import { PrivateChatItem } from '~/types/datatypes';

import { assertionInitializer } from '@/classes/AssertionInitializer';
import { AssertionInitializer } from '@/types';

const chatModels = models.native;

export const privateChatsAssertionInitializer: AssertionInitializer = (
	{ testValue },
	_options
) => {
	const builder = assertionInitializer();
	//   .setModel(chatModels.privateChats)
	//   .setTestValue(testValue)
	//   .setOptions(options);

	// builder.typeCheck().run();

	testValue.forEach((privateChat: PrivateChatItem) => {
		builder
			.customTypeCheck(privateChat, 'object')
			//TODO: Add all parts
			.setModel(chatModels.chatId)
			.setTestValue(privateChat.chatId)
			.typeCheck()
			.gteCheck()
			.lteCheck()
			.run();
	});
};
