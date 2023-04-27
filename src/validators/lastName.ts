import {
  ValidationResult,
  validationChecker,
} from "@/classes/ValidationChecker";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { ERRORS } from "@/variables";

const validator = ValidationModelBuilder.compiler(models.validation.lastName);

export const lastNameValidator: Validator = async (lastName: unknown) => {
  const validationResult = await validator(lastName);

  errorChecker(validationResult, lastName);
};

const errorChecker = (result: ValidationResult, lastName: unknown) => {
  validationChecker(result, "lastName", {
    extraErrorFields: { validatedLastName: lastName },
  }).check(function () {
    this.required()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(ERRORS.LAST_NAME_INVALID);
  });
};
