import {
  ValidationResult,
  validationChecker,
} from "@/classes/ValidationChecker";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { ERRORS } from "@/variables";

const validator = ValidationModelBuilder.compiler(models.validation.userId);

export const userIdValidator: Validator = async (userId: unknown) => {
  const validationResult = await validator(userId);

  errorChecker(validationResult, userId);
};

const errorChecker = (result: ValidationResult, userId: unknown) => {
  validationChecker(result, "userId", {
    extraErrorFields: {
      validatedUserId: userId,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(ERRORS.USER_ID_INVALID);
  });
};
