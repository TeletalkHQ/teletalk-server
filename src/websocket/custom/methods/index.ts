import { registerCustomEmit } from '~/websocket/custom/methods/emit';
import { registerCustomOn } from '~/websocket/custom/methods/on';
import { registerCustomUse } from '~/websocket/custom/methods/use';

export const customMethods = {
	registerCustomEmit,
	registerCustomOn,
	registerCustomUse,
};
