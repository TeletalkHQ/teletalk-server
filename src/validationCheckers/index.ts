import { customTypeof } from "custom-typeof";

import { errorStore } from "~/classes/ErrorStore";
import { validationChecker } from "~/classes/ValidationChecker";
import { nativeModels } from "~/models/native";
import { ValidationCheckerFn, ValidationCheckerFnCollection } from "~/types";
import { Field } from "~/types/model";
import { countries } from "~/variables";

export const validationCheckers = Object.keys(nativeModels).reduce(
	(prevValue, currValue) => {
		const k = currValue as Field;

		prevValue[k] = (result, value) =>
			validationChecker(result, k, value).check();

		return prevValue;
	},
	{} as ValidationCheckerFnCollection
);

const {
	countryCode: defaultCountryCodeChecker,
	countryName: defaultCountryNameChecker,
} = validationCheckers;

validationCheckers.countryCode = (result, value) => {
	if (result === true) {
		const country = countries.find((c) => c.countryCode === value);
		if (customTypeof.isUndefined(country))
			throw errorStore.find("COUNTRY_CODE_NOT_SUPPORTED");

		return;
	}

	defaultCountryCodeChecker(result, value);
};

validationCheckers.countryName = (result, value) => {
	if (result === true) {
		const country = countries.find((c) => c.countryName === value);
		if (customTypeof.isUndefined(country))
			throw errorStore.find("COUNTRY_NAME_NOT_SUPPORTED");

		return;
	}

	defaultCountryNameChecker(result, value);
};

const notImplementedCheckerFn = (fieldName: Field) =>
	(() => {
		throw `${fieldName}ValidationChecker is not implemented`;
	}) as ValidationCheckerFn;

validationCheckers.id = notImplementedCheckerFn("id");
validationCheckers.createdAt = notImplementedCheckerFn("createdAt");
validationCheckers.isActive = notImplementedCheckerFn("isActive");
validationCheckers.macAddress = notImplementedCheckerFn("macAddress");
validationCheckers.messageId = notImplementedCheckerFn("messageId");
validationCheckers.senderId = notImplementedCheckerFn("senderId");
