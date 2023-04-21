import { Result, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { errors } from "@/variables/errors";

const validator = ValidationModelBuilder.compiler(
  models.validation.phoneNumber
);

export const phoneNumberValidator: Validator = async (phoneNumber: unknown) => {
  const validationResult = await validator({
    phoneNumber,
  });

  errorChecker(validationResult, phoneNumber);
};

const errorChecker = (result: Result, phoneNumber: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedPhoneNumber: phoneNumber,
      },
    },
    models.native.phoneNumber
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMax()
      .stringMin()
      .stringNumeric()
      .throwAnyway(errors.PHONE_NUMBER_INVALID);
  });
};
