import { Result, validationChecker } from "utility-store";

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
  const validationResult = await validator({
    verificationCode,
  });

  errorChecker(validationResult, verificationCode);
};

const errorChecker = (result: Result, verificationCode: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedVerificationCode: verificationCode,
      },
    },
    models.native.verificationCode
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringNumeric()
      .stringLength()
      .throwAnyway(ERRORS.VERIFICATION_CODE_INVALID);
  });
};
