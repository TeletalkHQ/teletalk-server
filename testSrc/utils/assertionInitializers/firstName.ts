import { models } from '~/models';

import { assertionInitializer } from '@/classes/AssertionInitializer';
import { AssertionInitializer } from '@/types';

export const firstNameAssertionInitializer: AssertionInitializer = (
	{ equalValue, testValue },
	options
) => {
	assertionInitializer()
		.setVariables(models.native.firstName, equalValue, testValue)
		.setOptions(options)
		.addCommonTest()
		.emptyCheck()
		.run();
};
