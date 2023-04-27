import {
  ValidationResult,
  validationChecker,
} from "@/classes/ValidationChecker";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { ERRORS } from "@/variables";

const validator = ValidationModelBuilder.compiler(
  models.validation.verificationCode
);

export const verificationCodeValidator: Validator = async (
  verificationCode: unknown
) => {
  const validationResult = await validator(verificationCode);

  errorChecker(validationResult, verificationCode);
};

const errorChecker = (result: ValidationResult, verificationCode: unknown) => {
  validationChecker(result, "verificationCode", {
    extraErrorFields: {
      validatedVerificationCode: verificationCode,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringNumeric()
      .stringLength()
      .throwAnyway(ERRORS.VERIFICATION_CODE_INVALID);
  });
};
