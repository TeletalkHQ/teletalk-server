import { customTypeof } from 'custom-typeof';
import { trier } from 'simple-trier';

import {
	EventName,
	SocketMiddleware,
	SocketMiddlewareReturnValue,
	SocketNext,
	StringMap,
	ValidationCheckerIgnores,
} from '~/types';
import { Field } from '~/types/models';
import { validationCheckers } from '~/validationCheckers';
import { validators } from '~/validators';

export const dynamicValidator: SocketMiddleware = async (
	_socket,
	next,
	[eventName, data]
) => {
	return await trier<SocketMiddlewareReturnValue>(dynamicValidator.name)
		.async()
		.try(tryBlock, data, eventName)
		.executeIfNoError(executeIfNoError, next)
		.throw()
		.run();
};

const tryBlock = async (data: StringMap, eventName: EventName) => {
	await validateField(data, eventName);

	return {
		ok: true,
	};
};

const validateField = async (data: StringMap, eventName: EventName) => {
	for (const prop in data) {
		const field = prop as Field;
		const value = data[field];

		if (customTypeof.isObject(value)) {
			await validateField(value, eventName);
			continue;
		}

		if (customTypeof.isArray(value)) {
			for (const item of value) {
				await validateField(item, eventName);
			}
			continue;
		}

		const ignores: ValidationCheckerIgnores = [];

		const validationResult = await validators[field](value);
		validationCheckers[field](validationResult, value, ignores);
	}
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
	next();
};
