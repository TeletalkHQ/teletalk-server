/* eslint-disable indent */
import { NativeError } from "~/types";
import { errors } from "~/variables";

const resolveResponseError = (error: NativeError | NativeError[] | undefined) =>
  Array.isArray(error)
    ? error
    : error?.reason
    ? [error]
    : [errors.unknownError];

const getDefaultValidatorErrorTypes = () => ({
  array: false,
  arrayContains: false,
  arrayEmpty: false,
  arrayEnum: false,
  arrayLength: false,
  arrayMax: false,
  arrayMin: false,
  arrayUnique: false,
  boolean: false,
  date: false,
  dateMax: false,
  dateMin: false,
  email: false,
  emailEmpty: false,
  emailMax: false,
  emailMin: false,
  enumValue: false,
  equalField: false,
  equalValue: false,
  forbidden: false,
  function: false,
  luhn: false,
  mac: false,
  number: false,
  numberEqual: false,
  numberInteger: false,
  numberMax: false,
  numberMin: false,
  numberNegative: false,
  numberNotEqual: false,
  numberPositive: false,
  object: false,
  objectMaxProps: false,
  objectMinProps: false,
  objectStrict: false,
  required: false,
  string: false,
  stringAlpha: false,
  stringAlphadash: false,
  stringAlphanum: false,
  stringBase64: false,
  stringContains: false,
  stringEmpty: false,
  stringEnum: false,
  stringHex: false,
  stringLength: false,
  stringMax: false,
  stringMin: false,
  stringNumeric: false,
  stringPattern: false,
  stringSingleLine: false,
  tuple: false,
  tupleEmpty: false,
  tupleLength: false,
  url: false,
  uuid: false,
  uuidVersion: false,
});

export const helpers = {
  getDefaultValidatorErrorTypes,
  resolveResponseError,
};
