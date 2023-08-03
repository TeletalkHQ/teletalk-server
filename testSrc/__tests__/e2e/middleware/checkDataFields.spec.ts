import { errorStore } from '~/classes/ErrorStore';
import { EventName } from '~/types';
import { events } from '~/websocket/events';

import { randomMaker } from '@/classes/RandomMaker';
import { requesterMaker } from '@/classes/Requester';
import { utils } from '@/utils';

await utils.asyncDescribe('checkDataFields middleware tests', async () => {
	const { socket } = await randomMaker.user();

	const eventsWithInputFields = events.filter(
		(i) => Object.keys(i.inputFields).length
	);

	const eventsWithInputFieldsExceptAuth = eventsWithInputFields.filter(
		(i) =>
			!(['signIn', 'verify', 'createNewUser'] as EventName[]).includes(i.name)
	);

	return () => {
		for (const event of eventsWithInputFieldsExceptAuth) {
			const title = utils.createFailTestMessage(
				errorStore.find('INPUT_FIELDS_MISSING'),
				event.name
			);

			it(title, async () => {
				await requesterMaker(socket, event as any)
					.setError(errorStore.find('INPUT_FIELDS_MISSING'))
					.setOptions({ shouldFilterRequestData: false })
					.sendFullFeaturedRequest();
			});
		}
	};
});
