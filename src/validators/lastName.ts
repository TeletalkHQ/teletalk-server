import { Result, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { errors } from "@/variables/errors";

const validator = ValidationModelBuilder.compiler(models.validation.lastName);

export const lastNameValidator = async (lastName: unknown) => {
  const validationResult = await validator({ lastName });

  errorChecker(validationResult, lastName);
};

const errorChecker = (result: Result, lastName: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: { validatedLastName: lastName },
    },
    models.native.lastName
  ).check(function () {
    this.required()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.LAST_NAME_INVALID);
  });
};
