import { models } from '~/models';

import { assertionInitializer } from '@/classes/AssertionInitializer';
import { AssertionInitializer } from '@/types';

const chatModels = models.native;

export const chatIdAssertionInitializer: AssertionInitializer = (
	{ equalValue, testValue },
	options
) => {
	assertionInitializer()
		.setVariables(chatModels.chatId, equalValue, testValue)
		.setOptions(options)
		.addCommonTest()
		.run();
};
