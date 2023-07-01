import {
  AsyncCheckFunction,
  SyncCheckFunction,
  ValidationError,
  ValidationRuleObject,
} from "fastest-validator";

import { helpers } from "~/helpers";

import { ErrorReason, NativeError } from "..";
import { Field } from "../models";

export type ValidationModel = ValidationRuleObject;

export type ValidationCollection = {
  [F in Field]: ValidationModel;
};

const ERROR_TYPES = helpers.getDefaultValidatorErrorTypes();
export type ErrorTypes = typeof ERROR_TYPES;
export type ValidationErrors = ValidationError[];

export interface ValidationCheckerError extends NativeError {
  result: ValidationErrors;
  validatedValue: unknown;
  validatedFieldName: Field;
}
export type ValidationResult = true | ValidationErrors;

export type FieldValidator = AsyncCheckFunction | SyncCheckFunction;

export type ValidationCheckerIgnores = ErrorReason[];

export type ValidationCheckerFn = (
  r: ValidationResult,
  value: unknown,
  ignores?: ValidationCheckerIgnores
) => void;

export type ValidationCheckerFnCollection = {
  [prop in Field]: ValidationCheckerFn;
};

export type Validator = (param: any) => Promise<void>;
