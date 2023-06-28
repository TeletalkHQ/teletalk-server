import { errorThrower } from "check-fields";
import { customTypeof } from "custom-typeof";

import { validationChecker } from "~/classes/ValidationChecker";
import { nativeModels } from "~/models/native";
import {
  Field,
  ValidationCheckerFn,
  ValidationCheckerFnCollection,
} from "~/types";
import { countries, errors } from "~/variables";

export const validationCheckers = Object.keys(nativeModels).reduce(
  (prevValue, currValue) => {
    const k = currValue as Field;

    prevValue[k] = (result, value, ignores) =>
      validationChecker(result, k, value, ignores).check();

    return prevValue;
  },
  {} as ValidationCheckerFnCollection
);

const {
  countryCode: defaultCountryCodeChecker,
  countryName: defaultCountryNameChecker,
} = validationCheckers;

validationCheckers.countryCode = (result, value, ignores) => {
  if (result === true) {
    const country = countries.find((c) => c.countryCode === value);
    errorThrower(
      customTypeof.isUndefined(country),
      errors.countryCodeNotSupported
    );

    return;
  }

  defaultCountryCodeChecker(result, value, ignores);
};

validationCheckers.countryName = (result, value, ignores) => {
  if (result === true) {
    const country = countries.find((c) => c.countryName === value);
    errorThrower(
      customTypeof.isUndefined(country),
      errors.countryNameNotSupported
    );

    return;
  }

  defaultCountryNameChecker(result, value, ignores);
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
