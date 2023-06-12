import {
  ValidationResult,
  validationChecker,
} from "~/classes/ValidationChecker";

import { ValidationModelBuilder } from "~/classes/modelBuilder/ValidationModelBuilder";

import { models } from "~/models";

import { Validator } from "~/types";

import { errors } from "~/variables";

const validator = ValidationModelBuilder.compiler(
  models.validation.phoneNumber
);

export const phoneNumberValidator: Validator = async (phoneNumber: unknown) => {
  const validationResult = await validator(phoneNumber);

  errorChecker(validationResult, phoneNumber);
};

const errorChecker = (result: ValidationResult, phoneNumber: unknown) => {
  validationChecker(result, "phoneNumber", {
    extraErrorFields: {
      validatedPhoneNumber: phoneNumber,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMax()
      .stringMin()
      .stringNumeric()
      .throwAnyway(errors.phoneNumber_invalid);
  });
};
