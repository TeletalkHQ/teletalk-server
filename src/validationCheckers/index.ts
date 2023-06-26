import { errorThrower } from "check-fields";
import { customTypeof } from "custom-typeof";

import { validationChecker } from "~/classes/ValidationChecker";
import { nativeModels } from "~/models/native";
import {
  Field,
  ValidationCheckerFn,
  ValidationCheckerFnCollection,
  ValidationResult,
} from "~/types";
import { countries, errors } from "~/variables";

export const validationCheckers = Object.keys(nativeModels).reduce(
  (prevValue, currValue) => {
    const k = currValue as Field;

    prevValue[k] = (result: ValidationResult, value: unknown) =>
      validationChecker(result, k, value).check();

    return prevValue;
  },
  {} as ValidationCheckerFnCollection
);

const {
  countryCode: defaultCountryCodeChecker,
  countryName: defaultCountryNameChecker,
} = validationCheckers;

validationCheckers.countryCode = (result: ValidationResult, value: unknown) => {
  if (result === true) {
    const country = countries.find((c) => c.countryCode === value);
    errorThrower(
      customTypeof.isUndefined(country),
      errors.countryCodeNotSupported
    );

    return;
  }

  defaultCountryCodeChecker(result, value);
};

validationCheckers.countryName = (result: ValidationResult, value: unknown) => {
  if (result === true) {
    const country = countries.find((c) => c.countryName === value);
    errorThrower(
      customTypeof.isUndefined(country),
      errors.countryNameNotSupported
    );

    return;
  }

  defaultCountryNameChecker(result, value);
};

const notImplementedChecker = (fieldName: Field) =>
  (() => {
    throw `${fieldName}ValidationChecker is not implemented`;
  }) as ValidationCheckerFn;

validationCheckers.id = notImplementedChecker("id");
validationCheckers.createdAt = notImplementedChecker("createdAt");
validationCheckers.isActive = notImplementedChecker("isActive");
validationCheckers.macAddress = notImplementedChecker("macAddress");
validationCheckers.messageId = notImplementedChecker("messageId");
validationCheckers.senderId = notImplementedChecker("senderId");
