import { Result, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { errors } from "@/variables/errors";

const validator = ValidationModelBuilder.compiler(models.validation.firstName);

export const firstNameValidator: Validator = async (firstName: unknown) => {
  const validationResult = await validator({ firstName });

  errorChecker(validationResult, firstName);
};

const errorChecker = (result: Result, firstName: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedFirstName: firstName,
      },
    },
    models.native.firstName
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.FIRST_NAME_INVALID);
  });
};
