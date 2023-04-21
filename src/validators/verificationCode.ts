import { Result, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { errors } from "@/variables/errors";

const validator = ValidationModelBuilder.compiler(
  models.validation.verificationCode
);

export const verificationCodeValidator = async (verificationCode: unknown) => {
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
      .throwAnyway(errors.VERIFICATION_CODE_INVALID);
  });
};
