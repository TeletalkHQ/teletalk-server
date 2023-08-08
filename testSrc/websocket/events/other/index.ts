import { socketEventBuilder } from '~/classes/SocketEventBuilder';

import { randomMaker } from '@/classes/RandomMaker';

const unknownEvent = socketEventBuilder()
	.create()
	//@ts-ignore
	.name(randomMaker.string(10))
	.build();

export const other = {
	events: {
		unknownEvent,
	},
};
