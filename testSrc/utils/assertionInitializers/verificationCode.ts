import { models } from '~/models';

import { assertionInitializer } from '@/classes/AssertionInitializer';
import { AssertionInitializer } from '@/types';

export const verificationCodeAssertionInitializer: AssertionInitializer = (
	{ testValue },
	options
) => {
	assertionInitializer()
		.setVariables(models.native.verificationCode, '', testValue)
		.setOptions(options)
		.typeCheck()
		.emptyCheck()
		.numericCheck()
		.lengthCheck()
		.run();
};
