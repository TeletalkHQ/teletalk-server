import { models } from '~/models';

import { e2eFailTestInitializer } from '@/classes/E2eFailTestInitializer';
import { E2eFailTestInitializer } from '@/types';

export const userIdE2eFailTestInitializer: E2eFailTestInitializer = (
	configuredRequester,
	data,
	ignores
) => {
	const initializer = e2eFailTestInitializer(
		configuredRequester,
		data,
		models.native.userId,
		'userId'
	);

	initializer
		.missing()
		.overload()
		.invalidType()

		.minLength()
		.maxLength();

	if (!ignores?.includes('empty')) initializer.empty();
};
