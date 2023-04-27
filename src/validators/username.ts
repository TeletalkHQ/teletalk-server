import {
  ValidationResult,
  validationChecker,
} from "@/classes/ValidationChecker";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { ERRORS } from "@/variables";

const validator = ValidationModelBuilder.compiler(models.validation.username);

export const usernameValidator: Validator = async (username: unknown) => {
  const validationResult = await validator(username);

  errorChecker(validationResult, username);
};

const errorChecker = (result: ValidationResult, username: unknown) => {
  validationChecker(result, "username", {
    extraErrorFields: { validatedUsername: username },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(ERRORS.USERNAME_INVALID);
  });
};
